import { Modal, Button, Image } from 'antd';

import { connect } from 'react-redux';
import { setPostDetailModalVisible } from '../../redux/post-detail-modal/post-detail-modal.actions';

import { formattedDate } from '../post-list/post-list.component';

import './post-detail-modal.styles.scss';

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
        currentPost.title,
      ]}
      centered
      visible={visible}
      onCancel={() => setPostDetailModalVisible(false)}
      width={'75vw'}
      bodyStyle={{ height: '75vh' }}
      // maskStyle={{ background: 'rgba(255, 255, 255, 0.5)' }}
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
        <div className='post-detail'>
          <div className='detail-left'>
            <div>{currentPost.description}</div>
            <div className='detail-left-bottom'>
              <span>电话: {currentPost.contact_num}</span>
              <span>
                位置: {currentPost.state}
                {currentPost.city ? `/${currentPost.city}` : null}
              </span>
              <span>日期: {formattedDate(currentPost.pub_date)}</span>
            </div>
          </div>
          <span />
          <div className='detail-right'>
            {currentPost.images
              ? currentPost.images.map((imgUrl) => (
                  <Image width={200} src={imgUrl} />
                ))
              : null}
          </div>
        </div>
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
