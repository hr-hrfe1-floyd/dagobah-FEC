import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Question from './Question';
import SearchQuestion from './SearchQuestion';
import AddQuestion from './AddQuestionForm';
import { Button } from '../globalStyles.js';

class QuestionAndAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      searchTerm: '',
      getMoreQuestions: false,
      getMoreAnswers: false,
      isAddQuestionVisible: false,
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.searchQuestions = this.searchQuestions.bind(this);
    this.getMoreAnswers = this.getMoreAnswers.bind(this);
    this.getMoreQuestions = this.getMoreQuestions.bind(this);
    this.markOrReport = this.markOrReport.bind(this);
    this.toggleAddQuestion = this.toggleAddQuestion.bind(this);
  }

  getQuestions(page, count) {
    if (this.props.product_id) {
      return axios.get('/api/qa/questions', {
        params: {
          product_id: this.props.product_id,
          page: page,
          count: count
        }
      })
        .then(({ data }) => {
          // sort the questions by question_helpfulness
          data.results.sort((a, b) => {
            return b.question_helpfulness - a.question_helpfulness;
          });
          this.setState({
            questions: data.results
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return '';
    }
  }

  componentDidMount() {
    this.getQuestions(1, 4);
  }

  componentDidUpdate(prevProps) {
    if (this.props.product_id !== prevProps.product_id) {
      this.getQuestions(1, 4);
    }
  }

  // type in a term and update the state
  searchQuestions(e) {
    this.setState({
      searchTerm: e.target.value
    });
    var results = [];
    // if the searchterm is longer than 3 begin searching questions
    if (this.state.searchTerm.length > 2) {
      // get more questions from the server
      this.getQuestions(1, 999)
        .then(() => {
          // for each question if the question_body contains the search letters
          for (let q = 0; q < this.state.questions.length; q++) {
            let currentQuestion = this.state.questions[q];
            if (currentQuestion.question_body.includes(this.state.searchTerm)) {
              results.push(currentQuestion);
            }
          }
        })
        .then(() => {
        // update questions state to only show search results
          this.setState({
            questions: results,
            getMoreQuestions: true,
          });
        });
      // if there are no characters then reset the search
    } else if (this.state.searchTerm.length < 2) {
      this.getQuestions(1, 4)
        .then(() => {
          this.setState({
            getMoreQuestions: false
          });
        });
    }
  }

  getMoreQuestions() {
    this.setState({
      getMoreQuestions: !this.state.getMoreQuestions
    });
    this.getQuestions(1, 999);


  }
  // if the user wants to load more answers click on the button and update the state
  getMoreAnswers() {
    this.setState({
      getMoreAnswers: !this.state.getMoreAnswers
    });
    this.getQuestions(1, 999);
  }

  markOrReport(endpoint, id, handler) {
    // set question helpfulness
    return axios.put(`/api/qa/${endpoint}/${id}/${handler}`)
      .then(() => {
        // send message to API to mark question as helpful, then rerender the state
        // Only query as many questions as we already have and no more
        this.getQuestions(1, this.state.questions.length);
      })
      .catch((err) => {
        console.error('error when marking question as helpful', err);
      });
  }

  toggleAddQuestion() {
    this.setState({ isAddQuestionVisible: !this.state.isAddQuestionVisible });
    this.getQuestions(1, this.state.questions.length);
  }

  render() {
    var questions = this.state.questions ? this.state.questions.slice(0, 4) : null;

    if (this.state.getMoreQuestions && this.state.questions.length > 4) {
      questions.concat(this.state.questions.slice(4, 2));
    } else if (this.state.questions.length === questions.length) {
      questions = this.state.questions.slice(0, 4);
    }



    // render our module
    return (
      <QuestionContainer>
        <QuestionHeader>Questions & Answers</QuestionHeader>
        <SearchQuestion
          onChange={this.searchQuestions}
          value={this.state.searchTerm}/>
        <QuestionList
          loadAnswers={this.state.getMoreAnswers}
          loadQuestions={this.state.getMoreQuestions}>
          {this.state.questions ? questions.map((question) => (<Question
            key={question.question_id}
            markOrReport={this.markOrReport}
            getMoreAnswers={this.state.getMoreAnswers}
            question={question}
            product={this.props.product} />)) : null}
        </QuestionList>
        <MoreAnswers><a
          onClick={this.getMoreAnswers}>{this.state.getMoreAnswers ? 'Collapse Answers' : 'See More Answers'}</a></MoreAnswers>
        <MoreInfo>
          <Button onClick={this.getMoreQuestions}>More Answered Questions</Button>
          <Button onClick={this.toggleAddQuestion}>Add A Question</Button>
        </MoreInfo>
        <AddQuestion
          product={this.props.product}
          handleClick={this.toggleAddQuestion}
          toggle={this.state.isAddQuestionVisible}
        />
      </QuestionContainer>
    );
  }
}

// style the question module
const QuestionContainer = styled.main`
  display: grid;
  grid-template-columns: 66%
  grid-template-rows: auto;
  grid-auto-columns: 100%;
  grid-auto-flow: column;
  grid-template-areas:
    "question-header"
    "search-question"
    "question-list"
    "styledLoadAnswers"
    "styledButtons"
    "addQuestion";
`;

const QuestionHeader = styled.h3`
  grid-area: question-header;
  grid-row: span 1;
`;

const QuestionList = styled.section`
  grid-area: question-list;
  display: inline-grid;
  grid-row: span 1;
  overflow: auto;
  height: ${props => props.loadAnswers ? '50%' : 'auto'};
  grid-template-areas:
    "styled-question";


`;

const MoreAnswers = styled.div`
  grid-area: styledLoadAnswers;
  grid-row: span 1;
`;

const MoreInfo = styled.section`
  grid-area: styledButtons;
  grid-row: span 1;
`;

// const Button = styled.button`
//   text-transform: uppercase;
//   padding: 15px;
//   margin-top: 10px;
//   margin-right: 10px;
//   color: ${Palette.black};
//   background-color: ${Palette.background};
//   border: 2px solid ${Palette.secondary};
//   border-radius: 5px;

//   &:hover {
//     border: 2px solid ${Palette.primary};
//   }
// `;

// the product id should be a number
QuestionAndAnswer.propTypes = {
  product_id: PropTypes.number,
  product: PropTypes.object
};
// deleted my branch on accident
export default QuestionAndAnswer;
