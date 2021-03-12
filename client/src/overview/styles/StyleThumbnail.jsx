import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleType } from '../types';


const Checkmark = styled.div`
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  font-size: 2rem;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.primaryText};
  border: 1px solid ${props => props.theme.primaryText};
  border-radius: 50%;
  padding: none;
  text-align: center;
  cursor: pointer;
  position: relative;
  left: 6rem;
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
        width: '8rem',
        height: '8rem',
        border: '1px solid black',
        borderRadius: '4rem'
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
