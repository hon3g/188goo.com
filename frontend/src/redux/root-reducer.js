import { combineReducers } from 'redux';

import locationDrawerReducer from './location-drawer/location-drawer.reducer';
import signInDrawerReducer from './signin-drawer/signin-drawer.reducer';

export default combineReducers({
    locationDrawer: locationDrawerReducer,
    signInDrawer: signInDrawerReducer,
});
