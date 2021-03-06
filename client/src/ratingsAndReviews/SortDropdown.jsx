import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Palette } from '../globalStyles.js';

class SortDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      sortOrder: this.props.sortOrder
    };
  }

  applySort(sort) {
    this.setState({active: false, sortOrder: sort}, () => {
      this.props.newSort(sort);
    });
  }

  render() {
    let menu = <DropdownHead onClick={()=>{ this.setState({active: !this.state.active}); }}><div>{this.state.sortOrder}</div><Indicator>&#9662;</Indicator></DropdownHead>;
    let relevanceButton = <DropdownItem onClick={()=>{ this.applySort('relevance'); }}>Relevance</DropdownItem>;
    let helpfulnessButton = <DropdownItem onClick={()=>{ this.applySort('helpfulness'); }}>Helpfulness</DropdownItem>;
    let newestButton = <DropdownItem onClick={()=>{ this.applySort('newest'); }}>Newest</DropdownItem>;

    if (this.state.active) {
      if (this.state.sortOrder === 'relevance') {
        menu = <DropdownMenu>
          <DropdownHead onClick={()=>{ this.setState({active: !this.state.active}); }}><div>{this.state.sortOrder}</div><UpIndicator>&#9662;</UpIndicator></DropdownHead>
          {helpfulnessButton}
          {newestButton}
        </DropdownMenu>;
      } else if (this.state.sortOrder === 'helpfulness') {
        menu = <DropdownMenu>
          <DropdownHead onClick={()=>{ this.setState({active: !this.state.active}); }}><div>{this.state.sortOrder}</div><UpIndicator>&#9662;</UpIndicator></DropdownHead>
          {relevanceButton}
          {newestButton}
        </DropdownMenu>;
      } else {
        menu = <DropdownMenu>
          <DropdownHead onClick={()=>{ this.setState({active: !this.state.active}); }}><div>{this.state.sortOrder}</div><UpIndicator>&#9662;</UpIndicator></DropdownHead>
          {relevanceButton}
          {helpfulnessButton}
        </DropdownMenu>;
      }
    }

    return (
      <div>
        {menu}
      </div>

    );
  }
}

//position me rightward, NOT here but in ReviewsList
const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  height: 12rem;
  width: 16rem;
`;

const DropdownHead = styled(Button)`
  width: 16rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background-color: hsl(0, 0%, 95%);
  }
`;

const DropdownItem = styled(Button)`
  text-align: left;
  &:hover {
    background-color: hsl(0, 0%, 95%);
  }
`;

const Indicator = styled.div`
  font-size: 1.25em;
  margin-left: 1em;
  color: ${Palette.lowPriority};
`;

const UpIndicator = styled(Indicator)`
  transform: rotate(180deg);
  margin-top: 0.2rem;
`;

SortDropdown.propTypes = {
  newSort: propTypes.func,
  sortOrder: propTypes.string
};

export default SortDropdown;
