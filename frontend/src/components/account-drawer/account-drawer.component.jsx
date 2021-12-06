import { Drawer } from 'antd';
import { connect } from 'react-redux';
import { setAccountDrawerVisible } from '../../redux/account-drawer/account-drawer.actions'
import { auth } from '../../firebase/firebase';
import { signOut } from "firebase/auth";



function AccountDrawer({ visible, setAccountDrawerVisible }) {

  return (
    <Drawer
      title='个人中心'
      placement='right'
      width={375}
      onClose={() => setAccountDrawerVisible(false)}
      visible={visible}
    >
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