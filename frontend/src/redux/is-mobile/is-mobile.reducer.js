const INIT_STATE = {
  boolean: undefined,
};

const isMobileReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'SET_IS_MOBILE':
      return {
        ...state,
        boolean: action.payload,
      };
    default:
      return state;
  }
};

export default isMobileReducer;