import { useState, useEffect } from 'react';
import { Radio } from 'antd';
import { useSearchParams } from 'react-router-dom';

import 'antd/dist/antd.css';
import './radio-group.styles.scss';

const NY = ['曼哈顿', '法拉盛', '布鲁伦', '皇后区', '布朗士', '长岛', '史登岛'];

const RadioGroup = () => {
  const [value, setValue] = useState();
  const [searchParams] = useSearchParams();
  const currentLocation = '全'.concat(searchParams.get('state') || '美');

  useEffect(() => setValue(currentLocation), [currentLocation]);

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
      defaultValue={currentLocation}
    >
      <Radio.Button
        key={currentLocation}
        value={currentLocation}
        className='radio-item'
      >
        {currentLocation}
      </Radio.Button>
      {currentLocation === '全纽约'
        ? NY.map((area) => (
            <Radio.Button key={area} value={area} className='radio-item'>
              {area}
            </Radio.Button>
          ))
        : null}
    </Radio.Group>
  );
};

export default RadioGroup;
