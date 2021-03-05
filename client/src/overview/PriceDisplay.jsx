import React from 'react';
import styled from 'styled-components';
import { StyleType } from './types.js';

const PriceContainer = styled.p`
  padding: 0.25rem;
`;

const StruckSpan = styled.span`
  text-decoration: line-through;
  padding-right: 0.5rem;
`;

const RedSpan = styled.span`
  color: red;
`;

const DisplayPrice = styled.span`
  color: black;
  font-weight: 300;
`;

const PriceDisplay = (props) => {
  if (!props.selectedStyle) {
    return '';
  }
  if (props.selectedStyle.sale_price) {
    return (
      <PriceContainer>
        <StruckSpan>${props.selectedStyle.original_price}</StruckSpan>
        <RedSpan>${props.selectedStyle.sale_price}</RedSpan>
      </PriceContainer>
    );
  } else {
    return (
      <PriceContainer>
        <DisplayPrice>${props.selectedStyle.original_price}</DisplayPrice>
      </PriceContainer>
    );
  }
};

PriceDisplay.propTypes = {
  selectedStyle: StyleType
};

export default PriceDisplay;

