import { Breadcrumb } from 'antd';

import './cookiecrumb.styles.scss'
import 'antd/dist/antd.css';

function CookieCrumb() {
  return (
    <Breadcrumb className='breadcrumb'>
      <Breadcrumb.Item>
        <a href='/#'>全部信息</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href='/#'>招聘求职</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>餐馆招聘</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default CookieCrumb;
