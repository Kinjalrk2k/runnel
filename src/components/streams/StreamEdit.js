import _ from "lodash";
import React from "react";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    console.log(formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <Typography variant="h3" component="h1" style={{ textAlign: "center" }}>
          Edit your Stream
        </Typography>
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(this.props.stream, "title", "description")}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
