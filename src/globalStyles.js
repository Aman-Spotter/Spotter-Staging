import PhoneInput from 'react-phone-number-input/input';
import { Pencil, QuestionCircle, Trash } from '@styled-icons/bootstrap';
import { TrashRestore } from '@styled-icons/fa-solid';
import styled, { createGlobalStyle } from 'styled-components';

export const fontSizePercentile = (val, percentage = 0.5) => {
  const num = val?.match(/\d+/g);
  if (num >= 15) {
    const decreasedVal = `${num * percentage}px`;
    return decreasedVal;
  }
  return val;
};
const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
 } 



`;
export const Main = styled.div`
  flex: 1;
  background-color: rgb(13, 30, 45);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'DM Sans', sans-serif;
`;

export const MainContainer = styled.div`
  width: 100%;
  padding: ${({ padding }) => padding || '64px 0px'};
  margin: ${({ margin }) => margin || '0px'};
  font-family: 'DM Sans', sans-serif;
  background: ${({ bgImg, gradient, bgColor }) =>
    bgImg && gradient
      ? `${gradient}, url(${bgImg}) center center no-repeat`
      : bgImg
      ? `url(${bgImg}) center center no-repeat`
      : bgColor || 'none'};
  background-size: cover;
  position: relative;
  @media screen and (max-width: 768px) {
    background-position: ${({ topBg }) => (topBg ? '55% -330px' : 'center center')};
    background-size: ${({ topBg }) => (topBg ? 'auto 136%' : 'cover')};
    padding: ${({ smPadding }) => smPadding || '64px 24px'};
  }

  @media screen and (min-width: 1500px) {
    background-position: ${({ homeBg, topBg }) =>
      homeBg ? 'center top' : topBg ? 'right center' : 'center center'};
    padding: ${({ lgPadding }) => lgPadding || '64px 24px'};
    background-size: ${({ topBg, homeBg }) => (topBg ? '119% auto' : homeBg ? 'cover' : 'cover')};
  }
`;

export const ImgContainer = styled.div`
  width: 100%;
  height: 0;
  padding: ${({ padding }) => padding || '0px'};
  margin: ${({ margin }) => margin || '0px'};
  font-family: 'Open sans semibold';
  background: ${({ bgImg, gradient, bgColor }) =>
    bgImg && gradient
      ? `${gradient}, url(${bgImg}) center center no-repeat`
      : bgImg
      ? `url(${bgImg}) center center no-repeat`
      : bgColor || 'none'};
  background-size: 100% auto;
  positon: relative;
`;

export const SectionWarpper = styled.div`
  width: 100%;
  max-width: 888px;
  margin: 0px auto;
`;
export const Button = styled.button`
  border-radius: ${({ borderRadius }) => borderRadius || '30px'};
  background: ${(bg) => bg || '#000000'};
  white-space: nowrap;
  padding: ${({ padding }) => padding || '10px 10px'};
  margin: ${({ margin }) => margin || '0px'};
  color: ${({ color }) => color || '#000000'};
  max-width: ${({ maxWidth }) => maxWidth || '100%'};
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '14px')};
  align-self: ${({ alignSelf }) => alignSelf || 'unset'};
  outline: none;
  border: none;

  font-weight: 600;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background-color: ${({ hvBg }) => hvBg || '#ffffff'};
  }

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: ${({ fullWidth }) => (fullWidth ? 'column' : 'row')};
  padding: ${({ padding }) => padding || '0px'};
  justify-content: ${({ justifyContent }) => justifyContent || 'space-between'};
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
  margin: ${({ noMargin }) => (noMargin ? '0px' : '30px auto')};
  column-gap: ${({ columnGap }) => columnGap || '0px'};
  @media screen and (max-width: 768px) {
    flex-direction: ${({ noMobileBreak, fullWidth }) =>
      noMobileBreak ? (fullWidth ? 'column' : 'row') : 'column'};
    padding: 0px;
    margin: ${({ noMargin, margin }) => (noMargin ? '0px' : margin || '30px auto')};
  }
  @media screen and (max-width: 450px) {
    flex-direction: column;
  }
