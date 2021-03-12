import React from 'react';
import PropTypes from 'prop-types';
import Slide from './Slide.jsx';
import StyledModal from './Modal.jsx';

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

    this.modalRef = React.createRef();
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

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props.data === nextProps.data) || (this.state.showModal !== nextState.showModal);
  }
  componentDidUpdate() {
    if (this.state.showModal) {
      this.modalRef.current.focus();
    }
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
              buttonText='★'>
            </Slide>
          );
        })}


        <StyledModal
          ref={this.modalRef}
          id='related-products-modal'
          show={this.state.showModal}
          handleClose={this.hideModal}
          data={this.state.clickedProduct}
          currentProduct={this.props.currentProduct}/>
      </>
    );
  }
}


RelatedCarousel.propTypes = {
  data: PropTypes.object.isRequired,
  currentProduct: PropTypes.object.isRequired
};

export default RelatedCarousel;
