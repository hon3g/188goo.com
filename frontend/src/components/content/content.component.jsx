import CookieCrumb from '../cookiecrumb/cookiecrumb.component';
import PostList from '../post-list/post-list.component';
import RadioGroup from '../radio-group/radio-group.component';

import { Button } from 'antd';

import 'antd/dist/antd.css';
import './content.styles.scss';

function Content() {
  return (
    <section>
      <div className='content'>
        <CookieCrumb />
        <div className='location-and-post-button'>
          <RadioGroup />
          <Button type='primary' size='large'>+ 发布广告</Button>
        </div>
        <PostList />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </section>
  );
}

export default Content;
