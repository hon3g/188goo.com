const INIT_STATE = {
  visible: false,
};

const locationDrawerReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'SET_LOCATION_DRAWER_VISIBLE':
      return {
        ...state,
        visible: action.payload,
      };
    default:
      return state;
  }
};

export default locationDrawerReducer;