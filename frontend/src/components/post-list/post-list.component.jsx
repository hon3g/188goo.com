import { useEffect, useState, useRef } from 'react';
import { List, Tag, message } from 'antd';
import LoadingBar from 'react-top-loading-bar';
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const params = ['region', 'state', 'city', 'type', 'category']; //  Meaningful indices!
    const args = [];
    for (const param of params) {
      let arg = searchParams.get(param) || '';
      args.push(arg);
    }
    const api = `http://127.0.0.1:8000/api/?city__state__region=${args[0]}&city__state__name=${args[1]}&city__name=${args[2]}&category__type=${args[3]}&category__name=${args[4]}&page=${pageNum}`;

    const fetchData = async () => {
      loadingBar.current.continuousStart();
      message.loading('正在更新...', 168);

      const response = await fetch(api);
      const resJson = await response.json();

      function timeout(delay) {
        return new Promise((res) => setTimeout(res, delay));
      }
      await timeout(1000);

      setData(resJson);

      loadingBar.current.complete();
      message.destroy();
      message.success('更新成功!', 1);
    };
    fetchData();
  }, [searchParams, pageNum]);

  return (
    <div>
      <LoadingBar color='#1890ff' ref={loadingBar} />
      <List
        pagination={{
          onChange: (page) => {
            window.scrollTo(0, 0);
            setPageNum(page);
          },
          total: data.count,
          pageSize: 20,
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
            <Tag
              color={TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]}
            >
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