`;

export const Img = styled.img`
  max-width: ${({ maxWidth }) => maxWidth || '100%'};
  margin-left: ${({ marginLeft }) => marginLeft || 'unset'};
  margin-right: ${({ marginRight }) => marginRight || 'unset'};
  margin-top: ${({ marginTop }) => marginTop || '20px'};
  width: ${({ width }) => (width && `${width}px`) || '100%'};
  display: ${({ mobile }) => (mobile === true ? 'none' : 'block')};
  border-radius: ${({ borderRadius }) => borderRadius || '0px'};
  @media screen and (max-width: 1024px) {
    display: ${({ mobile }) =>
      mobile === true ? 'block' : mobile === undefined ? 'block' : 'none'};
  }
`;

export const Column = styled.div`
  display: flex;
  max-width: ${({ colNum }) => `${100 * (colNum / 10)}%`};
  flex-basis: ${({ colNum }) => `${100 * (colNum / 10)}%`};
  padding: ${({ padding }) => padding || '0px'};
  border-top: ${({ borderTop }) => (borderTop ? `1px solid rgb(226, 226, 226)` : `none`)};
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  text-align: ${({ textAlgin }) => textAlgin || `left`};
  margin-right: ${({ last, gap }) => (last ? `0px` : gap || `5%`)};
  column-gap: ${({ columnGap }) => columnGap || '0px'};
  &:last-child: {
    margin-right: 0%;
  }
  align-items: ${({ reverseHorizontally, alignItems }) =>
    alignItems || (reverseHorizontally ? 'flex-end' : 'flex-start')};
  justify-content: ${({ justifyContent }) => justifyContent || 'unset'};

  @media screen and (max-width: 1200px) and (min-width: 770px) {
    column-gap: ${({ columnGap }) => (columnGap === '30px' ? '20px' : columnGap || '0px')};
    ${({ flexDirection }) =>
      flexDirection === 'row' &&
      `
      flex-wrap: wrap;
      gap: 10px;
    `}
  }

  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    flex-basis: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: ${({ marginBottom }) => marginBottom || `30px`};
    text-align: ${({ textAlgin }) => textAlgin || `center`};
    align-items: center;
    margin-right: 0%;
  }
  @media screen and (max-width: 450px) {
    &:not(:last-child) {
      margin-bottom: 0;
    }
  }
`;

export const Heading = styled.h1`
  text-align: ${({ textAlign }) => textAlign || 'left'};
  line-height: ${({ lineHeight }) => lineHeight || '77px'};
  font-size: ${({ fontSize }) => fontSize || '77px'};
  font-weight: 700;
  margin-bottom: ${({ marginBottom }) => marginBottom || '10px'};
  margin-top: ${({ marginTop }) => marginTop || '0px'};
  color: ${({ color }) => color || '#1c2237'};
  font-family: 'Open sans semibold';
  @media screen and (max-width: 768px) {
    font-size: ${({ fontSize }) =>
      fontSize ? fontSizePercentile(fontSize) : fontSizePercentile('80px')};
    line-height: ${({ lineHeight }) =>
      lineHeight ? fontSizePercentile(lineHeight) : fontSizePercentile('80px')};
    text-align: ${({ mobileAlign }) => mobileAlign || 'center'};
  }
  &#stepone {
    display: flex;
    column-gap: 15px;
    @media screen and (max-width: 768px) {
      justify-content: center;
    }
    @media screen and (max-width: 450px) {
      flex-direction: column;
      margin-bottom: 50px;
    }
  }
