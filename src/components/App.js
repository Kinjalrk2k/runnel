import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "../history";
import { Container } from "@material-ui/core";

import "./App.css";

import Header from "./Header";

import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Header />

        <Switch>
          <Route path="/" exact component={StreamList}></Route>
          <Route path="/streams/new" exact component={StreamCreate}></Route>
          <Route path="/streams/edit/:id" exact component={StreamEdit}></Route>
          <Route
            path="/streams/delete/:id"
            exact
            component={StreamDelete}
          ></Route>
          <Route path="/streams/:id" exact component={StreamShow}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
