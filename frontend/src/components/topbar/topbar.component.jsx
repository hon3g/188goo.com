import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tooltip, Drawer, Button, Input } from 'antd';
import { ReactComponent as LocationIcon } from '../../assets/location_on_black_24dp.svg';

import Locations from '../locations/locations.component';

import './topbar.styles.scss';
import 'antd/dist/antd.css';

const { Search } = Input;

function TopBar() {
  const [locationDrawerVisible, setLocationDrawerVisible] = useState(false);
  const { state } = useParams();

  const showLocationDrawer = () => {
    setLocationDrawerVisible(true);
  };

  const closeLocationDrawer = () => {
    setLocationDrawerVisible(false);
  };

  const onSearch = (value) => console.log(value);

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
          <span className='location'>
            <LocationIcon className='loc-icon'/>[{state || '全美'}]
          </span>
        </Tooltip>
      </div>

      <div className='search'>
        <Search
          placeholder='搜索关键词'
          allowClear
          onSearch={onSearch}
          style={{ maxWidth: '25vw' }}
        />
      </div>

      <div className='account'>
        <Tooltip title='快速登陆'>
          <Button type='primary' ghost>
            登陆
          </Button>
        </Tooltip>
      </div>

      <Drawer
        title='切换地区'
        placement='left'
        width={375}
        onClose={closeLocationDrawer}
        visible={locationDrawerVisible}
      >
        <Locations setLocationDrawerVisible={setLocationDrawerVisible} />
      </Drawer>
    </header>
  );
}

export default TopBar;
