import React from "react";
import { Field, reduxForm } from "redux-form";
import { Container, Button } from "@material-ui/core";
import RenderInput from "./RenderInput";
import { connect } from "react-redux";
import { createStream } from "../../actions";

class StreamCreate extends React.Component {
  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.createStream(formValues);
  };

  render() {
    return (
      <Container maxWidth="md">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            component={RenderInput}
            name="title"
            label="Title"
            fieldType="input"
          />
          <Field
            component={RenderInput}
            name="description"
            label="Description"
            fieldType="textarea"
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Container>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "Your stream must have a title!";
  }

  if (!formValues.description) {
    errors.description = "Your stream must have a brief description!";
  }

  return errors;
};

const formWrapped = reduxForm({
  // config here!
  form: "streamCreate", // name of the form
  validate,
})(StreamCreate);
// reduxForm() is similar to connect()

export default connect(null, { createStream })(formWrapped);
