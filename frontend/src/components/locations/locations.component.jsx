import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import { REGIONED_STATES, REGIONS } from './regioned-states';

import { connect } from 'react-redux';
import { setLocationDrawerVisible } from '../../redux/location-drawer/location-drawer.actions';

import './locations.styles.scss';

function Locations({ setLocationDrawerVisible, isMobile }) {
  const stateNameClass = !isMobile ? 'state-name' : 'm-state-name';

  return (
    <div>
      <Link
        to='/全美'
        onClick={() => setLocationDrawerVisible(false)}
        className={stateNameClass}
      >
        全美
      </Link>
      {REGIONED_STATES.map((region, i) => {
        return (
          <div key={`${region}-container`}>
            <Divider
              orientation='left'
              key={region}
              style={{ color: '#a1a1a1' }}
            >
              {REGIONS[i]}
            </Divider>
            <div
              key={`${region}-grid-container`}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
              }}
            >
              {region.map((state) => (
                <Link
                  to={`/${state}`}
                  className={stateNameClass}
                  key={state}
                  onClick={() => setLocationDrawerVisible(false)}
                >
                  {state}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const mapSateToProps = (state) => ({
  isMobile: state.isMobile.boolean,
});

const mapDispatchToProps = (dispatch) => ({
  setLocationDrawerVisible: (visible) =>
    dispatch(setLocationDrawerVisible(visible)),
});

export default connect(mapSateToProps, mapDispatchToProps)(Locations);