`;

export const SubHeading = styled.p`
  margin: 0;
  font-size: ${({ fontSize }) => fontSize || '36px'};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  line-height: ${({ lineHeight }) => lineHeight || '36px'};
  font-weight: ${({ fontWeight }) => fontWeight || '400'};
  margin-bottom: ${({ marginBottom }) => marginBottom || '10px'};
  margin-top: ${({ marginTop }) => marginTop || '0px'};
  color: ${({ color }) => color || '#f5f6f8'};
  font-family: 'DM Sans', sans-serif;
  @media screen and (max-width: 768px) {
    font-size: ${({ fontSize }) =>
      fontSize ? fontSizePercentile(fontSize) : fontSizePercentile('36px')};
    line-height: ${({ lineHeight }) =>
      lineHeight ? fontSizePercentile(lineHeight) : fontSizePercentile('36px')};
    text-align: ${({ mobileAlign }) => mobileAlign || 'center'};
  }
  width: 100%;

  span {
    color: ${({ theme }) => theme.highlightColor};
  }
`;

export const SemiSubHeading = styled.h3`
  margin: 0;
  font-size: 18px;
  text-align: left;
  line-height: 24px;
  font-weight: normal;
  font-weight: 700;
  padding: ${({ padding }) => padding || '0px 0px 20px 0px'};
  color: ${({ lightText }) => (lightText ? '#f7f8fa' : '#1c2237')};
`;

export const CenteredWarppper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HR = styled.div`
  margin-top: 50px;
  border-bottom: 1px solid #000000;
`;

export const Highlight = styled.span`
  color: #ffac12;
`;

export const GraidentLine = styled.div`
  width: ${({ width }) => width || '170px'};
  height: ${({ height }) => height || '5px'};
  broder-radius: 2px;
  background: ${({ bg }) => bg || `linear-gradient(to right, #2F6F89 , #000000)`};
  border-radius: 2px;
  margin: ${({ margin }) => margin || '0px auto'};
`;

export const DeleteIcon = styled(Trash)`
  color: ${(props) => props.theme.danger};
  cursor: pointer;
`;

export const RestoreIcon = styled(TrashRestore)`
  color: ${(props) => props.theme.danger};
  cursor: pointer;
`;

export const EditIcon = styled(Pencil)`
  color: ${(props) => props.theme.primaryBellColor};
  cursor: pointer;
  margin: ${({ margin }) => margin || '0px'};
`;

export const HelpIcon = styled(QuestionCircle)`
  margin-left: 5px;
  font-size: 14px;
  width: 13px;
  height: 13px;
  color: ${({ theme }) => theme.highlightColor};
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  margin: 10px 0;
`;

export const FormContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 550px;
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : '100%')};
  height: 100%;
`;

export const Label = styled.span`
  margin-bottom: 10px;
  font-size: 14px;
  color: ${(props) => (props.color ? props.color : 'white')};
`;

export const Tip = styled.span`
  margin-left: 5px;
  font-size: 14px;
  color: ${({ theme }) => theme.highlightColor};
  cursor: pointer;
`;

export const Error = styled.span`
  font-family: 'Open Sans Regular';
  font-size: 12px;
  color: ${(props) => props.theme.errorTextColor};
  line-height: 14px;
  margin-top: 4px;
`;

export const Input = styled.input`
  font-family: 'Open Sans Regular';
  font-size: 14px;
  color: ${(props) => props.theme.primaryTextColor};
  width: 100%;
  height: 38px;
  padding: 0px 10px;
  outline: none;
  box-shadow: none;
  border: solid 1px ${(props) => props.theme.primaryBorderColor};
  border-radius: 5px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background-color: transparent;
  &:disabled {
    color: gray;
  }
`;

export const PhoneFormInput = styled(PhoneInput)`
  padding: 10px 20px 10px 10px;
  border-radius: 5px;
  margin-right: 10px;
  outline: none;
  font-size: 14px;
  background-color: transparent;
  border: solid 1px ${(props) => props.theme.primaryBorderColor};
  border-radius: 5px;
  color: white;
  width: 100%;

  &::placeholder {
    color: #6b6b6c;
  }

  &:disabled {
    color: gray;
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    margin: 0 0 16px 0;
  }
`;

