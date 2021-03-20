import { combineReducers } from "redux";
// import {} from "react-final-form";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer, // particular key `form`
  streams: streamReducer,
});
