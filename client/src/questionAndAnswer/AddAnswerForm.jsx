import React from 'react';
import axios from 'axios'; // trying to see if I need to import Axios here because it's already imported in parent
import PropTypes from 'prop-types';
import styled from 'styled-components';

class AddAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      body: '',
      email: ''
    };

    this.updateForm = this.updateForm.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  submitAnswer(e) {
    e.preventDefault;
    return axios.post(`/api/qa/questions/${this.props.question.id}/answers`, {
      name: this.state.name,
      body: this.state.body,
      email: this.state.email
    })
      .then((response) => {
        console.log('Submission response', response.status, response.statusText);
      })
      .then(() => { this.props.handleClick(); });
  }

  updateForm(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  render() {
    let showModal = this.props.toggle ? 'block' : 'none';

    return (
      <AnswerModal display={showModal}>
        <AnswerForm>
          <h1>Submit An Answer</h1>
          <h3>Q: {this.props.question.body}</h3>
          <label>What is your nickname?:
            <input
              type="text"
              name="name"
              maxLength="60"
              required
              placeholder="Example: jack543!"
              onChange={this.updateForm}
            />
          </label>
          <p>For privacy reasons, do not use your full name or email</p>
          <br />
          <label>Email:
            <input
              type="email"
              name="email"
              maxLength="60"
              required
              placeholder="Example: jack@email.com"
              onChange={this.updateForm}
            />
          </label>
          <p>For authentication reasons, you will not be emailed</p>
          <br />
          <label>
            Add an Answer:
            <textarea
              type="text"
              name="body"
              maxLength="1000"
              required
              onChange={this.updateForm}
            />
          </label>
          <br />
          <button
            onClick={this.submitAnswer}>Submit</button>
          <button
            onClick={this.props.handleClick}
          >Back</button>
        </AnswerForm>
      </AnswerModal>
    );
  }
}

const AnswerModal = styled.main.attrs(props => ({
  display: props.display || 'none',
}))`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${props => props.display};
`;

const AnswerForm = styled.section`
  position: fixed;
  background: white;
  width: 80%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

AddAnswer.propTypes = {
  question: PropTypes.object.isRequired,
  toggle: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,

};

export default AddAnswer;