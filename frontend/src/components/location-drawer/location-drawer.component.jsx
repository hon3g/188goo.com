import { Drawer } from 'antd';
import Locations from '../locations/locations.component';

import { connect } from 'react-redux';
import { setLocationDrawerVisible } from '../../redux/location-drawer/location-drawer.actions';

import './location-drawer.styles.scss';

function LocationDrawer({ visible, setLocationDrawerVisible }) {
  return (
    <Drawer
      title='切换州区'
      placement='left'
      onClose={() => setLocationDrawerVisible(false)}
      visible={visible}
    >
      <Locations />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Drawer>
  );
}

const mapSateToProps = (state) => ({
  visible: state.locationDrawer.visible,
});

const mapDispatchToProps = (dispatch) => ({
  setLocationDrawerVisible: (visible) =>
    dispatch(setLocationDrawerVisible(visible)),
});

export default connect(mapSateToProps, mapDispatchToProps)(LocationDrawer);
