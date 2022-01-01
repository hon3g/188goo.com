import { useEffect, useRef, useState } from 'react';

import { Drawer, Button, message, Avatar, Popover, Input } from 'antd';

import { connect } from 'react-redux';
import { setAccountDrawerVisible } from '../../redux/account-drawer/account-drawer.actions';
import { setPostFormModalVisible } from '../../redux/post-form-modal/post-form-modal.actions';
import { setCurrentUser } from '../../redux/user/user.actions';

import { auth, storage } from '../../firebase/firebase';
import { signOut, updateProfile } from 'firebase/auth';
import { ref, uploadBytes } from 'firebase/storage';

import { randomDisplayName } from '../signin/naming';

import { resizeFile } from '../post-form/image-resizer';

import './account-drawer.styles.scss';

function AccountDrawer({
  visible,
  setAccountDrawerVisible,
  setPostFormModalVisible,
  currentUser,
  setCurrentUser,
}) {
  const inputProfilePhoto = useRef();
  const [inputUsername, setInputUsername] = useState('');

  useEffect(() => {
    if (auth.currentUser && !auth.currentUser.displayName) {
      updateProfile(auth.currentUser, {
        displayName: randomDisplayName(),
      });
    }
  });

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

  const handleEditPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    let fileName = currentUser.uid + new Date().getTime();
    const storageRef = ref(storage, `profileImages/${fileName}`);
    const photo = await resizeFile(file, 150, 150);
    try {
      await uploadBytes(storageRef, photo);
      await updateProfile(auth.currentUser, {
        photoURL: `https://firebasestorage.googleapis.com/v0/b/us188-1b523.appspot.com/o/profileImages%2F${fileName}?alt=media`,
      });
      setAccountDrawerVisible(false);
      function timeout(delay) {
        return new Promise((res) => setTimeout(res, delay));
      }
      await timeout(500);
      setAccountDrawerVisible(true);
      message.success('修改成功!');
    } catch (error) {
      message.error('修改失败，请稍后再试');
    }
  };

  const handleEditUsername = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: inputUsername,
      });
      setAccountDrawerVisible(false);
      function timeout(delay) {
        return new Promise((res) => setTimeout(res, delay));
      }
      await timeout(500);
      setAccountDrawerVisible(true);
      message.success('修改成功!');
      setInputUsername('');
    } catch (error) {
      message.error('修改失败，请稍后再试');
    }
  };

  return (
    <Drawer
      title='个人中心'
      placement='right'
      onClose={() => setAccountDrawerVisible(false)}
      visible={visible}
      destroyOnClose={true}
    >
      <div className='account-content'>
        <div className='acc-top'>
          <h3>
            {currentUser ? formatedPhoneNum(currentUser.phoneNumber) : null}
          </h3>
          <Button type='primary' onClick={() => setPostFormModalVisible(true)}>
            发布信息
          </Button>
        </div>
        <div className='acc-middle'>
          <div className='photo-and-name'>
            <div className='photo-section'>
              <div className='sec-left'>头像：</div>
              <Avatar
                className='account-photo'
                src={
                  currentUser && currentUser.photoURL
                    ? currentUser.photoURL
                    : null
                }
              />
              <div className='sec-right'>
                <span
                  className='edit'
                  onClick={() => inputProfilePhoto.current.click()}
                >
                  修改
                  <input
                    type='file'
                    accept='image/*'
                    ref={inputProfilePhoto}
                    style={{ display: 'none' }}
                    onChange={handleEditPhoto}
                  />
                </span>
              </div>
            </div>
            <div className='name-section'>
              <div className='sec-left'>昵称：</div>
              <div className='display-name'>
                {currentUser ? currentUser.displayName : null}
              </div>
              <div className='sec-right'>
                <span className='edit'>
                  <Popover
                    content={
                      <div>
                        <Input
                          style={{ width: '130px' }}
                          maxLength={5}
                          onChange={(e) => setInputUsername(e.target.value)}
                          autoFocus={true}
                        />
                        <Button
                          type='primary'
                          ghost
                          onClick={handleEditUsername}
                          disabled={!inputUsername.replace(/\s+/g, '')}
                        >
                          确认
                        </Button>
                      </div>
                    }
                    title='新昵称'
                    trigger='click'
                    placement='left'
                  >
                    修改
                  </Popover>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='acc-bottom'>
          {/* <Button
            className='signout-button'
            size='small'
            onClick={handleSignOut}
          >
            注销账号
          </Button> */}
        </div>
      </div>
    </Drawer>
  );
}

function formatedPhoneNum(numStr) {
  // Input: +13475557048
  const partOne = numStr.slice(2, 5); // 347
  const partTwo = numStr.slice(5, 8); // 555
  const partThree = numStr.slice(8); // 7048
  // Output: +1 (347) 555-7048
  return `+1 (${partOne}) ${partTwo}-${partThree}`;
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
