import { useState } from 'react';

import { Modal, Select, Button } from 'antd';

import { connect } from 'react-redux';
import { setPostFormModalVisible } from '../../redux/post-form-modal/post-form-modal.actions';

import { REGIONS, STATES, NY } from './location-data';

import './post-form-modal.styles.scss';

const { Option } = Select;
const regionData = REGIONS;
const stateData = STATES;

function PostFormModal({ visible, setPostFormModalVisible }) {
  const [states, setStates] = useState(stateData[regionData[0]]);
  const [secondState, setSecondState] = useState(stateData[regionData[0]][0]);

  const handleRegionChange = (value) => {
    setStates(stateData[value]);
    setSecondState(stateData[value][0]);
  };

  const onSecondStateChange = (value) => {
    setSecondState(value);
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
        <Select
          defaultValue={regionData[0]}
          style={{ width: 120 }}
          onChange={handleRegionChange}
        >
          {regionData.map((region) => (
            <Option key={region}>{region}</Option>
          ))}
        </Select>
        <Select
          style={{ width: 120 }}
          value={secondState}
          onChange={onSecondStateChange}
        >
          {states.map((state) => (
            <Option key={state}>{state}</Option>
          ))}
        </Select>
        {secondState === '纽约' ? (
          <Select
            style={{ width: 120 }}
            value={secondState}
            onChange={onSecondStateChange}
          >
            {NY.map((area) => (
              <Option key={area}>{area}</Option>
            ))}
          </Select>
        ) : null}
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
