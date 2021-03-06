import React from 'react';
import PropTypes from 'prop-types';
import Slide from './Slide.jsx';
import StyledModal from './Modal.jsx';
import styled from 'styled-components';

class RelatedCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      clickedProduct: {}
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.cardButtonClick = this.cardButtonClick.bind(this);
  }

  showModal(data) {
    this.setState({
      showModal: true,
      clickedProduct: data
    });
  }

  hideModal() {
    this.setState({
      showModal: false
    });
  }

  cardButtonClick(event, data) {
    this.showModal(data);
  }

  render() {
    return (
      <>
        {Object.values(this.props.data).map((product) => {
          return (
            <Slide
              key={product.id}
              data={product}
              value={product}
              cardButtonClick={this.cardButtonClick}
              render={onClick => (
                <Button onClick={onClick}>★</Button>
              )}>
            </Slide>
          );
        })}


        <StyledModal
          id='related-products-modal'
          show={this.state.showModal}
          handleClose={this.hideModal}
          data={this.state.clickedProduct}
          currentProduct={this.props.currentProduct}/>
      </>
    );
  }
}

const Button = styled.button `
  font-size: 1em;
  color: white;
  background: none;
  border-radius: 3px;
  border: none;
  width: 25%;
  position: absolute;
  top: 0%;
  left: 80%;
  cursor: pointer;

`;

RelatedCarousel.propTypes = {
  data: PropTypes.object.isRequired,
  currentProduct: PropTypes.object.isRequired
};

export default RelatedCarousel;
