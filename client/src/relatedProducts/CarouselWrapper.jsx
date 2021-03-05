import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class CarouselWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.state = {
      showLeftScroll: true,
      showRightScroll: true
    };
  }

  scrollRight() {
    this.container.scrollLeft += 200;
    if (this.container.scrollLeft + this.container.clientWidth >= this.container.scrollWidth) {
      this.setState({
        showRightScroll: false,
        showLeftScroll: true
      });
    } else {
      this.setState({
        showLeftScroll: true
      });
    }
  }

  scrollLeft() {
    this.container.scrollLeft -= 200;
    if (this.container.scrollLeft === 0) {
      this.setState({
        showRightScroll: true,
        showLeftScroll: false
      });
    } else {
      this.setState({
        showRightScroll: true,
      });
    }
  }

  componentDidMount() {
    this.container = document.getElementById(this.props.name + 'Container');
    if (this.container.scrollWidth <= this.container.clientWidth) {
      this.setState({
        showLeftScroll: false,
        showRightScroll: false
      });
    }
  }

  render() {
    return (
      <StyledCarouselWrapper>
        <Button show={this.state.showLeftScroll}
          onClick={this.scrollLeft}>{'<'}</Button>
        <CarouselContainer id={this.props.name + 'Container'}>
          {this.props.render(this.props.data)}
        </CarouselContainer>
        <Button show={this.state.showRightScroll}
          onClick={this.scrollRight}>{'>'}</Button>
      </StyledCarouselWrapper>
    );
  }

}

CarouselWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
};

const StyledCarouselWrapper = styled.div`
  background: #e8e8e8;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const CarouselContainer = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  padding: 10px;
`;

const Button = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  padding: 20px;
  margin: 0.5em;
  background: #ededed;
  cursor: pointer;
`;


export default CarouselWrapper;
