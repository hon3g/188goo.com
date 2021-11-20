import { ReactComponent as LocationIcon } from '../../assets/location_on_white_24dp.svg';
import { ReactComponent as AccountIcon } from '../../assets/person_white_24dp.svg';
import { Tooltip } from 'antd';

import './header.styles.scss';
import 'antd/dist/antd.css';

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
    <div className='account'>
      <Tooltip title='登陆 / 注册'>
        <AccountIcon />
      </Tooltip>
    </div>
  </nav>
);

export default Header;