export const TooltipArrow = styled.div`
  height: 1rem;
  position: absolute;
  width: 1rem;
  pointer-events: none;

  ::before {
    border-style: solid;
    content: '';
    display: block;
    height: 0;
    margin: auto;
    width: 0;
  }

  ::after {
    border-style: solid;
    content: '';
    display: block;
    height: 0;
    margin: auto;
    position: absolute;
    width: 0;
  }
`;

export const TooltipContainer = styled.div`
  background-color: ${(props) => props.tooltipBackground};
  border-radius: 3px;
  border: 1px solid ${(props) => props.tooltipBorder};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  color: ${(props) => props.tooltipColor};
  display: flex;
  flex-direction: column;
  padding: 0.4rem;
  transition: opacity 0.3s;
  z-index: 9999;
  font-size: 13px;

  &[data-popper-interactive='false'] {
    pointer-events: none;
  }

  &[data-popper-placement*='bottom'] ${TooltipArrow} {
    left: 0;
    margin-top: -0.4rem;
    top: 0;
  }

  &[data-popper-placement*='bottom'] ${TooltipArrow}::before {
    border-color: transparent transparent ${(props) => props.tooltipBorder} transparent;
    border-width: 0 0.5rem 0.4rem 0.5rem;
    position: absolute;
    top: -1px;
  }

  &[data-popper-placement*='bottom'] ${TooltipArrow}::after {
    border-color: transparent transparent ${(props) => props.tooltipBackground} transparent;
    border-width: 0 0.5rem 0.4rem 0.5rem;
  }

  &[data-popper-placement*='top'] ${TooltipArrow} {
    bottom: 0;
    left: 0;
    margin-bottom: -1rem;
  }

  &[data-popper-placement*='top'] ${TooltipArrow}::before {
    border-color: ${(props) => props.tooltipBorder} transparent transparent transparent;
    border-width: 0.4rem 0.5rem 0 0.5rem;
    position: absolute;
    top: 1px;
  }

  &[data-popper-placement*='top'] ${TooltipArrow}::after {
    border-color: ${(props) => props.tooltipBackground} transparent transparent transparent;
    border-width: 0.4rem 0.5rem 0 0.5rem;
  }

  &[data-popper-placement*='right'] ${TooltipArrow} {
    left: 0;
    margin-left: -0.7rem;
  }

  &[data-popper-placement*='right'] ${TooltipArrow}::before {
    border-color: ${(props) => props.tooltipBorder} transparent transparent;
    border-width: 0.5rem 0.4rem 0.5rem 0;
  }

  &[data-popper-placement*='right'] ${TooltipArrow}::after {
    border-color: transparent ${(props) => props.tooltipBackground} transparent transparent;
    border-width: 0.5rem 0.4rem 0.5rem 0;
    left: 6px;
    top: 0;
  }

  &[data-popper-placement*='left'] ${TooltipArrow} {
    margin-right: -0.7rem;
    right: 0;
  }

  &[data-popper-placement*='left'] ${TooltipArrow}::after {
    border-color: transparent transparent transparent
      ${(props) => props.tooltipBackground || '#fff'};
    border-width: 0.5rem 0 0.5rem 0.4em;
    left: 3px;
    top: 0;
  }

  &[data-popper-placement*='left'] ${TooltipArrow}::before {
    border-color: transparent transparent transparent ${(props) => props.tooltipBorder};
    border-width: 0.5rem 0 0.5rem 0.4em;
  }
`;

TooltipContainer.defaultProps = {
  tooltipBackground: '#fff',
  tooltipBorder: '#c0c0c0',
  tooltipColor: '#000',
};

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  padding-right: 50px;
  padding-left: 50px;
  background-color: rgb(13, 30, 45);
  position: relative;

  @media screen and (max-width: ${({ breakPoint }) => breakPoint || '991px'}) {
    padding: ${({ padding }) => padding || '30px 30px'};
  }

  ${'' /* for carrier page only */}
  @media screen and (max-width: 768px) {
    height: ${({ height }) => height || 'unset'};
  }
`;

export default GlobalStyle;
