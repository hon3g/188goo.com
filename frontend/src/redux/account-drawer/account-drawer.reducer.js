const INIT_STATE = {
  visible: false,
};

const accountDrawerReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'SET_ACCOUNT_DRAWER_VISIBLE':
      return {
        ...state,
        visible: action.payload,
      };
    default:
      return state;
  }
};

export default accountDrawerReducer;