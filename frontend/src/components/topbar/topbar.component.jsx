import { useState } from 'react';
import { Tooltip, Input, Drawer } from 'antd';
import { ReactComponent as LocationIcon } from '../../assets/location_on_black_24dp.svg';
import { ReactComponent as AccountIcon } from '../../assets/person_outline_black_24dp.svg';
import Locations from '../locations/locations.component';

import './topbar.styles.scss';
import 'antd/dist/antd.css';

const { Search } = Input;

const onSearch = (value) => console.log(value);

function TopBar({ currentLocation }) {
  const [locationDrawerVisible, setLocationDrawerVisible] = useState(false);

  const showLocationDrawer = () => {
    console.log('change location clicked');
    setLocationDrawerVisible(true);
  };

  const closeLocationDrawer = () => {
    setLocationDrawerVisible(false);
  };

  return (
    <header className='topbar'>
      <div className='title-location'>
        <Tooltip title='首页'>
          <div className='title'>
            <a href='/' className='a'>华人同城网</a>
          </div>
        </Tooltip>

        <Tooltip title='切换地区' onClick={showLocationDrawer}>
          <div className='location'>
            <LocationIcon />[{currentLocation?currentLocation:'全美'}]
          </div>
        </Tooltip>
      </div>
      <div className='search'>
        <Search
          placeholder='搜索关键词'
          allowClear
          onSearch={onSearch}
          style={{ width: '20vw' }}
        />
      </div>

      <div className='account'>
        <Tooltip title='个人中心'>
          <AccountIcon className='account-icon' />
        </Tooltip>
      </div>

      <Drawer
        title='切换地区'
        placement='left'
        width='375'
        onClose={closeLocationDrawer}
        visible={locationDrawerVisible}
      >
        <Locations setLocationDrawerVisible={setLocationDrawerVisible}/>
      </Drawer>
    </header>
  );
}

export default TopBar;
