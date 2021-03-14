import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

import App from "./components/App";
import reducers from "./reducers";

const store = createStore(reducers);

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: deepPurple,
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.querySelector("#root")
);
