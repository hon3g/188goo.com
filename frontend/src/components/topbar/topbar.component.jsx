import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tooltip, Drawer, Button } from 'antd';
import { ReactComponent as LocationIcon } from '../../assets/location_on_black_24dp.svg';

import Locations from '../locations/locations.component';
import Navbar from '../navbar/navbar.component';

import { Link, useLocation } from 'react-router-dom';

import './topbar.styles.scss';
import 'antd/dist/antd.css';

function TopBar() {
  const [locationDrawerVisible, setLocationDrawerVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const currentLocation = searchParams.get('state');
  const location = useLocation();

  const showLocationDrawer = () => {
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
            <a href='/' className='a'>
              188同城网
            </a>
          </div>
        </Tooltip>

        <Tooltip title='切换地区' onClick={showLocationDrawer}>
          <Link to={`${location.search}`} className='location'>
            <LocationIcon />[{currentLocation ? currentLocation : '全美'}]
          </Link>
        </Tooltip>
      </div>
      <div className='menu'>
        <Navbar />
      </div>

      {/* <div className='search'>
        <Search
          placeholder='搜索关键词'
          allowClear
          onSearch={onSearch}
          style={{ width: '15vw' }}
        />
      </div> */}

      <div className='account'>
        <Tooltip title='无需填写信息'>
          <Button type='primary' ghost>
            登陆
          </Button>
        </Tooltip>
      </div>

      <Drawer
        title='切换地区'
        placement='left'
        width='375'
        onClose={closeLocationDrawer}
        visible={locationDrawerVisible}
      >
        <Locations setLocationDrawerVisible={setLocationDrawerVisible} />
      </Drawer>
    </header>
  );
}

export default TopBar;
