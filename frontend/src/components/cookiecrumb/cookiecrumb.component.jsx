import { Breadcrumb } from 'antd';

import './cookiecrumb.styles.scss';
import 'antd/dist/antd.css';

function CookieCrumb() {
  return (
    <div className='post-list-top'>
      <Breadcrumb className='breadcrumb'>
        <Breadcrumb.Item>全部信息</Breadcrumb.Item>
        <Breadcrumb.Item>招聘求职</Breadcrumb.Item>
        <Breadcrumb.Item>餐馆招聘</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default CookieCrumb;
