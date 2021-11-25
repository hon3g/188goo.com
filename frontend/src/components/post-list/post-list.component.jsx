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
  const [postList, setPostList] = useState();

  useEffect(() => {
    const baseApi = 'http://127.0.0.1:8000/api/?';
    const fetchFunc = async () => {
      const response = await fetch(baseApi);
      const resJson = await response.json();
      console.log(resJson);
      setPostList(resJson);
    };
    fetchFunc();
  }, []);

  return (
    <List
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        total: 34325235,
        pageSize: 20,
        showSizeChanger: false,
        showQuickJumper: true,
      }}
      size='small'
      itemLayout='horizontal'
      dataSource={postList}
      bordered={true}
      renderItem={(post) => (
        <List.Item>
          <div class='square'></div>
          <List.Item.Meta title={<a href='/#'>{post.title}</a>} />
          <Tag color={colors[Math.floor(Math.random()*colors.length)]}>{post.slug.slice(0, 3)}</Tag>
          <Tag>
            {new Date(post.pub_date).toLocaleDateString().replace(/\//g, '-')}
          </Tag>
        </List.Item>
      )}
    />
  );
}

export default PostList;
