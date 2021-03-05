import React from 'react';
import PropTypes from 'prop-types';
import { ProductType } from './types.js';
import axios from 'axios';
import AddToCart from './AddToCart';
import ImageGallery from './ImageGallery';
import StarRating from './StarRating';
import ProductDescription from './ProductDescription';
import ProductDetail from './ProductDetail';
import PriceDisplay from './PriceDisplay';
import StyleSelector from './styles/StyleSelector';
import styled from 'styled-components';

const Grid = styled.div`
border: 1px solid #ddd;
display: grid;
grid-column-gap: 1rem;
`;

const LeftContainer = styled.div`
grid-column-start: 1;
grid-column-end: 2;
`;

const RightContainer = styled.div`
grid-column-start: 2;
grid-column-end: 3;
`;

class OverviewContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      styles: [],
      selectedStyle: null,
      reviewData: {
        count: 0,
        sum: 0
      }
    };
    this.setSelectedStyle = this.setSelectedStyle.bind(this);
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
          selectedStyle: defaultStyle
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

  fetchStylesDataFromApi() {
    const url = `/api/products/${this.props.product_id}/styles`;
    return axios.get(url)
      .then((response) => {
        if (response && response.data) {
          return response.data;
        }
        throw Error('fetching styles data failed');
      });
  }

  fetchReviewMetaDataFromApi() {
    const url = `/api/reviews/meta?product_id=${this.props.product_id}`;
    return axios.get(url)
      .then((response) => {
        if (response && response.data) {
          return response.data;
        }
        throw Error('fetching review meta data failed');
      });
  }

  setSelectedStyle(styleId) {
    let newStyle = this.state.styles.find(style => style.style_id === styleId);
    this.setState({
      selectedStyle: newStyle
    });
  }

  render() {
    return (
      <Grid>
        <LeftContainer>
          <ImageGallery />
        </LeftContainer>
        <RightContainer>
          <StarRating count={this.state.reviewData.count} sum={this.state.reviewData.sum} />
          <ProductDetail product={this.props.product} />
          <PriceDisplay selectedStyle={this.state.selectedStyle} />
          <StyleSelector
            styles={this.state.styles}
            selectedStyle={this.state.selectedStyle}
            setStyle={this.setSelectedStyle} />
          <AddToCart />
        </RightContainer>
        <ProductDescription product={this.props.product}/>
      </Grid>
    );
  }
}

OverviewContainer.propTypes = {
  product_id: PropTypes.number,
  product: ProductType
};

export default OverviewContainer;

