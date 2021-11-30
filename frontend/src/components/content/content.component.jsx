import PostList from '../post-list/post-list.component';
import RadioGroup from '../radio-group/radio-group.component';
import Navbar from '../navbar/navbar.component';

import { Button } from 'antd';

import 'antd/dist/antd.css';
import './content.styles.scss';

function Content() {
  return (
    <main>
      <div className='content'>
        <div className='radio'>
          <RadioGroup />
        </div>
        <div className='menu-and-post-button'>
          <Navbar />
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
    </main>
  );
}

export default Content;
