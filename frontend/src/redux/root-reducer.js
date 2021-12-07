import { combineReducers } from 'redux';

import postDetailModalReducer from './post-detail-modal/post-detail-modal.reducer';
import locationDrawerReducer from './location-drawer/location-drawer.reducer';
import signInDrawerReducer from './signin-drawer/signin-drawer.reducer';
import accountDrawerReducer from './account-drawer/account-drawer.reducer';
import userReducer from './user/user.reducer';
import currentPostReducer from './current-post/current-post.reducer';

export default combineReducers({
    postDetailModal: postDetailModalReducer,
    locationDrawer: locationDrawerReducer,
    signInDrawer: signInDrawerReducer,
    accountDrawer: accountDrawerReducer,
    user: userReducer,
    currentPost: currentPostReducer,
});
