import React from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../actions";

import { Button, CircularProgress } from "@material-ui/core";
import { Fingerprint, ExitToApp } from "@material-ui/icons";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get()); // initializing here
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    const userId = this.auth.currentUser.get().getId();
    if (isSignedIn) {
      const name = this.auth.currentUser.get().getBasicProfile().getName();
      this.props.signIn(userId, name);
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return (
        <Button>
          <CircularProgress color="secondary" />
        </Button>
      );
    } else if (this.props.isSignedIn) {
      return (
        <Button
          variant="contained"
          onClick={this.onSignOutClick}
          color="secondary"
        >
          <ExitToApp style={{ marginRight: "10px" }} />
          Sign Out
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          onClick={this.onSignInClick}
          color="secondary"
        >
          <Fingerprint style={{ marginRight: "10px" }} />
          Sign In with Google
        </Button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
