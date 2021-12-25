import TopBar from '../../components/topbar/topbar.component';
import SlideShow from '../../components/slideshow/slideshow.component';
import Navbar from '../../components/navbar/navbar.component';
import PostList from '../../components-mobile/post-list/post-list.component';
import RadioGroup from '../../components/radio-group/radio-group.component';
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
import { setSignInDrawerVisible } from '../../redux/signin-drawer/signin-drawer.actions';

import { useNavigate, useParams } from 'react-router-dom';

import Head from '../../components/head/head.component';

import './mobilepage.styles.scss';

function MobilePage({
  currentUser,
  setLocationDrawerVisible,
  setPostFormModalVisible,
  setSignInDrawerVisible,
}) {
  const navigate = useNavigate();
  const { state } = useParams();

  const handlePostAd = () => {
    if (currentUser) {
      setPostFormModalVisible(true);
    } else {
      setSignInDrawerVisible(true);
    }
  };

  return (
    <div className='m-mobilepage'>
      <Head />
      <LocationDrawer />
      <SignInDrawer />
      <AccountDrawer />
      <PostDetailModal />
      <PostFormModal />

      <div className='m-top'>
        <TopBar />
        <SlideShow />
      </div>

      <div className='m-middle'>
        <div className='m-middle-nav-and-list'>
          <div className='m-navbar shadow'>
            <Navbar />
          </div>

          <div className='m-buttons shadow'>
            <Button
              type='primary'
              ghost
              style={{ borderColor: '#FF8718', color: '#FF8718' }}
              onClick={() => navigate('/chat')}
            >
              在线聊天
            </Button>
            <Button type='primary' onClick={handlePostAd}>
              发布信息
            </Button>
          </div>

          <div className='m-locations shadow'>
            <RadioGroup />
            {state !== '纽约' ? (
              <Button
                type='primary'
                ghost
                style={{ marginLeft: '1rem' }}
                onClick={() => setLocationDrawerVisible(true)}
              >
                切换州区
              </Button>
            ) : null}
          </div>

          <main className='m-post-list shadow'>
            <PostList />
          </main>
        </div>
      </div>

      <div className='m-bottom'>
        <Footer />
      </div>
    </div>
  );
}

const mapSateToProps = (state) => ({ currentUser: state.user.currentUser });

const mapDispatchToProps = (dispatch) => ({
  setLocationDrawerVisible: (visible) =>
    dispatch(setLocationDrawerVisible(visible)),
  setPostFormModalVisible: (visible) =>
    dispatch(setPostFormModalVisible(visible)),
  setSignInDrawerVisible: (visible) =>
    dispatch(setSignInDrawerVisible(visible)),
});

export default connect(mapSateToProps, mapDispatchToProps)(MobilePage);
