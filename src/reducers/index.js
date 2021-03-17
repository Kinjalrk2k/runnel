import { combineReducers } from "redux";
// import {} from "react-final-form";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  from: formReducer, // particular key `form`
});
