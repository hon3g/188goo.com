import { useEffect, useState, useRef } from 'react';
import { List, Tag } from 'antd';
import LoadingBar from 'react-top-loading-bar';

import 'antd/dist/antd.css';
import './post-list.styles.scss';

const TAG_COLORS = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

function PostList() {
  const [data, setData] = useState({});
  const [pageNum, setPageNum] = useState(1);
  const loadingBar = useRef(null);

  useEffect(() => {
    const api = `http://127.0.0.1:8000/api/?page=${pageNum}`;
    const fetchFunc = async () => {
      const response = await fetch(api);
      const resJson = await response.json();
      console.log(resJson);
      setData(resJson);
    };
    loadingBar.current.staticStart();
    fetchFunc();
    loadingBar.current.complete();
  }, [pageNum]);

  return (
    <div>
      <LoadingBar color='#1890ff' ref={loadingBar} />
      <List
        pagination={{
          onChange: (page) => {
            setPageNum(page);
          },
          total: data.count,
          pageSize: 50,
          showSizeChanger: false,
          showQuickJumper: true,
        }}
        size='small'
        itemLayout='horizontal'
        dataSource={data.results}
        renderItem={(post) => (
          <List.Item>
            <div className='square'></div>
            <List.Item.Meta
              title={<a href={`${post.slug}_${post.id}`}>{post.title}</a>}
            />
            <Tag color={TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]}>
              {post.slug.slice(0, 3)}
            </Tag>
            <Tag>
              {new Date(post.pub_date).toLocaleDateString().replace(/\//g, '-')}
            </Tag>
          </List.Item>
        )}
      />
    </div>
  );
}

export default PostList;
