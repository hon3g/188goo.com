import { Modal, Button, message } from 'antd';

import { connect } from 'react-redux';
import { setPostFormModalVisible } from '../../redux/post-form-modal/post-form-modal.actions';

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
}) {
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
    currentUser
      .getIdToken(true)
      .then((idToken) => {
        // Send token to backend via HTTPS
        console.log(idToken);
        const url = 'http://localhost:8000/api/create/';
        const data = {
          user: currentUser.uid,
          contact_num: contactNum,
          state: state,
          city: city,
          category: category,
          title: title,
          description: description,
        };
        const config = {headers: {}}
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };

  return (
    <Modal
      title={'免费发布信息'}
      centered
      visible={visible}
      onCancel={() => setPostFormModalVisible(false)}
      width={'75vw'}
      bodyStyle={{ height: '75vh' }}
      destroyOnClose={true}
      footer={
        <Button type='primary' onClick={handleFormSubmit}>
          确认发布
        </Button>
      }
    >
      <PostForm />
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
});

export default connect(mapSateToProps, mapDispatchToProps)(PostFormModal);
