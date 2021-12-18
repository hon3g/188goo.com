import { Modal, Button, Image } from 'antd';

import { connect } from 'react-redux';
import { setPostDetailModalVisible } from '../../redux/post-detail-modal/post-detail-modal.actions';

import { formattedDate } from '../post-list/post-list.component';

import { ReactComponent as ImageSvg } from '../../assets/undraw_images_re_0kll.svg';

import './post-detail-modal.styles.scss';

function PostDetailModal({
  visible,
  setPostDetailModalVisible,
  currentPost,
  isMobile,
}) {
  if (!isMobile) {
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
              <div className='desc'>
                <span>{currentPost.description}</span>
                <br />
                <span>联系我时，请说是在美国188看到的</span>
              </div>
              <br />
              <div className='info'>
                <span>
                  电话：<span className='num'>{currentPost.contact_num}</span>
                </span>
                <span>
                  位置：{currentPost.state}
                  {currentPost.city ? `/${currentPost.city}` : null}
                </span>
                <span>日期：{formattedDate(currentPost.pub_date)}</span>
              </div>
            </div>
            <span />
            <div className='detail-right'>
              {currentPost.images && currentPost.images.length !== 0 ? (
                currentPost.images.map((imgUrl) => (
                  <Image width={200} src={imgUrl} />
                ))
              ) : (
                <ImageSvg className='image-holder' />
              )}
            </div>
          </div>
        </pre>
      </Modal>
    );
  } else {
    return (
      <Modal
        centered
        visible={visible}
        onCancel={() => setPostDetailModalVisible(false)}
        width={'100vw'}
        bodyStyle={{ height: '90vh', padding: '0px', paddingTop: '2rem' }}
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
          <div className='m-post-detail'>
            <div className='m-detail-images'>
              {currentPost.images && currentPost.images.length !== 0
                ? currentPost.images.map((imgUrl) => (
                    <Image width={150} src={imgUrl} />
                  ))
                : null}
            </div>
            <div className='m-detail-text'>
              <div className='m-desc'>
                <span>{currentPost.description}</span>
                <br />
                <span>联系我时，请说是在美国188看到的</span>
              </div>
              <br />
              <div className='m-info'>
                <span>
                  电话：<span className='m-num'>{currentPost.contact_num}</span>
                </span>
                <span>
                  位置：{currentPost.state}
                  {currentPost.city ? `/${currentPost.city}` : null}
                </span>
                <span>日期：{formattedDate(currentPost.pub_date)}</span>
              </div>
            </div>
            <span />
          </div>
        </pre>
      </Modal>
    );
  }
}

const mapSateToProps = (state) => ({
  visible: state.postDetailModal.visible,
  currentPost: state.currentPost.post,
  isMobile: state.isMobile.boolean,
});

const mapDispatchToProps = (dispatch) => ({
  setPostDetailModalVisible: (visible) =>
    dispatch(setPostDetailModalVisible(visible)),
});

export default connect(mapSateToProps, mapDispatchToProps)(PostDetailModal);
