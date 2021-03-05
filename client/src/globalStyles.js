import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

//Color Palette:
//Primary/Red: hsl(0, 100%, 60%) //<- used for salient or 'flavorful' elements
//Secondary/Pastel Purple: hsl(270, 80%, 96%) //<- secondary salient text color
//Low-Priority/Grey: hsl(0, 0%, 40%) //<- used for clickable and low-priority text
//Black (Off-Black): hsl(0, 5%, 30%) //<- used for main text, body text defaults to this unless overridden
//Page Background/Red-Tinged Grey: hsl(0, 5%, 30%)
//Page Foreground/Red-Tinged White: hsl(0, 15%, 99%) //<- Tiles of content use this as background-color
//Borders/White-Grey: #f2f2f2

const PalettePreset = {
  primary: 'hsl(0, 100%, 60%)',
  secondary: 'hsl(270, 80%, 96%)',
  lowPriority: 'hsl(0, 0%, 40%)',
  black: 'hsl(0, 5%, 30%)',
  foreground: 'hsl(0, 15%, 99%)',
  background: 'hsl(345, 75%, 99%);',
  borderGrey: '#f2f2f2'
};

//NOTE: an rem here will represent 16px. If html's font-size were set to 62.5% (10px), each rem would be 10px, and 1.6rem would be 16px
const GlobalPreset = createGlobalStyle`
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0 10%;
    color: hsl(0, 5%, 30%);
    background-color: hsl(345, 75%, 99%);
    font-family: Garamond, Helvetica, Arial;
    font-size: 170%;
  }
`;

const TilePreset = styled.div`
  background-color: hsl(0, 15%, 99%);
  border: solid 1px #f2f2f2;
`;

//different font maybe?
const ModuleHeaderPreset = styled.h3`
  font-size: 2rem;
  margin-left: 3%;
  padding: 0.5rem 0;
  text-decoration: underline 2px hsl(0, 0%, 40%);
`;

//NOTE: font not finalized, we may wish to use an alt to Garamont so using <Italic> rather than manually setting font-style may save you future reworking
const ItalicPreset = styled.span`
  font-style: italic;
`;

const ClickableTextPreset = styled.span`
  cursor: pointer;
  text-decoration: underline;
  font-size: 1.45rem;
  color: hsl(0, 0%, 40%);
`;
//ALT more salient red clickable color: hsl(0, 100%, 50%);

const LowPriorityTextPreset = styled.span`
  font-size: 1.2rem;
  font-style: italic;
  color: hsl(0, 0%, 55%);
`;

const ButtonPreset = styled.button`
  text-transform: uppercase;
  background-color: hsl(0, 15%, 99%);
  color: hsl(0, 0%, 40%);
  border: solid 1px #f2f2f2;
  height: 4rem;
  padding: 0 1.5rem;
  cursor: pointer;
`;

const DropdownMenuPreset = styled.select`
  text-transform: uppercase;
  background-color: hsl(0, 15%, 99%);
  color: hsl(0, 0%, 40%);
  border: solid 1px #f2f2f2;
  height: 4rem;
  padding: 0 1.5rem;
`;

const ThumbnailPreset = styled.img`
  display: inline-block;
  border: 1px solid #f0f0f5;
  border-radius: 5px;
  padding: 0.5rem;
  margin-right: 0.5rem;
  width: 10rem;
  height: 10rem;
  cursor: pointer;
`;

const HelpfulPreset = styled.div`
  display: inline;
  font-style: italic;
`;

const HelpfulYesPreset = styled.div`
  display: inline;
  cursor: pointer;
  font-style: normal;
  color: hsl(0, 100%, 50%);
  text-decoration: underline;
`;

const SignaturePreset = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Tangerine&display=swap');
  font-family: Tangerine, cursive;
  display: inline-block;
  font-size: 2rem;
  color: hsl(0, 100%, 60%);
`;

const ModalBackgroundPreset = styled.div`
  background-color: hsla(0, 0%, 40%, 75%);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export const GlobalStyle = GlobalPreset;
export const Tile = TilePreset;
export const ModuleHeader = ModuleHeaderPreset;
export const ClickableText = ClickableTextPreset;
export const LowPriorityText = LowPriorityTextPreset;
export const Button = ButtonPreset;
export const DropdownMenu = DropdownMenuPreset;
export const Thumbnail = ThumbnailPreset;
export const Helpful = HelpfulPreset;
export const HelpfulYes = HelpfulYesPreset;
export const Signature = SignaturePreset;
export const Palette = PalettePreset;
export const Italic = ItalicPreset;
export const ModalBackground = ModalBackgroundPreset;
