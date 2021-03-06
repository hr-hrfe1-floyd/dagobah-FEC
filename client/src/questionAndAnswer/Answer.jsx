import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ModalImage from '../ModalImage.jsx';
import { Gallery, Helpful, HelpfulYes } from '../globalStyles.js';

class Answer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHelpful: false,
      isReported: false,
    };

    this.handleHelpful = this.handleHelpful.bind(this);
    this.handleReport = this.handleReport.bind(this);
  }

  handleHelpful() {
    var currentAnswer = this.props.answer.id;
    if (!this.state.isHelpful) {
      this.props.markOrReport('answers', currentAnswer, 'helpful');
      this.setState({
        isHelpful: true
      });
    } else {
      alert('You already marked this Answer as helpful');
    }
  }

  handleReport() {
    var currentAnswer = this.props.answer.id;
    if (!this.state.isReported) {
      this.props.markOrReport('answers', currentAnswer, 'report');
      this.setState({
        isReported: true
      });
    } else {
      alert('You already reported this Answer');
    }
  }

  render() {

    if (!this.props.answer) {
      return '';
    }

    let answer = this.props.answer;
    // Options needed to pretty-print the date
    let options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    // pretty print the date
    let prettyDate = new Date(answer.date).toLocaleDateString('en-US', options);

    return (
      <AnswerWrapper>
        <AnswerSummary><strong>A:</strong> {answer.body}</AnswerSummary>
        <Gallery>
          {answer.photos.length !== 0 ? answer.photos.map((photo) => {
            return (
              <ModalImage src={photo} key={photo} onClick={() => console.log('Info', photo)} />
            );
          }) : null}
        </Gallery>
        <AnswerLinks>by {answer.answerer_name}, <time>{prettyDate}</time> | <Helpful>Helpful? </Helpful> <HelpfulYes onClick={this.handleHelpful}>Yes ({answer.helpfulness})</HelpfulYes> | <HelpfulYes onClick={this.handleReport}>{!this.state.isReported ? 'Report' : 'Reported!'}</HelpfulYes></AnswerLinks>
      </AnswerWrapper>
    );
  }
}

// each answer should be an object

const AnswerWrapper = styled.div`
  grid-area: answer-wrapper;
  grid-row: span 1;
  margin-top: 7px;
  margin-left: 5px;
`;

const AnswerSummary = styled.span`
  font-size: 1.05em;
  margin-top: -5px;
  margin-bottom: -7px;
`;

const AnswerLinks = styled.span`
  font-size: .8em;
`;

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
  markOrReport: PropTypes.func.isRequired,
};
// accidentally deleted my branch
export default Answer;
