import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Answer from './Answer';
import AddAnswer from './AddAnswerForm';
import { Helpful, HelpfulYes, Tile } from '../globalStyles.js';


class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHelpful: false,
      isReported: false,
      isAddAnswerVisible: false,
    };

    this.handleHelpful = this.handleHelpful.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.toggleAddAnswer = this.toggleAddAnswer.bind(this);
  }
  // get question helpfulness
  // set the helpfulness based on component did mount
  // if the state updates then query the server to get the question helpfulness
  // send message to API to mark question as helpful

  handleHelpful() {
    var currentQuestion = this.props.question.question_id;
    if (!this.state.isHelpful) {
      this.props.markOrReport('questions', currentQuestion, 'helpful');
      this.setState({ isHelpful: true });
    } else {
      alert('You already marked this question as helpful!');
    }
  }

  handleReport() {
    var currentQuestion = this.props.question.question_id;
    if (!this.state.isReported) {
      this.props.markOrReport('questions', currentQuestion, 'report');
      this.setState({ isReported: true });
    } else {
      alert('You already reported this question!');
    }
  }

  toggleAddAnswer() {
    this.setState({ isAddAnswerVisible: !this.state.isAddAnswerVisible });
  }

  render() {
    // Incase this prop is empty render nothing onscreen
    // Create aliases
    let question = !this.props.question ? '' : this.props.question;
    let answers = Object.values(question.answers).sort((a, b) => { return b.helpfulness - a.helpfulness; });
    // if there are no answers return an empty array, else return max 2 answers
    if (!answers.length) {
      answers = [];
    } else if (answers.length > 2 && this.props.getMoreAnswers === false) {
      answers = answers.slice(0, 2);
    }

    // render a question
    return (
      <QuestionWrapper>
        <QuestionSummary>Q: {question.question_body}</QuestionSummary>
        <QuestionLinks>
          <HelpfulYes
            onClick={this.handleReport}>
            {!this.state.isReported ? 'Report' : 'Reported!'}
          </HelpfulYes> | <Helpful>Helpful?</Helpful> <HelpfulYes onClick={this.handleHelpful}>Yes({question.question_helpfulness})</HelpfulYes> | <HelpfulYes onClick={this.toggleAddAnswer}>Add Answer</HelpfulYes></QuestionLinks>
        {answers.map((answer) => (<Answer markOrReport={this.props.markOrReport} answer={answer} key={answer.id} />) )}
        <AddAnswer
          toggle={this.state.isAddAnswerVisible}
          handleClick={this.toggleAddAnswer}
          question={ {body: question.question_body, id: question.question_id} }
          product={this.props.product} />
      </QuestionWrapper>
    );
  }
}
//Moving AddAnswerForm to maintenance

// each question should be an object
Question.propTypes = {
  question: PropTypes.object,
  getMoreAnswers: PropTypes.bool.isRequired,
  markOrReport: PropTypes.func.isRequired,
  product: PropTypes.object
};

// style the components
const QuestionWrapper = styled(Tile)`
  grid-area: styled-question;
  grid-row: span 1;
  display: inline-grid;
  grid-template-columns: 70% 30%;
  grid-template-rows: auto;
  grid-auto-columns: 100%;
  grid-auto-flow: column;
  grid-template-areas:
    "question links"
    "answer-wrapper ."
    "addAnswer .";

  margin-top: 0.44rem;
  margin-bottom: 0.75rem;
  padding: 7px 12px 7px 0;
`;

const QuestionSummary = styled.span`
  grid-area: question;
  font-size: 1.05em;
  font-weight: bold;
  margin-top: -5px;
  margin-bottom: -7px;
`;

const QuestionLinks = styled.span`
  grid-area: links;
  justify-self: end;
`;

// first row is two columns
// second row is one column
// third row is one column
// deleted my branch on accident

export default Question;
