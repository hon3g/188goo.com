import { List, ConfigProvider, Carousel, Breadcrumb } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import 'antd/dist/antd.css';

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
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
];

function Content() {
  const contentStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: '260px',
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
    marginBottom: '0em',
  };
  return (
    <div style={{ maxWidth: '90%', margin: '0 auto' }}>
      <ConfigProvider locale={zhCN}>
        <br />
        <Carousel
          autoplay
          style={{ backgroundColor: 'white', maxWidth: '50%' }}
        >
          <div>
            <h3 style={contentStyle}>0</h3>
          </div>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
        </Carousel>
        <br />
        <Breadcrumb
          style={{ backgroundColor: 'white', maxWidth: '80%', padding: '1rem' }}
        >
          <Breadcrumb.Item>
            <a href='/#'>Home</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href='/#'>Application List</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
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
              <List.Item.Meta
                title={<a href='https://ant.design'>{item.title}</a>}
              />
            </List.Item>
          )}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </ConfigProvider>
    </div>
  );
}

export default Content;
