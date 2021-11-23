import { ConfigProvider } from 'antd';
import SlideShow from '../slideshow/slideshow.component';
import CookieCrumb from '../cookiecrumb/cookiecrumb.component';
import PostList from '../post-list/post-list.component';
import zhCN from 'antd/lib/locale/zh_CN';

import 'antd/dist/antd.css';

function Content() {
  return (
    <div style={{ maxWidth: '90%', margin: '0 auto' }}>
      <ConfigProvider locale={zhCN}>
        <br />
        <SlideShow />
        <br />
        <CookieCrumb />
        <PostList />
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
