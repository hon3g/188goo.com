import { useEffect, useState, useRef } from 'react';
import { List, Tag, message, Modal, Button } from 'antd';
import { useParams, useSearchParams } from 'react-router-dom';
import { TAG_COLORS, STATES, CITIES, TYPES, CATEGORIES } from './constants';
import LoadingBar from 'react-top-loading-bar';

import 'antd/dist/antd.css';
import './post-list.styles.scss';

function PostList() {
  const [data, setData] = useState({});
  const [pageNum, setPageNum] = useState(1);
  const [postDetailVisible, setPostDetailVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const { state, category } = useParams();
  const [searchParams] = useSearchParams();

  const [dim, setDim] = useState(false);
  const loadingBar = useRef(null);

  const handleClick = (post) => (_) => {
    console.log('clicked ', post);
    setCurrentPost(post);
    setPostDetailVisible(true);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString().replace(/\//g, '-');

  useEffect(() => {
    const args = {
      state: '',
      city: '',
      type: '',
      category: '',
    };
    if (STATES.has(state)) {
      args.state = state;
    }
    console.log(searchParams.get('city'));
    if (CITIES.has(searchParams.get('city'))) {
      args.city = searchParams.get('city');
    }
    if (TYPES.has(category)) {
      args.type = category;
    } else if (CATEGORIES.has(category)) {
      args.category = category;
    }

    const api = `http://127.0.0.1:8000/api/?city__state__name=${args.state}&city__name=${args.city}&category__type=${args.type}&category__name=${args.category}&page=${pageNum}`;
    console.log(args);
    const fetchData = async () => {
      loadingBar.current.continuousStart();
      message.loading('正在刷新...', 168);

      const response = await fetch(api);
      const resJson = await response.json();

      // function timeout(delay) {
      //   return new Promise((res) => setTimeout(res, delay));
      // }
      // await timeout(1000);

      setData(resJson);
      setDim(false);
      loadingBar.current.complete();
      message.destroy();
      message.success('刷新成功!', 1);
    };
    fetchData();
  }, [state, category, searchParams, pageNum]);

  return (
    <div>
      <LoadingBar color='#1890ff' ref={loadingBar} />
      <List
        pagination={{
          onChange: (page) => {
            setDim(true);
            window.scrollTo(0, 0);
            setPageNum(page);
          },
          total: data.count,
          pageSize: 30,
          showSizeChanger: false,
          showQuickJumper: true,
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
              color={TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]}
            >
              {post.slug.slice(0, 3)}
            </Tag>
            <Tag>{formatDate(post.pub_date)}</Tag>
          </List.Item>
        )}
      />
      <Modal
        title={[
          <Button onClick={() => setPostDetailVisible(false)} style={{marginRight: '1rem'}}>返回</Button>,
          currentPost.title,
        ]}
        centered
        visible={postDetailVisible}
        onCancel={() => setPostDetailVisible(false)}
        width={1000}
        bodyStyle={{ height: '60vh' }}
        style={{ animationDuration: '0.5s' }}
        // mask={false}
        // maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
        destroyOnClose={true}
        footer={[
          <Button onClick={() => setPostDetailVisible(false)}>关闭</Button>,
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
