import { useState } from 'react';
import { Radio } from 'antd';

import 'antd/dist/antd.css';

const RadioButton = () => {
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
      style={{ marginBottom: '2rem', fontSize: '1rem' }}
    >
      <Radio value={1} style={{ fontSize: '0.9rem' }}>全部</Radio>
      <Radio value={2} style={{ fontSize: '0.9rem' }}>曼哈顿</Radio>
      <Radio value={3} style={{ fontSize: '0.9rem' }}>布鲁克林</Radio>
      <Radio value={4} style={{ fontSize: '0.9rem' }}>法拉盛</Radio>
    </Radio.Group>
  );
};

export default RadioButton;
