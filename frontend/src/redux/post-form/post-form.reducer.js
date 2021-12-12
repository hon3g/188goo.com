import { PostFormActionTypes } from './post-form.types';

const INITIAL_STATE = {
  phoneNumber: null,
  state: null,
  city: null,
  category: null,
  title: null,
  description: null,
  images: [],
};

const postFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PostFormActionTypes.SET_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.payload,
      };
    case PostFormActionTypes.SET_STATE:
      return {
        ...state,
        state: action.payload,
      };
    case PostFormActionTypes.SET_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case PostFormActionTypes.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case PostFormActionTypes.SET_IMAGES:
      return {
        ...state,
        images: action.payload,
      };
    default:
      return state;
  }
};

export default postFormReducer;
