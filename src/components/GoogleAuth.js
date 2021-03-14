import React from "react";

import { Button, CircularProgress } from "@material-ui/core";
import { Fingerprint, ExitToApp } from "@material-ui/icons";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });

          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return (
        <Button>
          <CircularProgress color="secondary" />
        </Button>
      );
    } else if (this.state.isSignedIn) {
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

export default GoogleAuth;
