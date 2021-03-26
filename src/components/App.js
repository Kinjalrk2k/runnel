import React from "react";
import { Route, Router } from "react-router-dom";
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
        <Container maxWidth="md" style={{ paddingTop: 20 }}>
          <Route path="/" exact component={StreamList}></Route>
          <Route path="/streams/new" exact component={StreamCreate}></Route>
          <Route path="/streams/edit" exact component={StreamEdit}></Route>
          <Route path="/streams/delete" exact component={StreamDelete}></Route>
          <Route path="/streams/show" exact component={StreamShow}></Route>
        </Container>
      </Router>
    </div>
  );
};

export default App;
