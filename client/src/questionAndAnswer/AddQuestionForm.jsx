import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      body: '',
      email: ''
    };

    this.submitQuestion = this.submitQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
  }

  updateQuestion(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  submitQuestion(e) {
    e.preventDefault();
    return axios.post('/api/qa/questions', {
      name: this.state.name,
      body: this.state.body,
      email: this.state.email,
      product_id: this.props.product
    })
      .then(() => {
        this.setState({
          name: '',
          body: '',
          email: ''
        });
      })
      .then(() => {
        this.props.handleSubmit();
      });
  }

  render() {
    return (
      <AddQuestionForm onSubmit={this.submitQuestion}>
        <label>What is your nickname?:
          <input type="text" required
            name="name"
            maxLength="60"
            placeholder="Example: jackson11!"
            onChange={this.updateQuestion}
          /></label>
        <p>For privacy reasons, do not use your full name or email address</p>
        <br />
        <label>Your email:
          <input
            type="email" required
            name="email"
            maxLength="60"
            placeholder="Enter your email"
            onChange={this.updateQuestion}
          />
        </label>
        <p>For authentication reasons, you will not be emailed</p>
        <br />
        <label>Question:
          <textarea
            type="text" required
            name="body"
            maxLength="1000"
            cols="50"
            rows="4"
            placeholder="Add your question"
            onChange={this.updateQuestion}
          />
        </label>
        <br />
        <input
          type="submit"
          name="Submit"
          value="Submit"
        />
      </AddQuestionForm>
    );
  }
}

const AddQuestionForm = styled.form`
  grid-area: addQuestion;
  grid-row: span 1;
`;

AddQuestion.propTypes = {
  product: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AddQuestion;
