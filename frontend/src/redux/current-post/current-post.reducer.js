const INITIAL_STATE = {
  post: {},
};

const currentPostReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_POST':
      return {
        ...state,
        post: action.payload,
      };

    default:
      return state;
  }
};

export default currentPostReducer;
