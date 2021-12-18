import { combineReducers } from 'redux';

import postFormModalReducer from './post-form-modal/post-form-modal.reducer';
import postDetailModalReducer from './post-detail-modal/post-detail-modal.reducer';
import locationDrawerReducer from './location-drawer/location-drawer.reducer';
import signInDrawerReducer from './signin-drawer/signin-drawer.reducer';
import accountDrawerReducer from './account-drawer/account-drawer.reducer';
import userReducer from './user/user.reducer';
import currentPostReducer from './current-post/current-post.reducer';
import postFormReducer from './post-form/post-form.reducer';
import isMobileReducer from './is-mobile/is-mobile.reducer';

export default combineReducers({
  postDetailModal: postDetailModalReducer,
  locationDrawer: locationDrawerReducer,
  signInDrawer: signInDrawerReducer,
  accountDrawer: accountDrawerReducer,
  user: userReducer,
  currentPost: currentPostReducer,
  postFormModal: postFormModalReducer,
  postForm: postFormReducer,
  isMobile: isMobileReducer,
});
