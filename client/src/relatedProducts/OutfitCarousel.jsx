import React from 'react';
import PropTypes from 'prop-types';
import StyledSlide from './Slide.jsx';
import styled from 'styled-components';


class OutfitCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.removeFromOutfit = this.removeFromOutfit.bind(this);
    this.removeProductClickHandler = this.removeProductClickHandler.bind(this);
    this.addToOutfit = this.addToOutfit.bind(this);
    this.addProductClickHandler = this.addProductClickHandler.bind(this);

    this.state = {
      yourOutfit: {}
    };
  }

  componentDidMount() {
    var localStorage = JSON.parse(window.localStorage.getItem('relatedProducts'));
    if (localStorage && localStorage.yourOutfit) {
      this.setState({
        yourOutfit: localStorage.yourOutfit
      });
    }
  }
  componentDidUpdate() {
    window.localStorage.setItem('relatedProducts', JSON.stringify(this.state));
  }

  removeFromOutfit(product) {
    let currentOutfit = this.state.yourOutfit;
    delete currentOutfit[product.id];
    this.setState({
      yourOutfit: currentOutfit
    });
  }

  addToOutfit(newProduct) {
    let currentOutfit = this.state.yourOutfit;
    currentOutfit[newProduct['id']] = newProduct;
    this.setState({
      yourOutfit: currentOutfit
    });
  }

  addProductClickHandler(event) {
    event.preventDefault();
    event.target.setAttribute('disabled', true);
    this.addToOutfit(this.props.currentProduct);
  }

  removeProductClickHandler(event, data) {
    this.removeFromOutfit(data);
  }

  render() {
    return (
      <>
        <FirstSlide onClick={this.addProductClickHandler}>
          <p>Add Product to Outfit</p>
        </FirstSlide>
        {Object.values(this.state.yourOutfit).map((product) => {
          return <StyledSlide data={product}
            cardButtonClick={this.removeProductClickHandler}
            key={product.id}
            render={onClick => (
              <Button onClick={onClick}>x</Button>
            )}>
          </StyledSlide>;
        })}
      </>
    );
  }
}

OutfitCarousel.propTypes = {
  data: PropTypes.object.isRequired,
  currentProduct: PropTypes.object
};

const FirstSlide = styled.div`
  width: 200px;
  height: 300px;
  background-color: grey;
  margin: 0.5em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    color: white;
    font-size: 1em;
  }
`;

const Button = styled.button`
  font-size: 1em;
  color: white;
  background: none;
  border: none;
  width: 25%;
  position: absolute;
  top: 0%;
  left: 80%;
  cursor: pointer;
`;



export default OutfitCarousel;
