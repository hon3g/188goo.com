import { Drawer, Button, message } from 'antd';

import { connect } from 'react-redux';
import { setAccountDrawerVisible } from '../../redux/account-drawer/account-drawer.actions';
import { setPostFormModalVisible } from '../../redux/post-form-modal/post-form-modal.actions';
import { setCurrentUser } from '../../redux/user/user.actions';

import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';

import './account-drawer.styles.scss';

function formatedPhoneNum(numStr) {
  // Input: +13475557048
  const partOne = numStr.slice(2, 5); // 347
  const partTwo = numStr.slice(5, 8); // 555
  const partThree = numStr.slice(8); // 7048
  // Output: +1 (347) 555-7048
  return `+1 (${partOne}) ${partTwo}-${partThree}`;
}

function AccountDrawer({
  visible,
  setAccountDrawerVisible,
  setPostFormModalVisible,
  currentUser,
  setCurrentUser,
}) {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setAccountDrawerVisible(false);
        setCurrentUser(null);
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
      width={375}
      onClose={() => setAccountDrawerVisible(false)}
      visible={visible}
    >
      <div className='account-content'>
        <div className='acc-top'>
          <h3>
            {currentUser ? formatedPhoneNum(currentUser.phoneNumber) : null}
          </h3>
          <Button type='primary' onClick={() => setPostFormModalVisible(true)}>
            免费发布信息
          </Button>
        </div>
        <div className='acc-middle'></div>
        <div className='acc-bottom'>
          <Button className='signout-button' onClick={handleSignOut}>
            注销账号
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
  setPostFormModalVisible: (visible) =>
    dispatch(setPostFormModalVisible(visible)),
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapSateToProps, mapDispatchToProps)(AccountDrawer);
