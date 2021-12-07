import TopBar from '../../components/topbar/topbar.component';
import SlideShow from '../../components/slideshow/slideshow.component';
import PostList from '../../components/post-list/post-list.component';
import RadioGroup from '../../components/radio-group/radio-group.component';
import Navbar from '../../components/navbar/navbar.component';
import LocationDrawer from '../../components/location-drawer/location-drawer.component';
import SignInDrawer from '../../components/signin-drawer/signin-drawer.component';
import AccountDrawer from '../../components/account-drawer/account-drawer.component';
import PostDetailModal from '../../components/post-detail-modal/post-detail-modal.component';
import PostFormModal from '../../components/post-form-modal/post-form-modal.component';
import Footer from '../../components/footer/footer.component';
import { Button } from 'antd';

import { connect } from 'react-redux';
import { setLocationDrawerVisible } from '../../redux/location-drawer/location-drawer.actions';
import { setPostFormModalVisible } from '../../redux/post-form-modal/post-form-modal.actions';

import 'antd/dist/antd.css';
import './homepage.styles.scss';

function HomePage({ setLocationDrawerVisible, setPostFormModalVisible }) {
  return (
    <div className='homepage'>
      <LocationDrawer />
      <SignInDrawer />
      <AccountDrawer />
      <PostDetailModal />
      <PostFormModal />
      <div className='top'>
        <TopBar />
        <SlideShow />
      </div>
      <div className='middle'>
        <div className='middle-left'>
          <div className='radio-and-location-button shadow'>
            <RadioGroup />
            <Button
              type='primary'
              ghost
              onClick={() => setLocationDrawerVisible(true)}
            >
              切换地区
            </Button>
          </div>
          <div className='menu-and-post-button shadow'>
            <Navbar />
            <Button
              type='primary'
              onClick={() => setPostFormModalVisible(true)}
            >
              发布信息
            </Button>
          </div>
          <div className='post-list shadow'>
            <PostList />
          </div>
        </div>
        <div className='middle-right shadow'>hello world!</div>
      </div>
      <div className='bottom'>
        <Footer />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setLocationDrawerVisible: (visible) =>
    dispatch(setLocationDrawerVisible(visible)),
  setPostFormModalVisible: (visible) =>
    dispatch(setPostFormModalVisible(visible)),
});

export default connect(null, mapDispatchToProps)(HomePage);
