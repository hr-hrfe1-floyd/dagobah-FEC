import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleType } from '../types';


const Checkmark = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  background-color: white;
  border: 1px solid black;
  border-radius: 50%;
  padding: none;
  text-align: center;
  cursor: pointer;
  position: relative;
  left: 3rem;
`;

const StyleThumbnail = (props) => {

  const thumbUrl = props.style.photos[0].thumbnail_url;
  const checkmark = props.selectedId === props.style.style_id ? <Checkmark>✓</Checkmark> : '';

  const updateStyle = () => {
    if (props.selectedId !== props.style.style_id) {
      props.setStyle(props.style.style_id);
    }
  };

  return (
    <div
      onClick={updateStyle}
      style={{
        backgroundImage: `url(${thumbUrl})`,
        backgroundSize: 'cover',
        cursor: 'pointer',
        width: '4rem',
        height: '4rem',
        border: '1px solid black',
        borderRadius: '2rem'
      }}>
      {checkmark}
    </div>
  );
};

StyleThumbnail.propTypes = {
  selectedId: PropTypes.number,
  style: StyleType,
  setStyle: PropTypes.func
};

export default StyleThumbnail;
