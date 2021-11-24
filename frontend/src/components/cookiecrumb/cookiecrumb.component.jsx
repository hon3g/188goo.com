import { Breadcrumb } from 'antd';

function CookieCrumb() {
  return (
    <Breadcrumb style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
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
