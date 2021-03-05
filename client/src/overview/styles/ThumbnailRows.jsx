import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleType } from '../types';
import StyleThumbnail from './StyleThumbnail';

const StylesDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
`;


const ThumbnailRows = (props) => {
  // if there are no styles passed in, do not render component
  if (!props.styles.length) {
    return null;
  }
  const selectedId = props.selectedStyle.style_id;
  const styleIcons = props.styles.map((style) => {
    return (
      <StyleThumbnail
        key={style.style_id}
        style={style}
        selectedId={selectedId}
        setStyle={props.setStyle} />
    );
  });

  return (
    <StylesDiv>
      {styleIcons}
    </StylesDiv>
  );
};

ThumbnailRows.propTypes = {
  selectedStyle: StyleType,
  styles: PropTypes.arrayOf(StyleType),
  setStyle: PropTypes.func
};

export default ThumbnailRows;
