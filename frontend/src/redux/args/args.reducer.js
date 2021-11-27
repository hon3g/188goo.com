import { ArgsActionTypes } from './args.types';

const INIT_STATE = {
  id: null,
  region: null,
  state: null,
  city: null,
  type: null,
  category: null,
  slug: null,
  page: null,
};

const argsReducer = (objState = INIT_STATE, action) => {
  switch (action.type) {
    case ArgsActionTypes.SET_ID:
      return {
        ...objState,
        id: action.payload,
      };
    case ArgsActionTypes.SET_REGION:
      return {
        ...objState,
        region: action.payload,
      };
    case ArgsActionTypes.SET_STATE:
      return {
        ...objState,
        state: action.payload,
      };
    case ArgsActionTypes.SET_CITY:
      return {
        ...objState,
        city: action.payload,
      };
    case ArgsActionTypes.SET_TYPE:
      return {
        ...objState,
        type: action.payload,
      };
    case ArgsActionTypes.SET_CATEGORY:
      return {
        ...objState,
        category: action.payload,
      };
    case ArgsActionTypes.SET_SLUG:
      return {
        ...objState,
        SLUG: action.payload,
      };
    case ArgsActionTypes.SET_PAGE:
      return {
        ...objState,
        page: action.payload,
      };
    default:
      return objState;
  }
};

export default argsReducer;
