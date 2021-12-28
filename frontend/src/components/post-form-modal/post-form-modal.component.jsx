import { useState } from 'react';

import { Modal, Button, message, Result, Spin } from 'antd';

import { connect } from 'react-redux';
import { setPostFormModalVisible } from '../../redux/post-form-modal/post-form-modal.actions';
import { setFormInit } from '../../redux/post-form/post-form.actions';

import PostForm from '../post-form/post-form.component';
import { isValidPhoneNum } from '../signin/signin.component';

import axios from 'axios';

import { API_GATEWAY } from '../../apiGateway';

import './post-form-modal.styles.scss';

function PostFormModal({
  visible,
  setPostFormModalVisible,
  currentUser,
  contactNum,
  state,
  city,
  category,
  title,
  description,
  images,
  setFormInit,
  isMobile,
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const IsValidForm = () => {
    if (!isValidPhoneNum(contactNum)) {
      message.error('号码格式不正确');
      return false;
    } else if (!state) {
      message.error('请选择地区');
      return false;
    } else if (!category) {
      message.error('请选择类型');
      return false;
    } else if (!title) {
      message.error('标题不能空');
      return false;
    } else if (title.length < 4) {
      message.error('标题最少4个字');
      return false;
    } else if (title.length > 50) {
      message.error('标题最多50个字');
      return false;
    } else if (!description) {
      message.error('描述不能空');
      return false;
    } else if (description.length < 10) {
      message.error('描述最少10个字');
      return false;
    } else {
      return true;
    }
  };

  const handleFormSubmit = () => {
    if (!IsValidForm()) {
      return;
    }
    setSpinning(true);
    getUserIdToken();
  };

  const getUserIdToken = () => {
    currentUser
      .getIdToken(true)
      .then((idToken) => {
        // Post text data
        postTextData(idToken);
      })
      .catch(() => {
        // Firebase error
        message.error('发布失败，稍后再试', 5);
        setSpinning(false);
      });
  };

  const postTextData = (idToken) => {
    // Setup axios
    const api = `${API_GATEWAY}/api/create/`;
    const data = {
      user: currentUser.uid,
      contact_num: contactNum,
      state: state,
      city: city || null,
      category: category,
      title: title,
      description: description,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
    };
    // Post text data
    axios
      .post(api, data, config)
      .then((response) => {
        // Create a list of objects
        if (images) {
          postImageUrls(idToken, response, images);
        } else {
          setIsSubmitted(true);
          setSpinning(false);
        }
      })
      .catch(() => {
        // Post create error
        message.error('发布失败，稍后再试', 5);
        setSpinning(false);
      });
  };

  const postImageUrls = (idToken, response, images) => {
    const json = [];
    for (const url of images) {
      let obj = {
        post: response.data.id,
        img_url: url,
      };
      json.push(obj);
    }
    // Setup axios
    const api = `${API_GATEWAY}/api/images/`;
    const data = json;
    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
    };
    axios
      .post(api, data, config)
      .then(() => {
        setIsSubmitted(true);
        setSpinning(false);
      })
      .catch(() => {
        // Images create error
        setIsSubmitted(true);
        setSpinning(false);
        message.error('照片提交失败', 5);
      });
  };

  const handleCloseFormModal = () => {
    setPostFormModalVisible(false);
    setIsSubmitted(false);
    setFormInit();
  };

  return (
    <Modal
    title={[
      <Button
        onClick={handleCloseFormModal}
      >
        关闭
      </Button>,
    ]}
      centered
      visible={visible}
      onCancel={handleCloseFormModal}
      width={!isMobile ? '1000px' : '100vw'}
      bodyStyle={
        !isMobile
          ? { height: '75vh', padding: '0px' }
          : { height: '85vh', padding: '0px' }
      }
      destroyOnClose={true}
      footer={
        !isSubmitted ? (
          <Button type='primary' onClick={handleFormSubmit} disabled={spinning}>
            确认发布
          </Button>
        ) : null
      }
    >
      {!isSubmitted ? (
        <PostForm />
      ) : (
        <Result
          status='success'
          title='发布成功!'
          subTitle='刷新便可看到你的帖子'
          extra={
            <Button type='primary'>
              <a href='/'>刷新</a>
            </Button>
          }
        />
      )}
      {spinning ? (
        <div className='form-dim'>
          <Spin className='spin' size='large' tip='正在提交...' />
        </div>
      ) : null}
    </Modal>
  );
}

const mapSateToProps = (state) => ({
  visible: state.postFormModal.visible,
  currentUser: state.user.currentUser,
  contactNum: state.postForm.contactNum,
  state: state.postForm.state,
  city: state.postForm.city,
  category: state.postForm.category,
  title: state.postForm.title,
  description: state.postForm.description,
  images: state.postForm.images,
  isMobile: state.isMobile.boolean,
});

const mapDispatchToProps = (dispatch) => ({
  setPostFormModalVisible: (visible) =>
    dispatch(setPostFormModalVisible(visible)),
  setFormInit: () => dispatch(setFormInit()),
});

export default connect(mapSateToProps, mapDispatchToProps)(PostFormModal);
