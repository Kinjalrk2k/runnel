import React from "react";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <>
        <Typography variant="h3" component="h1" style={{ textAlign: "center" }}>
          Create a New Stream
        </Typography>
        <StreamForm onSubmit={this.onSubmit} />
      </>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);
