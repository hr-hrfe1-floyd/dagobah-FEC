import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Palette, ClickableText } from '../globalStyles.js';

const RatingBar = (props) => {
  let star = 'Star';
  if (props.stars > 1) {
    star += 's';
  } else {
    star += ' ';
  }
  return (
    <StarRow id={props.stars} onClick={()=>{ props.newFilter(props.stars); }}>
      <RowName>{props.stars} {star}</RowName>
      <RenderedBar percent={props.percent} empty={100 - props.percent}></RenderedBar>
    </StarRow>
  );
};

const RenderedBar = (props) => {
  return (
    <Bar percent={props.percent} empty={100 - props.percent}>
      <Full percent={props.percent}></Full>
      <Empty empty={props.empty}></Empty>
    </Bar>
  );
};

const StarRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: hsla(0, 0%, 95%, 50%);
  }
`;

const RowName = styled(ClickableText)`
`;

const Bar = styled.div`
  margin-top: 0.2rem;
  margin-right: 15%;
  height: 1rem;
  flex-basis: 50%;
  border: 1px solid ${Palette.borderGrey};
  display: flex;
`;

const Full = styled.div`
  height: 99%;
  width: ${props => props.percent}%;
  background: hsl(0, 100%, 60%);
`;

const Empty = styled.div`
  display: inline;
  height: 99%;
  width: ${props => props.empty}%;
  background: hsla(0, 0%, 85%, 60%);
`;

RatingBar.propTypes = {
  stars: PropTypes.number,
  percent: PropTypes.number,
  newFilter: PropTypes.func
};

RenderedBar.propTypes = {
  percent: PropTypes.number,
  empty: PropTypes.number
};

export default RatingBar;
