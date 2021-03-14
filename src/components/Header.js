import React from "react";
import { Link } from "react-router-dom";

import GoogleAuth from "./GoogleAuth";

import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          style={{ flexGrow: 1 }}
          component={Link}
          to="/"
        >
          VidFeed
        </Typography>
        <Button color="inherit">All Streams</Button>
        <GoogleAuth />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
