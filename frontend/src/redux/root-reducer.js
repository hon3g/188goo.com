import { combineReducers } from 'redux';

import locationDrawerReducer from './location-drawer/location-drawer.reducer';
import signInDrawerReducer from './signin-drawer/signin-drawer.reducer';
import accountDrawerReducer from './account-drawer/account-drawer.reducer';
import userReducer from './user/user.reducer';

export default combineReducers({
    locationDrawer: locationDrawerReducer,
    signInDrawer: signInDrawerReducer,
    accountDrawer: accountDrawerReducer,
    user: userReducer,
});
