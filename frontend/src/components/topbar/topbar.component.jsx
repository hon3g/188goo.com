import { useParams, Link } from 'react-router-dom';
import { Tooltip, Button } from 'antd';
import { ReactComponent as LocationIcon } from '../../assets/location_on_black_24dp.svg';

import { connect } from 'react-redux';
import { setLocationDrawerVisible } from '../../redux/location-drawer/location-drawer.actions';
import { setSignInDrawerVisible } from '../../redux/signin-drawer/signin-drawer.actions';
import { setAccountDrawerVisible } from '../../redux/account-drawer/account-drawer.actions';
import Navbar from '../navbar/navbar.component';

import { STATES } from '../post-list/constants';

import './topbar.styles.scss';

function TopBar({
  setLocationDrawerVisible,
  setSignInDrawerVisible,
  setAccountDrawerVisible,
  currentUser,
  isMobile,
}) {
  const { state } = useParams();

  const handleChangeLocation = () => {
    setLocationDrawerVisible(true);
  };

  const handleSignIn = () => {
    setSignInDrawerVisible(true);
  };

  const handleAccount = () => {
    setAccountDrawerVisible(true);
  };

  if (!isMobile) {
    return (
      <header className='topbar'>
        <div className='title-location'>
          <Tooltip title='全部信息'>
            <div className='title'>
              <Link to='/' className='a'>
                美国188
              </Link>
            </div>
          </Tooltip>

          <Tooltip title='切换州区'>
            <span className='location'>
              <Button size='small' onClick={handleChangeLocation}>
                <LocationIcon className='loc-icon' />
                {STATES.has(state) ? state : '全美'}
              </Button>
            </span>
          </Tooltip>
        </div>

        <div className='navbar'>
          <Navbar />
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
  } else {
    return (
      <header className='m-topbar'>
        <div className='m-title-location'>
          <div className='m-title'>
            <Link to='/' className='m-a'>
              美国188
            </Link>
          </div>

          <span className='m-location'>
            <Button size='small' onClick={handleChangeLocation}>
              <LocationIcon className='m-loc-icon' />
              {STATES.has(state) ? state : '全美'}
            </Button>
          </span>
        </div>

        <div className='m-navbar'></div>

        <div className='m-account'>
          {!currentUser ? (
            <Button type='primary' ghost onClick={handleSignIn}>
              登陆
            </Button>
          ) : (
            <Button type='primary' ghost onClick={handleAccount}>
              个人中心
            </Button>
          )}
        </div>
      </header>
    );
  }
}

const mapSateToProps = (state) => ({
  currentUser: state.user.currentUser,
  isMobile: state.isMobile.boolean,
});

const mapDispatchToProps = (dispatch) => ({
  setLocationDrawerVisible: (visible) =>
    dispatch(setLocationDrawerVisible(visible)),
  setSignInDrawerVisible: (visible) =>
    dispatch(setSignInDrawerVisible(visible)),
  setAccountDrawerVisible: (visible) =>
    dispatch(setAccountDrawerVisible(visible)),
});

export default connect(mapSateToProps, mapDispatchToProps)(TopBar);
