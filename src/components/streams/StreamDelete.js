import React from "react";
import { connect } from "react-redux";
import ConfirmModal from "../ConfirmModal";
import { Button, Grid } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <>
        <Grid container spacing={3} style={{ marginTop: "10px" }}>
          <Grid
            item
            xs={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: red[500] }}
              onClick={() => this.props.deleteStream(id)}
            >
              Yes, Delete
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button variant="contained" onClick={() => history.push("/")}>
              Opps! Cancel
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete the stream titled: ${this.props.stream.title}`;
  }

  render() {
    return (
      <div>
        <ConfirmModal
          header="Delete Stream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/")}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
