import { List } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

function PostList() {
  return (
    <List
      style={{ backgroundColor: 'white', maxWidth: '80%', padding: '1rem' }}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
        showSizeChanger: false,
        showQuickJumper: true,
      }}
      itemLayout='horizontal'
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta title={<a href='/#'>{item.title}</a>} />
        </List.Item>
      )}
    />
  );
}

export default PostList;