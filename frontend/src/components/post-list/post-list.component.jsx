import { useEffect, useState } from 'react';
import { List, Tag } from 'antd';

import 'antd/dist/antd.css';
import './post-list.styles.scss';

// const data = [];

// for (let i = 0; i < 878978; i++) {
//   data.push({
//     title: `Ant Design Title ${i}`,
//   });
// }

const colors = [
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

  useEffect(() => {
    const api = `http://127.0.0.1:8000/api/?page=${pageNum}`;
    const fetchFunc = async () => {
      const response = await fetch(api);
      const resJson = await response.json();
      console.log(resJson);
      setData(resJson);
    };
    fetchFunc();
  }, [pageNum]);

  return (
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
          <List.Item.Meta title={<a href='/#'>{post.title}</a>} />
          <Tag color={colors[Math.floor(Math.random() * colors.length)]}>
            {post.slug.slice(0, 3)}
          </Tag>
          <Tag>
            {new Date(post.pub_date).toLocaleDateString().replace(/\//g, '-')}
          </Tag>
        </List.Item>
      )}
    />
  );
}

export default PostList;
