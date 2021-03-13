import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

import App from "./components/App";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: deepPurple,
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector("#root")
);
