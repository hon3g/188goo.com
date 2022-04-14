import { Modal, Button, Image } from 'antd';

import { connect } from 'react-redux';
import { setPostDetailModalVisible } from '../../redux/post-detail-modal/post-detail-modal.actions';

import { formattedDate } from '../post-list/post-list.component';

import Poster from '../../assets/poster.jpg';
import Warning from '../../assets/warning.jpg';

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
          <Button onClick={() => setPostDetailModalVisible(false)}>
            关闭
          </Button>,
        ]}
        centered
        visible={visible}
        onCancel={() => setPostDetailModalVisible(false)}
        width={'1000px'}
        bodyStyle={{ height: '75vh', padding: '0px' }}
        destroyOnClose={true}
        footer={null}
      >
        <pre
          style={{
            height: '100%',
            whiteSpace: 'pre-line',
            overflowY: 'auto',
          }}
        >
          <div className='post-detail'>
            <div className='detail-left'>
              <div className='desc'>
                <span className='desc-title'>{currentPost.title}</span>
                <span className='desc-desc'>{currentPost.description}</span>
              </div>
            </div>
            <span />
            <div className='detail-right'>
              <div className='info'>
                <span>
                  电话：
                  <a href={`tel:${currentPost.contact_num}`} className='num'>
                    {currentPost.contact_num}
                  </a>
                </span>
                <span>
                  位置：
                  {currentPost.state}
                  {currentPost.city ? `/${currentPost.city}` : null}
                </span>
                <span>
                  日期：
                  {formattedDate(currentPost.pub_date)}
                </span>
              </div>
              {currentPost.images && currentPost.images.length !== 0 ? (
                currentPost.images
                  .slice()
                  .reverse()
                  .map((imgUrl) => <Image width='50%' src={imgUrl} />)
              ) : (
                <div>
                  <Image width='50%' src={Poster} />
                  <Image width='50%' src={Warning} />
                </div>
              )}
            </div>
          </div>
        </pre>
      </Modal>
    );
  } else {
    return (
      <Modal
        title={[
          <Button onClick={() => setPostDetailModalVisible(false)}>
            关闭
          </Button>,
        ]}
        centered
        visible={visible}
        onCancel={() => setPostDetailModalVisible(false)}
        width={'100vw'}
        bodyStyle={{ height: '100vh', padding: '0px' }}
        destroyOnClose={true}
        footer={null}
      >
        <pre
          style={{
            height: '100%',
            whiteSpace: 'pre-line',
            overflowY: 'auto',
          }}
        >
          <div className='m-post-detail'>
            <div className='m-detail-text'>
              <div className='m-desc'>
                <span className='m-desc-title'>{currentPost.title}</span>
                <span className='m-desc-desc'>{currentPost.description}</span>
              </div>
              <div className='m-info'>
                <span>
                  电话：
                  <a href={`tel:${currentPost.contact_num}`} className='m-num'>
                    {currentPost.contact_num}
                  </a>
                </span>
                <span>
                  位置：
                  {currentPost.state}
                  {currentPost.city ? `/${currentPost.city}` : null}
                </span>
                <span>
                  日期：
                  {formattedDate(currentPost.pub_date)}
                </span>
              </div>
            </div>
            <div className='m-detail-images'>
              {currentPost.images && currentPost.images.length !== 0 ? (
                currentPost.images
                  .slice()
                  .reverse()
                  .map((imgUrl) => <Image width='50%' src={imgUrl} />)
              ) : (
                <div>
                  <Image width='50%' src={Poster} />
                  <Image width='50%' src={Warning} />
                </div>
              )}
            </div>
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
