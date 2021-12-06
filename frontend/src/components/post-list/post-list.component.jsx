import { useEffect, useState, useRef } from 'react';
import { List, Tag, message, Modal, Button } from 'antd';
import { useParams, useSearchParams } from 'react-router-dom';
import { TAG_COLORS, STATES, CITIES, TYPES, CATEGORIES } from './constants';
import LoadingBar from 'react-top-loading-bar';

import axios from 'axios';

import './post-list.styles.scss';

function PostList() {
  const [data, setData] = useState({});
  const [postDetailVisible, setPostDetailVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  const { state, city, category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [dim, setDim] = useState(false);
  const loadingBar = useRef(null);

  const [sameTagColor, setSameTagColor] = useState(null);
  const [isSameCategory, setIsSameCategory] = useState(false);

  const handleClick = (post) => (_) => {
    console.log('clicked post: ', post);
    setCurrentPost(post);
    setPostDetailVisible(true);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString().replace(/\//g, '-');

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
    const api = `http://127.0.0.1:8000/api/?state__name=${args.state}&city__name=${args.city}&category__type=${args.type}&category__name=${args.category}&page=${args.page}`;
    // console.log(args);
    const fetchData = async () => {
      loadingBar.current.continuousStart();
      message.loading('正在刷新...', 168);
      const response = await axios(api);
      // function timeout(delay) {
      //   return new Promise((res) => setTimeout(res, delay));
      // }
      // await timeout(700);
      setData(response.data);
      setDim(false);
      loadingBar.current.complete();
      message.destroy();
      message.success('刷新成功!', 1);
    };
    fetchData();
  }, [state, city, category, searchParams]);

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
          pageSize: 30,
          showSizeChanger: false,
          showQuickJumper: true,
          hideOnSinglePage: true,
        }}
        size='small'
        itemLayout='horizontal'
        dataSource={data.results}
        renderItem={(post) => (
          <List.Item style={{ paddingLeft: '0.5rem', paddingRight: '0rem' }}>
            <div className='square'></div>
            <List.Item.Meta
              title={
                <span onClick={handleClick(post)} className='post-title'>
                  {post.title}
                </span>
              }
            />
            <Tag
              color={
                isSameCategory
                  ? sameTagColor
                  : TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]
              }
            >
              {post.city ? post.city : post.state}
            </Tag>
            <Tag>{formatDate(post.pub_date)}</Tag>
          </List.Item>
        )}
      />
      <Modal
        title={[
          <Button
            type='primary'
            ghost
            onClick={() => setPostDetailVisible(false)}
            style={{ marginRight: '1rem' }}
          >
            返回
          </Button>,
          currentPost.title,
        ]}
        centered
        visible={postDetailVisible}
        onCancel={() => setPostDetailVisible(false)}
        width={'75vw'}
        bodyStyle={{ height: '75vh' }}
        maskStyle={{ background: 'rgba(255, 255, 255, 0.5)' }}
        style={{ animationDuration: '0s' }}
        destroyOnClose={true}
        footer={[
          <Button
            type='primary'
            ghost
            onClick={() => setPostDetailVisible(false)}
          >
            关闭
          </Button>,
        ]}
      >
        <pre
          style={{
            height: '100%',
            whiteSpace: 'pre-line',
            overflowY: 'scroll',
          }}
        >
          {currentPost.content}
        </pre>
      </Modal>
      {dim ? <div className='dim' /> : null}
    </div>
  );
}

export default PostList;
