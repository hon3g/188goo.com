import { combineReducers } from 'redux';

import locationDrawerReducer from './location-drawer/location-drawer.reducer';

export default combineReducers({
    locationDrawer: locationDrawerReducer,
});
