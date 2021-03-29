import React from "react";
import { Typography, Container } from "@material-ui/core";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <Container
        className="theContainer"
        maxWidth="md"
        style={{ paddingTop: 20 }}
      >
        <Typography variant="h3" component="h1" style={{ textAlign: "center" }}>
          Create a New Stream
        </Typography>
        <StreamForm onSubmit={this.onSubmit} />
      </Container>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);
