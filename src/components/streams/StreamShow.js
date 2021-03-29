import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

import {
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  Divider,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { VerifiedUser } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

class StreamShow extends React.Component {
  state = { chatText: "", messageList: [] };

  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
    this.chatRef = React.createRef();

    this.socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
    this.socket.on("buildMessage", (messageObj) => {
      // console.log("recieved", messageObj);
      this.pushToChat(messageObj);
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);

    this.buildPlayer();

    this.socket.emit("join-room", id, "123", () => console.log("Connected!"));
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
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

  onChatSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.chatText);
    this.socket.emit("message", {
      msg: this.state.chatText,
      sender: this.props.auth.name,
      senderId: this.props.auth.userId,
    });
    this.setState({ chatText: "" });
  };

  pushToChat(messageObj) {
    this.setState({ messageList: [...this.state.messageList, messageObj] });
  }

  chatList() {
    return this.state.messageList.map((message, index) => {
      if (message.senderId === this.props.stream.userId) {
        return (
          <ListItem key={index} style={{ paddingBottom: 0, paddingTop: 0 }}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: "blue", color: "white" }}>
                {message.sender[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={message.msg}
              secondary={`${message.sender} (Streamer)`}
            />
          </ListItem>
        );
      }
      return (
        <ListItem key={index} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <ListItemAvatar>
            <Avatar>{message.sender[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={message.msg} secondary={message.sender} />
        </ListItem>
      );
    });
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
          <Grid item xs={12} md={4} style={{ flexDirection: "column" }}>
            <Paper style={{ height: "75vh" }}>
              <Typography
                variant="h4"
                component="h1"
                style={{ textAlign: "center", paddingTop: "10px" }}
              >
                Chat
              </Typography>
              <div
                className="chat"
                ref={this.chatRef}
                style={{ flexGrow: 1, overflowY: "scroll", height: "78%" }}
              >
                {this.chatList()}
              </div>
              <Divider />
              <form onSubmit={this.onChatSubmit}>
                <TextField
                  id="standard-basic"
                  label="Type here..."
                  style={{ width: "90%", margin: "15px" }}
                  value={this.state.chatText}
                  onChange={(e) => this.setState({ chatText: e.target.value })}
                  autoComplete="off"
                />
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id], auth: state.auth };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
