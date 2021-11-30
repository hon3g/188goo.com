import { Radio } from 'antd';
import { useParams, useSearchParams } from 'react-router-dom';

import 'antd/dist/antd.css';
import './radio-group.styles.scss';

const NY = ['曼哈顿', '法拉盛', '布鲁伦', '皇后区', '布朗士', '长岛', '史登岛'];

const RadioGroup = () => {
  const { state } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = (e) => {
    setSearchParams({ city: e.target.value });
  };

  if (state !== '纽约') {
    return (
      <Radio checked={true} className='radio-item'>{`${state || '全美'}`}</Radio>
    );
  }
  return (
    <Radio.Group
      onChange={onChange}
      value={searchParams.get('city') || '全部'}
      className='radio-group'
    >
    <Radio value={'全部'} className='radio-item'>全部</Radio>
    {NY.map((city) => (
            <Radio key={city} value={city} className='radio-item'>
              {city}
            </Radio>
          ))}
    </Radio.Group>
  );
};

export default RadioGroup;
