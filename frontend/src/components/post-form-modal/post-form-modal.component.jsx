import { Modal, Button } from 'antd';

import { connect } from 'react-redux';
import { setPostFormModalVisible } from '../../redux/post-form-modal/post-form-modal.actions';

function PostFormModal({ visible, setPostFormModalVisible }) {
  return (
    <Modal
      title={'免费发布信息'}
      centered
      visible={visible}
      onCancel={() => setPostFormModalVisible(false)}
      width={'75vw'}
      bodyStyle={{ height: '75vh' }}
      maskStyle={{ background: 'rgba(255, 255, 255, 0.5)' }}
      style={{ animationDuration: '0s' }}
      destroyOnClose={true}
      footer={null}
    >
        <div>hello world</div>
    </Modal>
  );
}

const mapSateToProps = (state) => ({ 
    visible: state.postFormModal.visible,
 });

const mapDispatchToProps = (dispatch) => ({
  setPostFormModalVisible: (visible) =>
    dispatch(setPostFormModalVisible(visible)),
});

export default connect(mapSateToProps, mapDispatchToProps)(PostFormModal);
