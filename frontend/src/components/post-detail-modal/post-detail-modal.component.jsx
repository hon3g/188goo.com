import { Modal, Button } from 'antd';

import { connect } from 'react-redux';
import { setPostDetailModalVisible } from '../../redux/post-detail-modal/post-detail-modal.actions';

function PostDetailModal({ visible, setPostDetailModalVisible, currentPost }) {
  return (
    <Modal
      title={[
        <Button
          type='primary'
          ghost
          onClick={() => setPostDetailModalVisible(false)}
          style={{ marginRight: '1rem' }}
        >
          返回
        </Button>,
        currentPost?currentPost.title:null,
      ]}
      centered
      visible={visible}
      onCancel={() => setPostDetailModalVisible(false)}
      width={'75vw'}
      bodyStyle={{ height: '75vh' }}
      maskStyle={{ background: 'rgba(255, 255, 255, 0.5)' }}
      style={{ animationDuration: '0s' }}
      destroyOnClose={true}
      footer={[
        <Button
          type='primary'
          ghost
          onClick={() => setPostDetailModalVisible(false)}
        >
          关闭
        </Button>,
      ]}
    >
      <pre
        style={{
          height: '100%',
          whiteSpace: 'pre-line',
          overflowY: 'scroll',
        }}
      >
        {currentPost?currentPost.content:null}
      </pre>
    </Modal>
  );
}

const mapSateToProps = (state) => ({ 
    visible: state.postDetailModal.visible,
    currentPost: state.currentPost.post,
 });

const mapDispatchToProps = (dispatch) => ({
  setPostDetailModalVisible: (visible) =>
    dispatch(setPostDetailModalVisible(visible)),
});

export default connect(mapSateToProps, mapDispatchToProps)(PostDetailModal);
