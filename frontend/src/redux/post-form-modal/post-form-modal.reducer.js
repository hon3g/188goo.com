const INIT_STATE = {
  visible: false,
};

const postFormModalReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'SET_POST_FORM_MODAL_VISIBLE':
      return {
        ...state,
        visible: action.payload,
      };
    default:
      return state;
  }
};

export default postFormModalReducer;