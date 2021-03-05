import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import StarRow from '../starRow.jsx';


const SlideInfo = (props) => {
  return (
    <div className={props.className}>
      <div> {props.data.category} </div>
      <div> {props.data.name} </div>
      <div> {props.data.default_price} </div>
      <StarRow size={20}></StarRow>
    </div>
  );
};

SlideInfo.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
};

const StyledSlideInfo = styled(SlideInfo)`
  width: 200px;
  height: 100px;
  background-color: #B0A8B9;
`;

export default StyledSlideInfo;
