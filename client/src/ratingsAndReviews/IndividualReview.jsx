import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Tile, Italic, LowPriorityText, ClickableText, Signature, Helpful, HelpfulYes } from '../globalStyles.js';
import StarRow from '../starRow.jsx';
import ModalImage from '../ModalImage.jsx';

class IndividualReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulRated: false,
    };
  }

  helpfulVote() {
    if (this.state.helpfulRated === false) { this.props.review.helpfulness++; }
    this.setState({helpfulRated: true});
  }

  render() {
    let review = this.props.review;
    // review.summary = 'It was the best of shreks, it was the worst of shreks, it was the age of shrekdom, it was the age of shrekishness, it was the epoch of shreklief, it was the epoch of inshrekulity'; //long summary test
    let summary = review.summary;
    if (summary.length > 60) {
      let cutoff = 60;
      for (let i = 55; i < review.summary.length; i++) {
        if (review.summary[i] === ' ') {
          cutoff = i;
          break;
        }
      }
      summary = <Summary><b>{review.summary.slice(0, cutoff)}...</b><br></br><SummaryExtra>...{review.summary.slice(cutoff, review.summary.length)}</SummaryExtra></Summary>;
    } else {
      summary = <Summary><b>{review.summary}</b></Summary>;
    }

    let body = null;
    // review.body = 'It was the best of shreks, it was the worst of shreks, it was the age of shrekdom, it was the age of shrekishness, it was the epoch of shreklief, it was the epoch of inshrekulity, it was the shrekson of light, it was the shrekson of darkness, it was  the swamp of hope, it was the farquaad of shrekspair.'; //long summary test

    let bodyId = 'review' + review.review_id;
    let bodyShowId = bodyId + 'vis';
    if (review.body.length <= 250) {
      body = <p>{review.body}</p>;
    } else {
      body = <ReviewBody>
        <span id={bodyId}>{review.body.slice(0, 251)}
          <ShowMore id={bodyShowId} onClick={ ()=> { document.getElementById(bodyId).innerHTML = review.body; }} >Show More...</ShowMore>
        </span>
      </ReviewBody>;
    }

    let response = null;
    // review.response = 'It was the best of shreks, it was the worst of shreks, it was the age of shrekdom, it was the age of shrekishness, it was the epoch of shreklief, it was the epoch of inshrekulity, it was the shrekson of light, it was the shrekson of darkness, it was  the swamp of hope, it was the farquaad of shrekspair.';
    if (review.response) {
      response = <Response><span><Seller>Seller: </Seller>{review.response}</span></Response>;
    }

    let recommend = null;
    if (review.recommend) {
      recommend = <Recommend><RedCheck>&#10003;</RedCheck><RecText>I recommend this product</RecText></Recommend>;
    }

    return (
      <Review>
        <ReviewerInfo>
          <Signature>@{review.reviewer_name}</Signature>
          <br></br>
          <ReviewDate>{new Date(review.date).toLocaleString('en-US', {month: 'long', day: '2-digit', year: 'numeric'})}</ReviewDate>
          <br></br>
          {recommend}
        </ReviewerInfo>
        <StarRow size={20} rating={review.rating * 20} />
        {summary}
        <div>{body}</div>
        <Gallery>
          {review.photos.map((photo) => {
            return (
              <ModalImage key={photo.url} src={photo.url} onClick={() => { console.log('open me in a modal window!'); }} />
            );
          })}
          <div className="axis main-axis"></div>
          <div className="axis cross-axis"></div>
        </Gallery>
        {response}
        <br></br>
        <Helpful>Helpful? <HelpfulYes onClick={() => { this.helpfulVote(); }}>Yes</HelpfulYes> ({review.helpfulness})</Helpful>
        <p>{JSON.stringify(this.props.review)}</p>
      </Review>
    );
  }
}

const Review = styled(Tile)`
  margin-top: 0.7rem;
  padding-left: 1.2rem;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid #f0f0f5;
`;

const Summary = styled(Italic)`
  font-size: 1.05em;
  margin-top: -0.3rem;
  margin-bottom: -0.3rem;
`;

const SummaryExtra = styled(Italic)`
  font-size: 0.75em;
  color: grey;
  margin-top: --0.5rem;
`;

const ReviewerInfo = styled.div`
  display: inline-block;
  float: right;
  margin: 0.5rem 5% 0.5rem 5%;
  width: 17.5rem;
`;

const ReviewDate = styled(LowPriorityText)`
  margin-top: -50px;
  margin-left: 12%;
`;

const Recommend = styled.div`
  margin-top: -0.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-basis: 100%;
`;

const RedCheck = styled.div`
  color: hsl(0, 100%, 60%);
  font-size: 1.2em;
`;

const RecText = styled.span`
  font-size: 0.9em;
  padding-left: 0.2rem;
`;

const ReviewBody = styled.span`
  display: inline-block;
  margin-bottom: 1rem;
  margin-right: 20%;
`;

const ShowMore = styled(ClickableText)`
  margin-left: 5px;
`;

const Gallery = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
`;

const Seller = styled.b`
  font-style: italic;
`;

const Response = styled.div`
  display: block;
  background-color: hsl(270, 80%, 96%);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-left: 3%;
  width: 70%;
`;

IndividualReview.propTypes = {
  review: PropTypes.object
};

export default IndividualReview;
