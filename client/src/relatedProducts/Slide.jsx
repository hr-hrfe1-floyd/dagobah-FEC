import React, { Component } from 'react';
import StyledSlideInfo from './SlideInfo.jsx';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Slide extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(event) {
    event.preventDefault();
    this.props.cardButtonClick(event, this.props.data);
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.props.render(this.handleButtonClick)}
        <StyledSlideInfo data={this.props.data}></StyledSlideInfo>
      </div>
    );
  }
}

Slide.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
  cardButtonClick: PropTypes.func.isRequired
};

const StyledSlide = styled(Slide)`
  margin: 10px;
  width: 200px;
  height: 300px;
  flex: 0 0 auto;
  background-color: grey;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
`;

export default StyledSlide;
