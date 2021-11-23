import { Breadcrumb } from 'antd';

function CookieCrumb() {
  return (
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
  );
}


export default CookieCrumb;