import SlideShow from '../slideshow/slideshow.component';
import CookieCrumb from '../cookiecrumb/cookiecrumb.component';
import PostList from '../post-list/post-list.component';
import RadioGroup from '../radio-group/radio-group.component';

import { Button } from 'antd';

import 'antd/dist/antd.css';
import './content.styles.scss'


function Content() {
  return (
    <div>
      <SlideShow />
      <div
        style={{ backgroundColor: 'white', maxWidth: '61.8%', padding: '1.5rem' }}
      >
        <CookieCrumb />
        <div className='hon'>
        <RadioGroup />
        <Button type='primary'>+ 发布广告</Button>
        </div>
        <PostList />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Content;
