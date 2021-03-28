import React from "react";
import ReactDOM from "react-dom";
import { Modal, Paper, Typography, Divider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

class ConfirmModal extends React.Component {
  state = {
    open: true,
  };

  render() {
    return ReactDOM.createPortal(
      <Modal
        open={this.state.open}
        onClose={this.props.onDismiss}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper elevation={3} style={{ width: "550px", padding: "20px" }}>
          <Typography variant="h4" component="h2">
            {this.props.header}
          </Typography>
          <Divider />
          <Typography
            variant="subtitle1"
            gutterBottom
            style={{ color: grey[500], marginTop: "10px" }}
          >
            {this.props.content}
          </Typography>
          {this.props.actions}
        </Paper>
      </Modal>,
      document.querySelector("#modal")
    );
  }
}

export default ConfirmModal;
