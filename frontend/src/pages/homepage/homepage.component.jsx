import TopBar from '../../components/topbar/topbar.component';
import SlideShow from '../../components/slideshow/slideshow.component';
import PostList from '../../components/post-list/post-list.component';
import RadioGroup from '../../components/radio-group/radio-group.component';
import Navbar from '../../components/navbar/navbar.component';
import LocationDrawer from '../../components/location-drawer/location-drawer.component'
import { Button } from 'antd';

import { connect } from 'react-redux';
import { setLocationDrawerVisible } from '../../redux/location-drawer/location-drawer.actions';

import 'antd/dist/antd.css';
import './homepage.styles.scss';

function HomePage({ setLocationDrawerVisible }) {
  return (
    <div style={{ backgroundColor: '#f9f9f9' }}>
      <TopBar />
      <SlideShow />
      <div className='content'>
        <div className='radio-and-location-button'>
          <RadioGroup />
          <Button type='primary' ghost onClick={() => setLocationDrawerVisible(true)}>
            切换地区
          </Button>
        </div>
        <div className='menu-and-post-button'>
          <Navbar />
          <Button type='primary' style={{height: '2.1rem'}}>+发布广告</Button>
        </div>
        <div className='post-list'>
          <PostList />
        </div>
      </div>
      <LocationDrawer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setLocationDrawerVisible: (visible) => dispatch(setLocationDrawerVisible(visible))
});

export default connect(null, mapDispatchToProps)(HomePage);
