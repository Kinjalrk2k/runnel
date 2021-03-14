import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import GoogleAuth from "./GoogleAuth";

import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

class Header extends React.Component {
  renderNameButton() {
    if (this.props.name !== null) {
      return (
        <Button color="inherit" style={{ marginRight: "20px" }}>
          {this.props.name}
        </Button>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link to="/">VidFeed</Link>
          </Typography>
          <Button color="inherit" style={{ marginRight: "20px" }}>
            All Streams
          </Button>
          {this.renderNameButton()}
          <GoogleAuth />
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => {
  return { name: state.auth.name };
};

export default connect(mapStateToProps)(Header);
