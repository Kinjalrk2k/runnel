import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

import { Typography } from "@material-ui/core";

class StreamShow extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...!</div>;
    }

    const { title, description } = this.props.stream;
    return (
      <>
        <Typography variant="h3" component="h1" style={{ textAlign: "center" }}>
          {title}
        </Typography>
        <Typography variant="body2" component="h1">
          {description}
        </Typography>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
