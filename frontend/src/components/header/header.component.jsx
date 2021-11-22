import { ReactComponent as LocationIcon } from '../../assets/location_on_black_24dp.svg';
import { ReactComponent as AccountIcon } from '../../assets/person_outline_black_24dp.svg';
import { Tooltip, Input } from 'antd';

import './header.styles.scss';
import 'antd/dist/antd.css';

const { Search } = Input;

const onSearch = (value) => console.log(value);

const Header = ({ currentLocation, title }) => (
  <nav className='top-bar'>
    <div className='title-location'>
      <Tooltip title='首页'>
        <div className='title'>{title}</div>
      </Tooltip>
      <Tooltip title='切换地区'>
        <div className='location'>
          <LocationIcon />[{currentLocation}]
        </div>
      </Tooltip>
    </div>
    <div className='search'>
      <Search
        placeholder='搜索标题关键词'
        allowClear
        onSearch={onSearch}
        style={{ width: 300 }}
      />
    </div>

    <div className='account'>
      <Tooltip title='个人中心'>
        <AccountIcon />
      </Tooltip>
    </div>
  </nav>
);

export default Header;
