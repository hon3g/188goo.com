const INIT_STATE = {
  visible: false,
};

const postDetailModalReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'SET_POST_DETAIL_MODAL_VISIBLE':
      return {
        ...state,
        visible: action.payload,
      };
    default:
      return state;
  }
};

export default postDetailModalReducer;