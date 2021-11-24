import { useState } from 'react';
import { Radio } from 'antd';

import 'antd/dist/antd.css';
import './radio-group.styles.scss'


const RadioGroup = () => {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Radio.Group
      onChange={onChange}
      value={value}
      optionType='button'
      className='radio-group'
    >
      <Radio.Button value={1} style={{ fontSize: '0.9rem' }}>全部</Radio.Button>
      <Radio.Button value={2} style={{ fontSize: '0.9rem' }}>曼哈顿</Radio.Button>
      <Radio.Button value={3} style={{ fontSize: '0.9rem' }}>布鲁克林</Radio.Button>
      <Radio.Button value={4} style={{ fontSize: '0.9rem' }}>法拉盛</Radio.Button>
    </Radio.Group>
  );
};

export default RadioGroup;
