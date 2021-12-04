const INIT_STATE = {
  visible: false,
};

const signInDrawerReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'SET_SIGNIN_DRAWER_VISIBLE':
      return {
        ...state,
        visible: action.payload,
      };
    default:
      return state;
  }
};

export default signInDrawerReducer;