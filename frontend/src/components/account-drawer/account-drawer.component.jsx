import { Drawer, Button, message } from 'antd';
import { connect } from 'react-redux';
import { setAccountDrawerVisible } from '../../redux/account-drawer/account-drawer.actions';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';

import './account-drawer.styles.scss';

function AccountDrawer({ visible, setAccountDrawerVisible, currentUser }) {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setAccountDrawerVisible(false);
        message.success('注销成功!');
      })
      .catch(() => {
        // An error happened.
        message.error('注销失败, 请稍后再尝试');
      });
  };

  return (
    <Drawer
      title='个人中心'
      placement='right'
      width={750}
      onClose={() => setAccountDrawerVisible(false)}
      visible={visible}
    >
      <div className='account-content'>
        <div className='top'>
          <h3>{currentUser?currentUser.phoneNumber:null}</h3>
          <Button type='primary'>免费发布广告</Button>
        </div>
        <div className='middle'></div>
        <div className='bottom'>
          <Button className='signout-button' onClick={handleSignOut}>
            注销
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

const mapSateToProps = (state) => ({
  visible: state.accountDrawer.visible,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setAccountDrawerVisible: (visible) =>
    dispatch(setAccountDrawerVisible(visible)),
});

export default connect(mapSateToProps, mapDispatchToProps)(AccountDrawer);
