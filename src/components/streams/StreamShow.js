import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

import { Typography, Container, Grid, Paper } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
    // this.socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
    // this.socket.on("buildMessage", (messageObj) => {
    //   console.log("recieved", messageObj);
    // });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);

    // this.buildPlayer();

    // this.socket.emit("join-room", id, "123", () => console.log("Connected!"));
  }

  componentDidUpdate() {
    // this.buildPlayer();
  }

  componentWillUnmount() {
    // this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params;

    try {
      this.player = flv.createPlayer({
        type: "flv",
        url: `http://localhost:8000/live/${id}.flv`,
      });
      this.player.attachMediaElement(this.videoRef.current);
      this.player.load();
    } catch (err) {
      console.log("Catch block", err);
    }
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...!</div>;
    }

    const { title, description } = this.props.stream;
    return (
      <Container
        className="theContainer"
        maxWidth="xl"
        style={{ paddingTop: 20 }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <video ref={this.videoRef} style={{ width: "100%" }} controls />
            <Typography variant="h4" component="h1">
              {title}
            </Typography>
            <Typography
              variant="body2"
              component="h1"
              style={{ color: grey[500] }}
            >
              {description}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ height: "75vh" }}>
              <Typography
                variant="h4"
                component="h1"
                style={{ textAlign: "center", paddingTop: "10px" }}
              >
                Chat
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
