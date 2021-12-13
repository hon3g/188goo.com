import { useState } from 'react';

import { Modal, Button, message, Result, Spin } from 'antd';

import { connect } from 'react-redux';
import { setPostFormModalVisible } from '../../redux/post-form-modal/post-form-modal.actions';
import { setFormInit } from '../../redux/post-form/post-form.actions';

import PostForm from '../post-form/post-form.component';
import { isValidPhoneNum } from '../signin/signin.component';

import axios from 'axios';

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
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const IsValidForm = () => {
    if (!isValidPhoneNum(contactNum)) {
      message.error('号码格式不正确', 5);
      return false;
    } else if (!state) {
      message.error('请选择地区', 5);
      return false;
    } else if (!category) {
      message.error('请选择类型', 5);
      return false;
    } else if (!title) {
      message.error('标题不能空', 5);
      return false;
    } else if (title.length <= 4) {
      message.error('标题最少4个字', 5);
      return false;
    } else if (title.length > 50) {
      message.error('标题最多50个字', 5);
      return false;
    } else if (!description) {
      message.error('描述不能空', 5);
      return false;
    } else if (description.length <= 10) {
      message.error('描述最少10个字', 5);
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
    // function timeout(delay) {
    //   return new Promise((res) => setTimeout(res, delay));
    // }
    // timeout(10000).then(() => {
    currentUser
      .getIdToken(true)
      .then((idToken) => {
        // Send token to backend via HTTPS
        // Setup axios
        const url = 'http://localhost:8000/api/create/';
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
        // Send text data
        axios
          .post(url, data, config)
          .then((response) => {
            // Send image urls
            // Create a list of objects
            if (images) {
              const json = [];
              for (const url of images) {
                let obj = {
                  post: response.data.id,
                  img_url: url,
                };
                json.push(obj);
              }
              // Setup axios
              const url = 'http://localhost:8000/api/images/';
              const data = json;
              const config = {
                headers: {
                  Authorization: `Bearer ${idToken}`,
                  'Content-Type': 'application/json',
                },
              };
              axios
                .post(url, data, config)
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
      })
      .catch(() => {
        // Firebase error
        message.error('发布失败，稍后再试', 5);
        setSpinning(false);
      });
    // });
  };

  const handleCloseFormModal = () => {
    setPostFormModalVisible(false);
    setIsSubmitted(false);
    setFormInit();
  };

  return (
    <Modal
      title={'免费发布信息'}
      centered
      visible={visible}
      onCancel={handleCloseFormModal}
      width={'75vw'}
      bodyStyle={{ height: '75vh' }}
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
          subTitle='刷新便可看见你的新帖子'
          extra={
            <Button type='primary'>
              <a href='/'>刷新</a>
            </Button>
          }
        />
      )}
      {spinning ? (
        <div className='dim'>
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
});

const mapDispatchToProps = (dispatch) => ({
  setPostFormModalVisible: (visible) =>
    dispatch(setPostFormModalVisible(visible)),
  setFormInit: () => dispatch(setFormInit()),
});

export default connect(mapSateToProps, mapDispatchToProps)(PostFormModal);
