import { Drawer, Button, message } from 'antd';
import { connect } from 'react-redux';
import { setAccountDrawerVisible } from '../../redux/account-drawer/account-drawer.actions';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';

import './account-drawer.styles.scss';

function AccountDrawer({ visible, setAccountDrawerVisible }) {
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
      width={375}
      onClose={() => setAccountDrawerVisible(false)}
      visible={visible}
    >
      <Button className='signout-button' onClick={handleSignOut}>
        注销
      </Button>
    </Drawer>
  );
}

const mapSateToProps = (state) => ({
  visible: state.accountDrawer.visible,
});

const mapDispatchToProps = (dispatch) => ({
  setAccountDrawerVisible: (visible) =>
    dispatch(setAccountDrawerVisible(visible)),
});

export default connect(mapSateToProps, mapDispatchToProps)(AccountDrawer);
