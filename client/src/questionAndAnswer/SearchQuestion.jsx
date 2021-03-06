import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Palette } from '../globalStyles.js';

const SearchQuestion = (props) => {
  // create an input field
  // add icons to it
  // add the state so it can store the search term
  // pass in all the questions as props so we can search each question
  // update the visible question???
  return (
    <React.Fragment>
      <SearchBar type="text"
        placeholder="Have a question? Search for answers..."
        onChange={props.onChange}
        value={props.value}
      ></SearchBar>
    </React.Fragment>
  );
};

const SearchBar = styled.input`
  grid-area: search-question;
  grid-row: span 1;
  width: 100%;
  padding: 10px 15px;
  margin: 8px 0;
  text-transform: uppercase;
  color: ${Palette.black};
  border: 1px solid ${Palette.borderGrey};
`;

SearchQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default SearchQuestion;
