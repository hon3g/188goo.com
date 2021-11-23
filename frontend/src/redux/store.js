import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [process.env.NODE_ENV === 'development' && logger].filter(
  Boolean
);

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
