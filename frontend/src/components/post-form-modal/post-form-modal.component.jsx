import { useState } from 'react';

import { Modal, Cascader, Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import { setPostFormModalVisible } from '../../redux/post-form-modal/post-form-modal.actions';

import { LOCATION_OPTIONS, CATEGORY_OPTIONS } from './options';
import { formatPhoneNumber } from '../signin/signin.component';

import axios from 'axios';

import './post-form-modal.styles.scss';

const { TextArea } = Input;

function PostFormModal({ visible, setPostFormModalVisible, currentUser }) {
  const [phoneNumInput, setPhoneNumInput] = useState();
  const [imageUploadUrl, setImageUploadUrl] = useState();

  const onSelectLocationChange = (value) => {
    console.log(value);
  };

  const handlePhoneNumInput = (e) => {
    // this is where we'll call the phoneNumberFormatter function
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    // we'll set the input value using our setInputValue
    setPhoneNumInput(formattedPhoneNumber);
  };

  const handleFormSubmit = () => {
    currentUser
      .getIdToken(true)
      .then((idToken) => {
        // Send token to backend via HTTPS
        console.log(idToken);
        console.log(currentUser.accessToken);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };

  const handleImageUpload = async () => {
    const response = await axios('http://localhost:8000/get_presigned_url');
    setImageUploadUrl(response.data);
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
      <form className='post-form'>
        <span />
        <div className='form-left'>
          <div className='phone'>
            <Input
              size='large'
              placeholder='联系电话'
              prefix='🇺🇸 +1'
              onChange={handlePhoneNumInput}
              value={phoneNumInput}
            />
          </div>
          <div className='selections'>
            <Cascader
              size='large'
              style={{ width: '50%' }}
              options={LOCATION_OPTIONS}
              onChange={onSelectLocationChange}
              placeholder='请选择地区'
            />
            <Cascader
              size='large'
              style={{ width: '50%' }}
              options={CATEGORY_OPTIONS}
              onChange={onSelectLocationChange}
              placeholder='请选择类型'
            />
          </div>
          <div className='title'>
            <Input size='large' placeholder='标题' />
          </div>
          <div className='description'>
            <TextArea
              size='large'
              placeholder='描述'
              showCount
              maxLength={200}
              rows={10}
              style={{ width: '100%' }}
            />
          </div>
        </div>
        <span />
        <div className='form-right'>
          <Upload
            listType='picture'
            maxCount={5}
            accept='image/*,.heic'
            beforeUpload={handleImageUpload}
            action={imageUploadUrl}
            method='put'
            headers={{ 'Content-Type': 'multipart/form-data' }}
          >
            <Button icon={<UploadOutlined />} style={{ width: '100%' }}>
              上传照片 (可选)
            </Button>
          </Upload>
        </div>
      </form>
    </Modal>
  );
}

const mapSateToProps = (state) => ({
  visible: state.postFormModal.visible,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setPostFormModalVisible: (visible) =>
    dispatch(setPostFormModalVisible(visible)),
});

export default connect(mapSateToProps, mapDispatchToProps)(PostFormModal);
