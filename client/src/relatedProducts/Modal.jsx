import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Tile, LowPriorityText } from '../globalStyles.js';

//Combine the features of two products into a single array of objects
//Each object contains the feature name and value for each product being compared
let compareFeatures = (data, currentProduct) => {
  let combinedFeatures = {};
  for (var i = 0; i < data.features.length; i++) {
    let feature = {
      featureName: data.features[i].feature,
      clickedValue: data.features[i].value
    };
    //If current value has that feature, add it to the object
    currentProduct.features.forEach((currChar) => {
      if (currChar.feature === feature.featureName) {
        feature['currentValue'] = currChar.value;
      }
    });
    //If current value doesn't have that feature, leave blank
    feature['currentValue'] = feature['currentValue'] || '';
    combinedFeatures[feature.featureName] = feature;
  }
  //Add features in the current product not shared by the clicked one
  currentProduct.features.map((feature) => {
    combinedFeatures[feature.feature] = combinedFeatures[feature.feature] ||
    {
      featureName: feature.feature,
      currentValue: feature.value,
      clickedValue: ''
    };
  });
  return Object.values(combinedFeatures);
};

const Modal = (props) => {
  const { handleClose, data, currentProduct } = props;
  if (!props.show) {
    return <div></div>;
  }
  return (
    <div className={props.className}>
      <ModalTable>
        <CloseButton type="button" onClick={handleClose}>x</CloseButton>
        <LowPriorityText>Comparing</LowPriorityText>
        <HeaderRow>
          <p>{currentProduct.name}</p>
          <p>{data.name}</p>
        </HeaderRow>
        <Table>
          <TableBody>
            {
              compareFeatures(data, currentProduct).map((row) => {
                let {currentValue, featureName, clickedValue} = row;
                //If the product's value is true, display a checkmark
                currentValue = currentValue === 'true' ? '✓' : currentValue;
                clickedValue = clickedValue === 'true' ? '✓' : clickedValue;
                return (<Row key={featureName}>
                  <Field width='10%'>{currentValue}</Field>
                  <Field width='80%'>{featureName}</Field>
                  <Field width='10%'>{clickedValue}</Field>
                </Row>);
              })
            }
          </TableBody>
        </Table>
      </ModalTable>
    </div>
  );
};

Modal.propTypes = {
  className: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  currentProduct: PropTypes.object.isRequired,
};

const Row = styled.tr`
  padding: 0.5rem;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.25em;
  position: sticky;
  top: 2.5em;
  background: #FFFFFF66;

  p {
    padding: 0.5em;
    background: #FFFFFF88;
    margin: 0;
  }
`;

//pass in width prop -- 80% or 10%
const Field = styled.td`
  width: ${props => props.width};
  padding: 0.5em;
  text-align: center;
`;

const Table = styled.table`
  border-collase: separate;
  border-spacing: 0.5em;
  padding: 0.5rem;
  display: block;
  cellspacing: 1em;
`;

const TableBody = styled.tbody`
  display: block;
  overflow-y: auto;
  max-height: 80%;
`;

const ModalTable = styled(Tile)`
  position: fixed;
  background: white;
  width: 50%;
  height: 50%;
  overflow-y: scroll;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledModal = styled(Modal)`
  display: ${props => props.show ? 'block' : 'none'};
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const CloseButton = styled(Button)`
  position: sticky;
  top: 5%;
  left: 90%;
  z-index: 1;
`;



export {StyledModal as default, compareFeatures};
