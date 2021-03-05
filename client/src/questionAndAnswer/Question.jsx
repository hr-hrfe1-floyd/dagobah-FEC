import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Answer from './Answer';
import AddAnswer from './AddAnswerForm';
import { Helpful, HelpfulYes } from '../globalStyles.js';


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
    if (this.props.question === undefined) {
      return '';
    }
    // Create aliases
    let question = this.props.question;
    let answers = Object.values(question.answers).sort((a, b) => { return b.helpfulness - a.helpfulness; });
    // if there are no answers return an empty array, else return max 2 answers
    if (!answers.length) {
      answers = [];
    } else if (answers.length > 2 && this.props.getMoreAnswers === false) {
      answers = answers.slice(0, 2);
    }

    // render a question
    return (
      <StyledQuestion>
        <QuestionBody><strong>Q: {question.question_body}</strong></QuestionBody>
        <QuestionLinks>
          <HelpfulYes
            onClick={this.handleReport}>
            {!this.state.isReported ? 'Report' : 'Reported!'}
          </HelpfulYes> | <Helpful>Helpful?</Helpful> <HelpfulYes onClick={this.handleHelpful}>Yes({question.question_helpfulness})</HelpfulYes> | <HelpfulYes onClick={this.toggleAddAnswer}>Add Answer</HelpfulYes></QuestionLinks>
        {answers.map((answer) => (<Answer markOrReport={this.props.markOrReport} answer={answer} key={answer.id} />) )}
        <AddAnswer toggle={this.state.isAddAnswerVisible} handleClick={this.toggleAddAnswer} question={ {body: question.question_body, id: question.question_id} } />
      </StyledQuestion>
    );
  }
}
//Moving AddAnswerForm to maintenance

// each question should be an object
Question.propTypes = {
  question: PropTypes.object.isRequired,
  getMoreAnswers: PropTypes.bool.isRequired,
  markOrReport: PropTypes.func.isRequired,
};

// style the components
const StyledQuestion = styled.div`
  grid-area: styledQuestion;
  grid-row: span 1;
  display: inline-grid;
  grid-template-columns: 70% 30%;
  grid-template-rows: auto;
  grid-auto-columns: 100%;
  grid-auto-flow: column;
  grid-template-areas:
    "question links"
    "answerContainer ."
    "addAnswer .";
`;

const QuestionBody = styled.div`
  grid-area: question;
`;

const QuestionLinks = styled.div`
  grid-area: links;
  justify-self: end;
`;

// first row is two columns
// second row is one column
// third row is one column
// deleted my branch on accident

export default Question;
