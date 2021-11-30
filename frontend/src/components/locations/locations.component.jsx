import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import { REGIONED_STATES, REGIONS } from './regioned-states';

import './locations.styles.scss';
import 'antd/dist/antd.css';

function Locations({ setLocationDrawerVisible }) {
  return (
    <div>
      <Link
        to='/全美'
        onClick={() => setLocationDrawerVisible(false)}
        className='state-name'
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
                  className='state-name'
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

export default Locations;
