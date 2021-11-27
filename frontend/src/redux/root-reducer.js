import { combineReducers } from 'redux';

import argsReducer from './args/args.reducer';

export default combineReducers({
    args: argsReducer,
});
