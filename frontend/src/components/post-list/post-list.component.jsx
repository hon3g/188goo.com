import { useEffect, useState, useRef } from 'react';
import { List, Tag, message, Modal, Button } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { TAG_COLORS } from './tag-colors';
import LoadingBar from 'react-top-loading-bar';

import 'antd/dist/antd.css';
import './post-list.styles.scss';

function PostList() {
  const [data, setData] = useState({});
  const [pageNum, setPageNum] = useState(1);
  const [postDetailVisible, setPostDetailVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

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
    const params = ['region', 'state', 'city', 'type', 'category']; //  Meaningful indices! (api url)
    const args = [];
    for (const param of params) {
      let arg = searchParams.get(param) || '';
      args.push(arg);
    }
    const api = `http://127.0.0.1:8000/api/?city__state__region=${args[0]}&city__state__name=${args[1]}&city__name=${args[2]}&category__type=${args[3]}&category__name=${args[4]}&page=${pageNum}`;

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
  }, [searchParams, pageNum]);

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
        title={currentPost.title}
        centered
        visible={postDetailVisible}
        onCancel={() => setPostDetailVisible(false)}
        width={800}
        bodyStyle={{ minHeight: '50vh' }}
        style={{ animationDuration: '0s' }}
        // mask={false}
        maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
        destroyOnClose={true}
        footer={[
          <Button onClick={() => setPostDetailVisible(false)}>关闭</Button>,
        ]}
      >
        <pre style={{ whiteSpace: 'pre-line' }}>{currentPost.content}</pre>
        <p>{formatDate(currentPost.pub_date)}</p>
      </Modal>
      {dim ? <div className='dim' /> : null}
    </div>
  );
}

export default PostList;
