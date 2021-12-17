import { Drawer } from 'antd';
import Locations from '../locations/locations.component';

import { connect } from 'react-redux';
import { setLocationDrawerVisible } from '../../redux/location-drawer/location-drawer.actions';



function LocationDrawer({ visible, setLocationDrawerVisible }) {
  return (
    <Drawer
      title='切换州区'
      placement='left'
      width={375}
      onClose={() => setLocationDrawerVisible(false)}
      visible={visible}
    >
      <Locations />
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
