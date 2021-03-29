import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";

import { Link } from "react-router-dom";

import {
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  CardActionArea,
  Container,
} from "@material-ui/core";

import { blue, red } from "@material-ui/core/colors";

import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

class StreamList extends React.Component {
  state = {
    snackBarOpen: false,
  };

  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <Grid
          container
          spacing={2}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Grid item>
            <Button
              variant="contained"
              style={{ backgroundColor: blue[500] }}
              startIcon={<EditIcon />}
              component={Link}
              to={`/streams/edit/${stream._id}`}
            >
              Edit
            </Button>
            {/* <IconButton aria-label="Edit">
              <EditIcon style={{ color: blue[500] }} />
            </IconButton> */}
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              style={{ backgroundColor: red[500] }}
              startIcon={<DeleteIcon />}
              component={Link}
              to={`/streams/delete/${stream._id}`}
            >
              Delete
            </Button>
            {/* <IconButton aria-label="Delete">
              <DeleteIcon style={{ color: red[500] }} />
            </IconButton> */}
          </Grid>
        </Grid>
      );
    }
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <ListItem key={stream._id}>
          <Card style={{ width: "100%" }}>
            <CardActionArea>
              <CardContent>
                <Grid
                  container
                  spacing={2}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Grid item style={{ display: "flex", alignItems: "center" }}>
                    <OndemandVideoIcon style={{ fontSize: "xxx-large" }} />
                  </Grid>
                  <Grid
                    item
                    style={{ flexGrow: 1 }}
                    component={Link}
                    to={`/streams/${stream._id}`}
                  >
                    <Typography variant="h5" component="h2">
                      {stream.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                    >
                      {stream.description}
                    </Typography>
                  </Grid>
                  <Grid item>{this.renderAdmin(stream)}</Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </ListItem>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <Button
          variant="outlined"
          component={Link}
          to="/streams/new"
          startIcon={<AddIcon />}
        >
          New Stream
        </Button>
      );
    }
  }

  handleSnackBarClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackBarOpen: false });
  }

  render() {
    return (
      <Container
        className="theContainer"
        maxWidth="md"
        style={{ paddingTop: 20 }}
      >
        <div>
          <Grid container style={{ alignItems: "center" }}>
            <Grid item style={{ flexGrow: 1 }}>
              <Typography
                variant="h3"
                component="h1"
                style={{ textAlign: "center" }}
              >
                Streams
              </Typography>
            </Grid>
            <Grid item>{this.renderCreate()}</Grid>
          </Grid>
          <List>{this.renderList()}</List>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
