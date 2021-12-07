import { useState } from 'react';

import { Modal, Cascader, Input, Button } from 'antd';

import { connect } from 'react-redux';
import { setPostFormModalVisible } from '../../redux/post-form-modal/post-form-modal.actions';

import { LOCATION_OPTIONS, CATEGORY_OPTIONS } from './options';
import { formatPhoneNumber } from '../signin/signin.component';

import './post-form-modal.styles.scss';

const { TextArea } = Input;

function PostFormModal({ visible, setPostFormModalVisible }) {
  const [phoneNumInput, setPhoneNumInput] = useState();

  const onSelectLocationChange = (value) => {
    console.log(value);
  };

  const handlePhoneNumInput = (e) => {
    // this is where we'll call the phoneNumberFormatter function
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    // we'll set the input value using our setInputValue
    setPhoneNumInput(formattedPhoneNumber);
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
      footer={<Button type='primary'>确认发布</Button>}
    >
      <form className='post-form'>
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
      </form>
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
