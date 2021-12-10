import { useParams } from 'react-router-dom';
import { Tooltip, Button, Input } from 'antd';
import { ReactComponent as LocationIcon } from '../../assets/location_on_black_24dp.svg';

import { connect } from 'react-redux';
import { setLocationDrawerVisible } from '../../redux/location-drawer/location-drawer.actions';
import { setSignInDrawerVisible } from '../../redux/signin-drawer/signin-drawer.actions';
import { setAccountDrawerVisible } from '../../redux/account-drawer/account-drawer.actions';

import { STATES } from '../post-list/constants';

import './topbar.styles.scss';

const { Search } = Input;

function TopBar({
  setLocationDrawerVisible,
  setSignInDrawerVisible,
  setAccountDrawerVisible,
  currentUser,
}) {
  const { state } = useParams();

  const onSearch = (value) => console.log(value);

  const handleChangeLocation = () => {
    setLocationDrawerVisible(true);
  };

  const handleSignIn = () => {
    setSignInDrawerVisible(true);
  };

  const handleAccount = () => {
    setAccountDrawerVisible(true);
  };

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

        <Tooltip title='切换地区'>
          <span className='location' onClick={handleChangeLocation}>
            <LocationIcon className='loc-icon' />[
            {STATES.has(state) ? state : '全美'}]
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
        {!currentUser ? (
          <Tooltip title='登陆'>
            <Button type='primary' ghost onClick={handleSignIn}>
              登陆
            </Button>
          </Tooltip>
        ) : (
          <Tooltip title='个人中心'>
            <Button type='primary' ghost onClick={handleAccount}>
              个人中心
            </Button>
          </Tooltip>
        )}
      </div>
    </header>
  );
}

const mapSateToProps = (state) => ({ currentUser: state.user.currentUser });

const mapDispatchToProps = (dispatch) => ({
  setLocationDrawerVisible: (visible) =>
    dispatch(setLocationDrawerVisible(visible)),
  setSignInDrawerVisible: (visible) =>
    dispatch(setSignInDrawerVisible(visible)),
  setAccountDrawerVisible: (visible) =>
    dispatch(setAccountDrawerVisible(visible)),
});

export default connect(mapSateToProps, mapDispatchToProps)(TopBar);
