import { useState, useEffect } from 'react';
import { Radio } from 'antd';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

import 'antd/dist/antd.css';
import './radio-group.styles.scss';

const NY = ['曼哈顿', '法拉盛', '布鲁伦', '皇后区', '布朗士', '长岛', '史登岛'];

const RadioGroup = () => {
  const [value, setValue] = useState();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { search } = useLocation();
  let currentLocation = '全'.concat(searchParams.get('state') || '美');

  if (!searchParams.get('state')) {
    currentLocation = '全美';
  } else if (searchParams.get('state') === '纽约') {
    currentLocation = '全纽约';
  } else {
    currentLocation = searchParams.get('state');
  }

  useEffect(() => setValue(currentLocation), [currentLocation]);

  const onChange = (e) => {
    setValue(e.target.value);
    if (searchParams.get('city')) {
      let currentSearchParams = '/?';
      for (const [key, value] of searchParams) {
        console.log(key, value);

        if (key !== 'city') {
          currentSearchParams += `${key}=${value}&`;
        }

        if (e.target.value.startsWith('全')) {
          navigate(currentSearchParams.slice(0, -1));
        } else {
          navigate(currentSearchParams + `city=${e.target.value}`);
        }
      }
    } else {
      navigate(search + `&city=${e.target.value}`);
    }
  };

  return (
    <Radio.Group
      onChange={onChange}
      value={searchParams.get('city') || currentLocation}
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
