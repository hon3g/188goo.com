import { createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';

import rootReducer from './root-reducer';

// Only use logger in development
// const middlewares = [process.env.NODE_ENV === 'development' && logger].filter(
//   Boolean
// );

const middlewares = [];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
