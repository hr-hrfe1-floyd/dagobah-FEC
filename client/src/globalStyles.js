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
  borderGrey: '#f2f2f2',
  thumbnailBorder: '#f0f0f5',
  modalBackground: 'hsla(0, 0%, 40%, 75%)'
};

//Note: this is a google font, linked in dist/index.html
const FontsPreset = {
  primary: 'Playfair Display, serif',
  original: 'Garamond, Helvetica, Arial'
};

//NOTE: an rem here will represent 16px. If html's font-size were set to 62.5% (10px), each rem would be 10px, and 1.6rem would be 16px
const GlobalPreset = createGlobalStyle`
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0 10%;
    color: ${PalettePreset.black};
    background-color: ${PalettePreset.background};
    font-family: ${FontsPreset.original};
    font-size: 170%;
  }

  a {
    text-decoration: none;
  }
`;

const TilePreset = styled.div`
  background-color: ${PalettePreset.foreground};
  border: solid 1px ${PalettePreset.borderGrey};
`;

//different font maybe?
const ModuleHeaderPreset = styled.h3`
  font-size: 2rem;
  margin-left: 3%;
  padding: 0.5rem 0;
  text-decoration: underline 2px ${PalettePreset.lowPriority};
`;

//NOTE: font not finalized, we may wish to use an alt to Garamont so using <Italic> rather than manually setting font-style may save you future reworking
const ItalicPreset = styled.span`
  font-style: italic;
`;

const ClickableTextPreset = styled.span`
  cursor: pointer;
  text-decoration: underline;
  font-size: 1.45rem;
  color: ${PalettePreset.black};
`;
//ALT more salient red clickable color: hsl(0, 100%, 50%);

const LowPriorityTextPreset = styled.span`
  font-size: 1.2rem;
  font-style: italic;
  color: ${PalettePreset.lowPriority};
`;

const ButtonPreset = styled.button`
  text-transform: uppercase;
  background-color: ${PalettePreset.foreground};
  color: ${PalettePreset.lowPriority};
  border: solid 1px ${PalettePreset.borderGrey};
  height: 4rem;
  padding: 0 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: hsl(0, 0%, 95%);
  }
`;

const DropdownMenuPreset = styled.select`
  text-transform: uppercase;
  background-color: ${PalettePreset.foreground};
  color: ${PalettePreset.lowPriority};
  border: solid 1px ${PalettePreset.borderGrey};
  height: 4rem;
  padding: 0 1.5rem;
`;

const GalleryPreset = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const ThumbnailPreset = styled.img`
  display: inline-block;
  border: 1px solid ${PalettePreset.thumbnailBorder};
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
  color: ${PalettePreset.primary};
  text-decoration: underline;
`;

const SignaturePreset = styled.div`
  @import url('https://FontsPreset.googleapis.com/css2?family=Tangerine&display=swap');
  font-family: Tangerine, cursive;
  display: inline-block;
  font-size: 2rem;
  color: ${PalettePreset.primary};
`;

const ModalBackgroundPreset = styled.div`
  background-color: ${PalettePreset.modalBackground};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
`;

const FormTextInputPreset = styled.input`
  font-family: Garamond, Helvetica, Arial;
  width: 33%;
  padding: 10px 10px;
  margin: 8px 0;
`;

const TextAreaPreset = styled.textarea`
  font-family: Garamond, Helvetica, Arial;
  resize: none;
  padding: 10px 15px;
  color: ${PalettePreset.lowPriority};
  border: 1px solid ${PalettePreset.borderGrey};
`;

const GridLabelPreset = styled.label`
  grid-area: ${props => props.gridArea ? props.gridArea : ''};
  grid-row: span 1;
`;

export const GlobalStyle = GlobalPreset;
export const Tile = TilePreset;
export const ModuleHeader = ModuleHeaderPreset;
export const ClickableText = ClickableTextPreset;
export const LowPriorityText = LowPriorityTextPreset;
export const Button = ButtonPreset;
export const DropdownMenu = DropdownMenuPreset;
export const Thumbnail = ThumbnailPreset;
export const Gallery = GalleryPreset;
export const Helpful = HelpfulPreset;
export const HelpfulYes = HelpfulYesPreset;
export const Signature = SignaturePreset;
export const Palette = PalettePreset;
export const Italic = ItalicPreset;
export const ModalBackground = ModalBackgroundPreset;
export const Fonts = FontsPreset;
export const FormTextInput = FormTextInputPreset;
export const TextArea = TextAreaPreset;
export const GridLabel = GridLabelPreset;

