import { useEffect, useState, useRef } from 'react';
import { List, Tag, message } from 'antd';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  TAG_COLORS,
  STATES,
  CITIES,
  TYPES,
  CATEGORIES,
} from '../../components/post-list/constants';
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';

import { connect } from 'react-redux';
import { setPostDetailModalVisible } from '../../redux/post-detail-modal/post-detail-modal.actions';
import { setCurrentPost } from '../../redux/current-post/current-post.actions';

import './post-list.styles.scss';

export function formattedDate(date) {
  return new Date(date).toLocaleDateString().replace(/\//g, '-');
}

function PostList({ setPostDetailModalVisible, setCurrentPost }) {
  const [data, setData] = useState({});

  const { state, city, category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [dim, setDim] = useState(false);
  const loadingBar = useRef(null);

  const [sameTagColor, setSameTagColor] = useState(null);
  const [isSameCategory, setIsSameCategory] = useState(false);

  const handleClick = (post) => (_) => {
    setCurrentPost(post);
    setPostDetailModalVisible(true);
  };

  useEffect(() => {
    setSameTagColor(TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]);
  }, [state, city, category]);

  useEffect(() => {
    const args = {
      state: '',
      city: '',
      type: '',
      category: '',
      page: searchParams.get('p') || 1,
    };

    if (STATES.has(state)) {
      args.state = state;
    }
    if (CITIES.has(city)) {
      args.city = city;
    }
    if (TYPES.has(category)) {
      args.type = category;
    }
    if (CATEGORIES.has(category)) {
      args.category = category;
      setIsSameCategory(true);
    } else {
      setIsSameCategory(false);
    }

    const api = `http://127.0.0.1:8000/api/list/?state__name=${args.state}&city__name=${args.city}&category__type=${args.type}&category__name=${args.category}&page=${args.page}`;
    const fetchData = async () => {
      loadingBar.current.continuousStart();
      message.destroy();
      message.loading('正在刷新...', 168);
      const response = await axios(api);
      // function timeout(delay) {
      //   return new Promise((res) => setTimeout(res, delay));
      // }
      // await timeout(5000);
      setData(response.data);
      setDim(false);
      loadingBar.current.complete();
      message.destroy();
      message.success('刷新成功!', 1);
    };
    fetchData();
  }, [state, city, category, searchParams, navigate]);

  return (
    <div>
      <LoadingBar color='#1890ff' ref={loadingBar} />
      <List
        pagination={{
          onChange: (page) => {
            setDim(true);
            window.scrollTo(0, 0);
            setSearchParams({ p: page });
          },
          current: parseInt(searchParams.get('p')) || 1,
          total: data.count,
          pageSize: 50,
          showSizeChanger: false,
          showQuickJumper: true,
          showLessItems: true,
        }}
        itemLayout='horizontal'
        dataSource={data.results}
        renderItem={(post) => (
          <List.Item>
            <div className='m-square'></div>
            <List.Item.Meta
              title={
                <span onClick={handleClick(post)} className='m-post-title'>
                  {post.title}
                </span>
              }
              description={
                <div className='m-tags'>
                  <Tag>{formattedDate(post.pub_date)}</Tag>
                  <Tag
                    color={
                      isSameCategory
                        ? sameTagColor
                        : TAG_COLORS[
                            Math.floor(Math.random() * TAG_COLORS.length)
                          ]
                    }
                  >
                    {post.category}
                  </Tag>
                </div>
              }
            />
          </List.Item>
        )}
      />
      {dim ? <div className='m-page-dim' /> : null}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setPostDetailModalVisible: (visible) =>
    dispatch(setPostDetailModalVisible(visible)),
  setCurrentPost: (post) => dispatch(setCurrentPost(post)),
});

export default connect(null, mapDispatchToProps)(PostList);
