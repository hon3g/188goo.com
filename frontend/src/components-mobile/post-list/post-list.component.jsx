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
import { formattedDate } from '../../components/post-list/post-list.component';
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';

import { connect } from 'react-redux';
import { setPostDetailModalVisible } from '../../redux/post-detail-modal/post-detail-modal.actions';
import { setCurrentPost } from '../../redux/current-post/current-post.actions';

import { API_GATEWAY } from '../../apiGateway';

import './post-list.styles.scss';

function PostList({ setPostDetailModalVisible, setCurrentPost }) {
  const [data, setData] = useState({});

  const { state, city, category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [dim, setDim] = useState(false);
  const loadingBar = useRef(null);

  const handleClick = (post) => (_) => {
    setCurrentPost(post);
    setPostDetailModalVisible(true);
  };

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
    }

    const api = `${API_GATEWAY}/api/list/?state__name=${args.state}&city__name=${args.city}&category__type=${args.type}&category__name=${args.category}&page=${args.page}`;
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
      message.success('刷新成功!', 0.1);
    };
    fetchData();
  }, [state, city, category, searchParams, navigate]);

  return (
    <div className='m-list'>
      <LoadingBar
        color='#1890ff'
        ref={loadingBar}
        transitionTime={300}
        loaderSpeed={200}
        waitingTime={300}
      />
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
          showQuickJumper: false,
          showLessItems: true,
        }}
        itemLayout='horizontal'
        dataSource={data.results}
        renderItem={(post) => (
          <List.Item>
            <div
              className='m-square'
              style={{ backgroundColor: TAG_COLORS.get(post.category) }}
            ></div>
            <List.Item.Meta
              title={
                <div>
                  <span onClick={handleClick(post)} className='m-post-title'>
                    {post.title}
                  </span>
                  <span className='m-post-location'>
                    {post.state}
                    {post.city ? `/${post.city}` : null}
                  </span>
                </div>
              }
              description={
                <div className='m-tags'>
                  <Tag>{formattedDate(post.pub_date)}</Tag>
                  <Tag color={TAG_COLORS.get(post.category)}>
                    {post.category}
                  </Tag>
                </div>
              }
            />
            <article className='sr-only'>
              {post.description}
              {post.contact_num}
              华人 招聘 360 168 188 美国找工 纽约招聘 纽约租房
            </article>
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
