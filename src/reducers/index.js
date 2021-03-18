import { combineReducers } from "redux";
// import {} from "react-final-form";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer, // particular key `form`
});
