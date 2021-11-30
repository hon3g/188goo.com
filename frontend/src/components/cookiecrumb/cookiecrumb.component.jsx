import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import './cookiecrumb.styles.scss';
import 'antd/dist/antd.css';

function CookieCrumb() {
  return (
    <div className='post-list-top'>
      <Breadcrumb className='breadcrumb'>
        <Breadcrumb.Item> <Link to='/'>首页</Link></Breadcrumb.Item>
        <Breadcrumb.Item>招聘求职</Breadcrumb.Item>
        <Breadcrumb.Item>餐馆招聘</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default CookieCrumb;
