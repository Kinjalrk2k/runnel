import React from "react";
import { Field, reduxForm } from "redux-form";
import { Container, Button } from "@material-ui/core";
import RenderInput from "./RenderInput";

class StreamForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
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

export default reduxForm({
  // config here!
  form: "streamForm", // name of the form
  validate,
})(StreamForm);
// reduxForm() is similar to connect()
