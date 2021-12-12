import { Modal, Button } from 'antd';

import { connect } from 'react-redux';
import { setPostFormModalVisible } from '../../redux/post-form-modal/post-form-modal.actions';

import PostForm from '../post-form/post-form.component';

import './post-form-modal.styles.scss';

function PostFormModal({
  visible,
  setPostFormModalVisible,
  currentUser,
  phoneNumber,
  state,
  city,
  category,
  title,
  description,
  images,
}) {
  const handleFormSubmit = () => {
    currentUser
      .getIdToken(true)
      .then((idToken) => {
        // Send token to backend via HTTPS
        console.log(idToken);
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
  phoneNumber: state.postForm.phoneNumber,
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
