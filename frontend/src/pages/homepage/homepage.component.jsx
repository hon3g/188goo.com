import TopBar from '../../components/topbar/topbar.component';
import SlideShow from '../../components/slideshow/slideshow.component';
import PostList from '../../components/post-list/post-list.component'
import RadioGroup from '../../components/radio-group/radio-group.component';
import Navbar from '../../components/navbar/navbar.component';
import { Button } from 'antd';

import 'antd/dist/antd.css';
import './homepage.styles.scss';

function HomePage() {
  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      <TopBar />
      <SlideShow />
      <div className='content'>
      <div className='radio'>
        <RadioGroup />
      </div>
      <div className='menu-and-post-button'>
        <Navbar />
        <Button type='primary'>+ 发布广告</Button>
      </div>
      <div className='post-list'>
        <PostList />
      </div>
      </div>
    </div>
  );
}

export default HomePage;
