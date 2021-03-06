import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import StarRow from '../starRow.jsx';


const SlideInfo = (props) => {
  let average = 0;
  //calculate average review for star Row
  if (props.reviewData) {
    average = (props.reviewData.sum / props.reviewData.count) * 20;
  }
  //if the item is on sale, put sale price in red and strikethrough original price
  let saleSection = <p> {props.data.default_price}</p>;
  if (props.data.sale_price) {
    saleSection = <SalePrice>{props.data.sale_price}</SalePrice>;
    saleSection += <p> <s>{props.data.default_price}</s></p>;
  }
  return (
    <div className={props.className}>
      <p> {props.data.category} </p>
      <p> {props.data.name} </p>
      {saleSection}
      <StarRow rating={average} size={20}></StarRow>
    </div>
  );
};

SlideInfo.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  reviewData: PropTypes.object
};

const SalePrice = styled.p`
  color: red;
`;

const StyledSlideInfo = styled(SlideInfo)`
  width: 200px;
  height: 100px;
  background: linear-gradient(0deg, #000 30%, #99999944 100%);

  p {
    color: white;
    margin: 0;
  }

  &:hover {
    height: 120px;
  }
`;

export default StyledSlideInfo;
