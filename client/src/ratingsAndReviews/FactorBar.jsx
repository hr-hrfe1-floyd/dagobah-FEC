import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Palette } from '../globalStyles.js';

const FactorBar = (props) => {
  return (
    <Factor>
      <Name>{props.name}</Name>
      <Indicator location={props.average}>&#9662;</Indicator>
      <FullBar><Bar></Bar><Bar></Bar><Bar></Bar></FullBar>
      <Values>
        <Value1>{props.range[0]}</Value1>
        <Value2>{props.range[1]}</Value2>
        <Value3>{props.range[2]}</Value3>
      </Values>
    </Factor>
  );
};

const Factor = styled.div`
padding-bottom: 0.5rem;
`;

const Name = styled.span`
  display: block;
  font-style: italic;
  margin-bottom: 1rem;
`;

const Indicator = styled.div`
  position: relative;
  z-index: 2;
  font-size: 1.25em;
  color: ${Palette.primary};
  margin-top: -2rem;
  margin-left: 50%;
`;

const FullBar = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: -1.2rem;
`;

const Bar = styled.div`
  background-color: hsla(0, 0%, 85%, 60%);
  width: 31.5%;
  height: 0.7rem;
  border: 1px solid ${Palette.borderGrey};
  display: flex;
`;

const Values = styled.div`
  width: 100%;
  display: grid;
`;
const Value = styled.span`
  font-size: 0.8em;
  color: hsl(0, 0%, 40%);
  font-style: italic;
`;

const Value1 = styled(Value)`
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 1;
  grid-column-end: 1;
  text-align: left;
`;
const Value2 = styled(Value)`
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 2;
  grid-column-end: 2;
  text-align: center;
`;
const Value3 = styled(Value)`
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 3;
  grid-column-end: 3;
  text-align: right;
`;
FactorBar.propTypes = {
  name: PropTypes.string,
  range: PropTypes.array,
  average: PropTypes.number
};

export default FactorBar;
