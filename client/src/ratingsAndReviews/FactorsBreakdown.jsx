import React from 'react';
import styled from 'styled-components';
import { Palette } from '../globalStyles.js';
import FactorBar from './FactorBar.jsx';

const FactorsBreakdown = () => {
  return (
    <Breakdown>
      <Title>Factors</Title>
      <FactorBar name={'Size'} range={['too small', 'just right', 'too wide']}></FactorBar>
      <FactorBar name={'Width'} range={['too narrow', 'just right', 'too wide']}></FactorBar>
      <FactorBar name={'Length'} range={['runs short', 'just right', 'runs long']}></FactorBar>
      <FactorBar name={'Fit'} range={['runs tight', 'just right', 'runs long']}></FactorBar>
      <FactorBar name={'Comfort'} range={['uncomfortable', 'okay', 'perfect']}></FactorBar>
      <FactorBar name={'Quality'} range={['poor', 'as expected', 'perfect']}></FactorBar>
    </Breakdown>
  );
};

const Breakdown = styled.div`
  margin-top: 1.5rem;
  padding-left: 0.5rem;
`;

const Title = styled.div`
margin-bottom: 0.5rem;
text-decoration: underline;
color: ${Palette.black};
`;

export default FactorsBreakdown;
