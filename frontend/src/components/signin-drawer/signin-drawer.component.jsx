import { createRef } from 'react';
import { Drawer } from 'antd';
import { connect } from 'react-redux';
import { setSignInDrawerVisible } from '../../redux/signin-drawer/signin-drawer.actions';
import SignIn from '../signin/signin.component';



function SignInDrawer({ visible, setSignInDrawerVisible }) {
  const inputRef = createRef();

  const setInputFocus = (isOpen) => {
    isOpen && inputRef.current.focus();
  }

  return (
    <Drawer
      title='号码登陆'
      placement='right'
      width={375}
      onClose={() => setSignInDrawerVisible(false)}
      visible={visible}
      afterVisibleChange={setInputFocus}
      destroyOnClose={true}
    >
      <SignIn inputRef={inputRef}/>
    </Drawer>
  );
}

const mapSateToProps = (state) => ({
  visible: state.signInDrawer.visible,
});

const mapDispatchToProps = (dispatch) => ({
  setSignInDrawerVisible: (visible) =>
    dispatch(setSignInDrawerVisible(visible)),
});

export default connect(mapSateToProps, mapDispatchToProps)(SignInDrawer);
