import React from "react";
import { TextField } from "@material-ui/core";

class RenderInput extends React.Component {
  propsForTextArea() {
    if (this.props.fieldType === "textarea") {
      return {
        multiline: true,
        rows: 4,
        rowsMax: 10,
        variant: "outlined",
      };
    }
  }

  renderError() {
    const { touched, error } = this.props.meta;
    if (touched && error) {
      return {
        helperText: error,
        error: true,
      };
    }
  }

  render() {
    return (
      <TextField
        variant="filled"
        {...this.propsForTextArea()}
        fullWidth
        margin="normal"
        label={this.props.label}
        {...this.props.input}
        {...this.renderError()}
      />
    );
  }
}

export default RenderInput;
