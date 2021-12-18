import TopBar from '../../components-mobile/topbar/topbar.component';
import SlideShow from '../../components-mobile/slideshow/slideshow.component';
import LocationDrawer from '../../components/location-drawer/location-drawer.component';
import SignInDrawer from '../../components/signin-drawer/signin-drawer.component';
import AccountDrawer from '../../components/account-drawer/account-drawer.component';
import PostFormModal from '../../components/post-form-modal/post-form-modal.component';
import Footer from '../../components/footer/footer.component';
import ChatWindow from '../../components-mobile/chat-window/chat-window.component';

import { Button } from 'antd';

import { useNavigate } from 'react-router-dom';

import 'antd/dist/antd.css';
import './mobilechat.styles.scss';

function MobileChat() {
  const navigate = useNavigate();

  return (
    <div className='m-mobilepage'>
      <LocationDrawer />
      <SignInDrawer />
      <AccountDrawer />
      <PostFormModal />

      <div className='m-top'>
        <TopBar />
        <SlideShow />
      </div>

      <div className='m-middle'>
        <div className='m-middle-nav-and-list'>
          <div className='m-back-button-div'>
            <Button type='primary' onClick={() => navigate('/')}>
              返回看贴
            </Button>
          </div>
        </div>

        <div className='m-middle-chat shadow'>
          <ChatWindow />
        </div>
      </div>

      <div className='m-bottom'>
        <Footer />
      </div>
    </div>
  );
}

export default MobileChat;
