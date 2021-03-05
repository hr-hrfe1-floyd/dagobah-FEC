import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import StarRow from '../starRow.jsx';
import RatingBar from './RatingBar.jsx';
import RatingFilters from './RatingFilters.jsx';

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avg: 0,
      recAvg: 0,
      breakdown: [],
    };
  }
  componentDidMount() {
    this.reviewsBreakdown(this.props.reviews);
  }

  reviewsBreakdown(reviews) {
    var avg = 0;
    var recAvg = 0;
    var breakdown = [0, 0, 0, 0, 0];
    for (let i = 0; i < reviews.length; i++) {
      avg += reviews[i].rating;
      breakdown[reviews[i].rating - 1]++;
      if (reviews[i].recommend) {
        recAvg++;
      }
    }
    avg /= reviews.length;
    recAvg = (recAvg * 100) / reviews.length;
    this.setState({avg: avg, recAvg: recAvg, breakdown: breakdown});
  }

  render() {
    let avg = this.state.avg.toString();
    avg = avg.slice(0, 3);
    let ratingFilters = null;
    if (this.props.filters.length !== 0) {
      ratingFilters = <RatingFilters newFilter={this.props.newFilter} filters={this.props.filters} />;
    }

    return (
      <Breakdown>
        <Average>
          <StarRow size={30} rating={this.state.avg * 20}/>
          <span>{avg}</span>
        </Average>
        <PercentRec>{Math.round(this.state.recAvg)}% of reviewers recommend this product</PercentRec>
        <RatingBar newFilter={this.props.newFilter} stars={1} percent={(this.state.breakdown[0] * 100) / this.props.reviews.length}/>
        <RatingBar newFilter={this.props.newFilter} stars={2} percent={(this.state.breakdown[1] * 100) / this.props.reviews.length}/>
        <RatingBar newFilter={this.props.newFilter} stars={3} percent={(this.state.breakdown[2] * 100) / this.props.reviews.length}/>
        <RatingBar newFilter={this.props.newFilter} stars={4} percent={(this.state.breakdown[3] * 100) / this.props.reviews.length}/>
        <RatingBar newFilter={this.props.newFilter} stars={5} percent={(this.state.breakdown[4] * 100) / this.props.reviews.length}/>
        {ratingFilters}
      </Breakdown>
    );
  }
}

const Breakdown = styled.div`

`;

const Average = styled.div`
  font-size: 3.2rem;
  text-align: center;
`;

const PercentRec = styled.div`
  margin-bottom: 0.7rem;
  font-style: italic;
  text-align: center;
`;


Ratings.propTypes = {
  reviews: PropTypes.array,
  newFilter: PropTypes.func,
  filters: PropTypes.array
};

export default Ratings;
