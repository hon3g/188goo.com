import { useParams } from 'react-router-dom';
import { Tooltip, Button, Input } from 'antd';
import { ReactComponent as LocationIcon } from '../../assets/location_on_black_24dp.svg';

import { connect } from 'react-redux';
import { setLocationDrawerVisible } from '../../redux/location-drawer/location-drawer.actions';

import './topbar.styles.scss';
import 'antd/dist/antd.css';

const { Search } = Input;

function TopBar({ setLocationDrawerVisible }) {
  const { state } = useParams();

  const onSearch = (value) => console.log(value);

  const handleChangeLocation = () => {
    setLocationDrawerVisible(true)
  }

  return (
    <header className='topbar'>
      <div className='title-location'>
        <Tooltip title='硬刷新'>
          <div className='title'>
            <a href='/' className='a'>
              美国188
            </a>
          </div>
        </Tooltip>

        <Tooltip
          title='切换地区'
          onClick={handleChangeLocation}
        >
          <span className='location'>
            <LocationIcon className='loc-icon' />[{state || '全美'}]
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
    </header>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setLocationDrawerVisible: (visible) => dispatch(setLocationDrawerVisible(visible))
});

export default connect(null, mapDispatchToProps)(TopBar);
