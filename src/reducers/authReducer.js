import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  name: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      const { userId, name } = action.payload;
      return { ...state, isSignedIn: true, userId, name };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null, name: null };
    default:
      return state;
  }
};

export default authReducer;
