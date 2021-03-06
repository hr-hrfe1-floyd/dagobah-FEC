import React, { Component } from 'react';
import StyledSlideInfo from './SlideInfo.jsx';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Slide extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      loading: true
    };
  }

  handleButtonClick(event) {
    event.preventDefault();
    this.props.cardButtonClick(event, this.props.data);
  }

  fetchStylesDataFromApi() {
    const url = `/api/products/${this.props.data.id}/styles`;
    return axios.get(url)
      .then((response) => {
        if (response && response.data) {
          return response.data;
        }
        throw Error('fetching styles data failed');
      });
  }

  fetchReviewMetaDataFromApi() {
    const url = `/api/reviews/meta?product_id=${this.props.data.id}`;
    return axios.get(url)
      .then((response) => {
        if (response && response.data) {
          return response.data;
        }
        throw Error('fetching review meta data failed');
      });
  }

  componentDidMount() {
    this.fetchStylesDataFromApi()
      .then((data) => {
        // if there are styles associated with the product
        if (!data.results) {
          throw Error('no styles found for product');
        }
        // move the default item to the front of the array if not already there
        const styles = data.results.sort((a) => {
          return a['default?'] ? 1 : 0;
        });
        const defaultStyle = styles[0];
        this.setState({
          styles: styles,
          defaultStyle: defaultStyle,
          loading: false
        });
      })
      .catch((error) => {
        console.error('Overview Error:', error);
      });
    this.fetchReviewMetaDataFromApi()
      .then((data) => {
        // if there is no data with a ratings object something went wrong
        if (!data.ratings) {
          throw Error('no review metadata found for product');
        }
        let count = 0;
        let sum = 0;
        Object.entries(data.ratings)
          .map(([key, value]) => {
            return [parseInt(key), parseInt(value)];
          })
          .forEach(([key, value]) => {
            count += value;
            sum += (key * value);
          });
        this.setState({
          reviewData: {
            count: count,
            sum: sum
          }
        });
      });
  }

  render() {
    if (this.state.loading) {
      return <div></div>;
    }
    let thumb = this.state.defaultStyle.photos[0].thumbnail_url;
    return (
      <StyledSlide thumburl={thumb}>
        <Link to={{ pathname: `/products/${this.props.data.id}` }} key={this.props.data.id}>
          {this.props.render(this.handleButtonClick)}
          <StyledSlideInfo
            data={this.props.data}
            reviewData={this.state.reviewData}
            defaultStyle={this.state.defaultStyle}
          ></StyledSlideInfo>

        </Link>
      </StyledSlide>
    );
  }
}

Slide.propTypes = {
  data: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
  cardButtonClick: PropTypes.func.isRequired
};

const StyledSlide = styled.div`
  background-image: url("${props => props.thumburl}");
  background-repeat: no-repeat;
  background-size: cover;
  margin: 10px;
  width: 200px;
  height: 300px;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  margin: 0.5em;
`;

export default Slide;
