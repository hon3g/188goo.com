import { useEffect, useState } from 'react';
import { List } from 'antd';

import 'antd/dist/antd.css';

// const data = [];

// for (let i = 0; i < 878978; i++) {
//   data.push({
//     title: `Ant Design Title ${i}`,
//   });
// }

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
        pageSize: 20,
        showSizeChanger: false,
        showQuickJumper: true,
      }}
      size='small'
      itemLayout='horizontal'
      dataSource={postList}
      renderItem={(post) => (
        <List.Item>
          <List.Item.Meta title={<a href='/#' style={{fontWeight: 'normal', fontSize: '1rem'}}>{post.title}</a>} />
        </List.Item>
      )}
    />
  );
}

export default PostList;
