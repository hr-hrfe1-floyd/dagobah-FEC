import React from 'react';
import Carousel from './Carousel.jsx';
import axios from 'axios';
import PropTypes from 'prop-types';

class RelatedProductsWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductsData: {},
      isLoading: true
    };
  }

  //get list of related products using productId prop
  getRelatedProducts() {
    axios.get('/api/products/19089/related', {
      params: {
        product_id: 19089
      }
    }).then(({data}) => {
      return Promise.all(data.map((id) => {
        return this.getProductData(id);
      }));
    }).then(() => {
      this.setState({
        isLoading: false
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  //get data for an individual product
  //to be added to product card
  getProductData(id) {
    return axios.get(`/api/products/${id}`, {
      params: {
        product_id: id
      }
    }).then(({data}) => {
      var oldProductData = this.state.relatedProductsData;
      oldProductData[data.id] = data;
      this.setState({
        relatedProductsData: oldProductData
      });
    });
  }

  componentDidMount() {
    this.getRelatedProducts();
  }

  render() {
    if (this.state.isLoading) {
      console.log('loading');
      return <div>RELATED LOADING</div>;
    }
    return (
      <div>
        <h4>Related Products</h4>
        <Carousel data={this.state.relatedProductsData}/>
        <h4>Your outfit</h4>
        <Carousel />
      </div>
    );
  }
}

RelatedProductsWrapper.propTypes = {
  product_id: PropTypes.number
};

export default RelatedProductsWrapper;