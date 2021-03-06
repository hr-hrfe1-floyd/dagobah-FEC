import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Tile, ModuleHeader, Button } from '../globalStyles.js';
import IndividualReview from './IndividualReview.jsx';
import Ratings from './Ratings.jsx';
import FactorsBreakdown from './FactorsBreakdown.jsx';
import SortDropdown from './SortDropdown.jsx';
import AddReviewModal from './AddReviewModal.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: props.product_id,
      reviews: null,
      renderedReviews: null,
      filters: [],
      sortOrder: 'relevance',
    };
  }

  componentDidMount() {
    //get reviews
    this.getReviews(this.state.sortOrder);
  }

  getReviews(sortOrder) {
    //if(!sortOrder){sort order = 'newest';}
    return axios.get('/api/reviews', {
      params: {
        product_id: this.state.product_id,
        sort: sortOrder
      }
    })
      .then((res) => {
        // console.log('GET REQ: ', res.data.results);
        this.setState({reviews: res.data.results, renderedReviews: res.data.results});
      });
  }

  newFilter(filter) {
    //if filter exists within this.state.filters, remove from filters (indexOf !== -1)
    //else, add to filters
    //re-render renderedList with new filters
    if (filter === null) {
      this.setState({filters: []});
      console.log('filtering reviews based on: ', this.state.filters);
    } else {
      let filterLocation = this.state.filters.indexOf(filter);
      let newFilters = this.state.filters;
      if (filterLocation !== -1) {
        newFilters.splice(filterLocation, 1);
      } else {
        newFilters.push(filter);
      }
      this.setState({filters: newFilters}, () => {
        this.sortAndFilter(this.state.sortOrder, this.state.filters);
      });
    }
  }

  newSort(sort) {
    this.setState({sortOrder: sort}, () => {
      let sortOrder = 'relevant';
      if (sort === 'helpfulness') { sortOrder = 'helpful'; }
      if (sort === 'newest') { sortOrder = 'newest'; }
      this.getReviews(sortOrder)
        .then(()=> {
          this.sortAndFilter(this.state.sortOrder, this.state.filters);
        });
    });
  }

  sortAndFilter(sortOrder, filters) {
    let renderedReviews = [];
    if (filters.length === 0) {
      renderedReviews = this.state.reviews;
    } else {
      for (let i = 0; i < this.state.reviews.length; i++) {
        let rev = this.state.reviews[i];
        for (let j = 0; j < filters.length; j++) {
          if (Math.floor(rev.rating) === filters[j]) {
            renderedReviews.push(rev);
            break;
          }
        }
      }
    }
    this.setState({renderedReviews: renderedReviews});
  }

  render() {
    if (!this.state.reviews) {
      return (<AddReviewModal></AddReviewModal>);
    } else {
      return (
        <div>
          <ModuleHeader>Ratings &amp; Reviews</ModuleHeader>
          <SortWrap><SortDropdown newSort={this.newSort.bind(this)} sortOrder={this.state.sortOrder}></SortDropdown></SortWrap>
          <RatingsReviewsPanel>
            <RatingComponent>
              <Ratings reviews={this.state.reviews} filters={this.state.filters} newFilter={this.newFilter.bind(this)}/>
              <FactorsBreakdown />
            </RatingComponent>

            <ReviewsComponent>
              {this.state.renderedReviews.map((review) => {
                return (<IndividualReview key={review.review_id} review={review} />);
              })}
              <ReviewsButton>MORE REVIEWS</ReviewsButton>
              <AddReviewModal></AddReviewModal>
              {/* First two reviews should render plus if more reviews exist a button should render to expand ReviewsList w two add'l reviews */}
            </ReviewsComponent>
          </RatingsReviewsPanel>
          <Footer></Footer>
        </div>
      );
    }
  }
}

const SortWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 0.7rem;
  position: relative;
  height: 4rem;
  overflow: visible;
`;

const RatingsReviewsPanel = styled.div`
  display: flex;
`;

const RatingComponent = styled(Tile)`
  display: flex;
  flex-direction: column;
  order: 1;
  width: 25%;
  margin-top: 0.7rem;
  margin-right: 0.7rem;
  border-bottom: 1px solid #f0f0f5;
  padding: 0 1rem 1rem 1rem;
`;

const ReviewsComponent = styled.div`
  order: 2;
  flex-basis: 70%;
`;

const ReviewsButton = styled(Button)`
  margin-top: 0.7rem;
  margin-right: 0.7rem;
`;

const Footer = styled.div`
  padding: 1.5rem 0;
`;

ReviewsList.propTypes = {
  product_id: PropTypes.number
};

export default ReviewsList;
