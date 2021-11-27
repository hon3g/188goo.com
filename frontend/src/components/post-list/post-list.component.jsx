import { useEffect, useState, useRef } from 'react';
import { List, Tag } from 'antd';
import LoadingBar from 'react-top-loading-bar';

import { connect } from 'react-redux';
import { setPage } from '../../redux/args/args.actions';

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

const PARAMS_TABLE = {
  id: 'id=',
  region: 'city__state__region=',
  state: 'city__state__name=',
  city: 'city__name=',
  type: 'category__type=',
  category: 'category__name=',
  slug: 'slug=',
  page: 'page=',
};

function PostList({ setPage, ...props }) {
  const { id, region, state, city, type, category, slug, page } = props;
  const [data, setData] = useState({});
  const loadingBar = useRef(null);

  useEffect(() => {
    const api = `http://127.0.0.1:8000/api/?page=${page}&id=${id}&region=${region}&state=${state}&city=${city}`;
    console.log(api);
    const fetchFunc = async () => {
      const response = await fetch(api);
      const resJson = await response.json();
      setData(resJson);
    };
    loadingBar.current.staticStart();
    fetchFunc();
    loadingBar.current.complete();
  }, [id, region, state, city, type, category, slug, page]);

  return (
    <div>
      <LoadingBar color='#1890ff' ref={loadingBar} />
      <List
        pagination={{
          onChange: (page) => {
            setPage(page);
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

const mapState = (storeState) => ({
  id: storeState.args.id,
  region: storeState.args.region,
  state: storeState.args.state,
  city: storeState.args.city,
  type: storeState.args.type,
  category: storeState.args.category,
  slug: storeState.args.slug,
  page: storeState.args.page,
});

const mapDispatch = (dispatch) => ({
  setPage: (page) => dispatch(setPage(page)),
});

export default connect(mapState, mapDispatch)(PostList);
