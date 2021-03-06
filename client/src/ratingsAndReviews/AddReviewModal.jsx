import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import StarRow from '../starRow.jsx';
import { Button, Tile, ModalBackground, Italic, Palette, TextArea } from '../globalStyles';


class AddReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  render() {
    if (!this.state.active) {
      return (<ReviewsButton onClick={() => { this.setState({active: !this.state.active}); }}>ADD A REVIEW  +</ReviewsButton>);
    } else {
      return (
        <ModalBackground>
          <ReviewForm>
            <Title>Write Your Review</Title>
            <br></br>
            <Subtitle>About {this.props.productName}</Subtitle>
            <Form>
              <Heading>Rating<Asterisk>&#42;</Asterisk></Heading>
              <StarRow size={15} rating={0}></StarRow>
              <Heading>Do you recommend this product? <Asterisk>&#42;</Asterisk></Heading>
              <input type="radio" id="recommend" />
              <RadioLabel htmlFor="recommend" value="yes">Yes</RadioLabel>
              <RadioLabel htmlFor="recommend" value="no">No</RadioLabel>
              <Heading>Characteristics<Asterisk>&#42;</Asterisk></Heading>
              <p>?????</p>
              <Heading>Review Summary</Heading>
              <TextArea id="add-summary" onClick={()=>{ document.getElementById('add-summary').value = ''; }}>Example: Best. Purchase. Ever!</TextArea>
              <Heading>Tell us how you felt about the product<Asterisk>&#42;</Asterisk></Heading>
              <AddBody id="add-body" onClick={()=>{ document.getElementById('add-body').value = ''; }}>Example: It was the best of shoes, it was the worst of shoes...</AddBody>
              <Heading>Show us your style! Add product photos below:</Heading>
              <Upload onClick={()=>{ console.log('you thought it was functionality, but it was I, FAILURE!'); }}>Upload Images</Upload>
              <Heading>Tell us your nickname<Asterisk>&#42;</Asterisk></Heading>
              <AddSummary id="add-nickname" onClick={()=>{ document.getElementById('add-nickname').value = ''; }}>Example: theDevilWearsNada666</AddSummary>
              <br></br>
              <Sidenote>For privacy reasons, do not use your full name or email address</Sidenote>
              <Heading>What is your email?<Asterisk>&#42;</Asterisk></Heading>
              <AddSummary id="add-email" onClick={()=>{ document.getElementById('add-email').value = ''; }}>Example: jvermeer32@email.com</AddSummary>
              <br></br>
              <Sidenote>For authentication reasons, you will not be emailed</Sidenote>
              <Padding></Padding>
              <Heading>Told us everything we need to know?</Heading>
              <Padding></Padding>
              <Upload onClick={()=>{ console.log('you thought it was functionality, but it was I, FAILURE!'); }}>Submit Review</Upload>
              <Heading></Heading>
            </Form>
          </ReviewForm>
        </ModalBackground>
      );
    }
  }
}

const ReviewsButton = styled(Button)`
  margin-top: 0.7rem;
  margin-right: 0.7rem;
`;

const ReviewForm = styled(Tile)`
  height: 90%;
  width: 50%;
  margin: 2% 25%;
  padding: 1em 5%;
  border: solid 1px ${Palette.borderGrey};
  border-radius: 1px;
  overflow: scroll;
`;

const Title = styled(Italic)`
  display: block;
  font-size: 2rem;
`;

const Subtitle = styled(Italic)`
  display: block;
  margin-top: -2rem;
  margin-left: 2rem;
  margin-bottom: 2rem;
  font-size: 1.25rem;
  color: ${Palette.lowPriorityText};
`;

const Form = styled.form`
  margin-left: 1rem;
`;

const Heading = styled(Italic)`
  display: block;
  margin: 0.5rem -1rem;

`;

const Asterisk = styled.span`
  color: ${Palette.primary};
  font-size: 1.7rem;
`;

const RadioLabel = styled.label`
  margin-right: 4rem;
  position: relative;
`;

const AddSummary = styled.textarea`
  width: 75%;
  length: 2.5%;
  padding-left: 2%;
  color: hsl(0, 0%, 55%);
  border: 1px solid ${Palette.borderGrey};
`;

const AddBody = styled.textarea`
  padding-left: 2%;
  color: hsl(0, 0%, 55%);
  border: 1px solid ${Palette.borderGrey};
  width: 75%;
  height: 5%;
`;

const Upload = styled(Button)`
  background-color: white;
  font-size: 1.1rem;
  &:hover {
    background-color: hsl(0, 0%, 95%);
  }
`;

const Sidenote = styled(Italic)`
  font-size: 1.25rem;
  margin-top: -2rem;
  margin-bottom: 2rem;
  color: ${Palette.lowPriorityText};
`;

const Padding = styled.div`
  height: 0.25rem;
`;

AddReviewModal.propTypes = {
  productName: PropTypes.string,
  productCharacteristics: PropTypes.array
};

export default AddReviewModal;
