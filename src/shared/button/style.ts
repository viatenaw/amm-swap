import styled, { css, keyframes } from "styled-components";

import { screenSizes } from "../../styles/theme"

const animateLoader = keyframes`
  from {transform : rotate(0deg)}
  to {transform : rotate(360deg)}
`


// here in the svg you can add the svg according and can animate 
const svgCSS = css`
    font-size : 26px;
    animation : ${animateLoader} linear 2s infinite;
`
const buttonStyles = css`
  outline: none;
  border-radius: 2px;
  min-height : 45px;
  min-width: 120px;
  color: rgb(0 0 0 / 90%);
  border: 1px solid rgb(0 0 0 / 90%);
  font-size: 1em;
  cursor: pointer;
  transition: all linear 0.3s;
  background-color: ${(props: any) => props.theme.white};
  font-family: TTNormsProMedium;
  :hover,
  :focus {
    box-shadow: 0px 0px 5px rgb(0 0 0 / 90%);
  }
  svg {
      ${svgCSS}
  }
  @media (max-width: ${screenSizes.M}px) {
    font-size: 16px;
  }
`;
const error = css`
  background: red;
  color: white;
  transition: all linear 0.3s;
  border: 1px solid red;
  :hover,
  :focus {
    box-shadow: 0px 0px 5px red;
  }
`;
const success = css`
  background: green;
  color: white;
  transition: all linear 0.3s;
  border: 1px solid green;
  :hover,
  :focus {
    box-shadow: 0px 0px 5px green;
  }
`;
const warning = css`
  background: ${(props: any) => props.theme.error};
  color: black;
  transition: all linear 0.3s;
  border: 1px solid ${(props: any) => props.theme.error};
  font-size: 12px;
  :hover,
  :focus {
    box-shadow: 0px 0px 5px ${(props: any) => props.theme.error};
  }

  :disabled{
    color: ${(props: any) => props.theme.disabledText};
    pointer-events : none;
    cursor : not-allowed;
    background: ${(props: any) => props.theme.disabled};
  }

  min-width: 5em;
  min-height: 3em;
  color: ${(props: any) => props.theme.white};
`;

const filledButtonMedium = css`
  background: ${(props: any) => props.theme.primaryText};
  border-radius: 8px;
  color: ${(props: any) => props.theme.secondary};
  font-size: 16px;
  transition: all linear 0.3s;
  width: 100%;

  :disabled{
    color: ${(props: any) => props.theme.disabledText};
    pointer-events : none;
    cursor : not-allowed;
    background: ${(props: any) => props.theme.disabled};
  }

  border: none;
  min-width: 200px;
  max-width: 200px;
  min-height: 40px;
  height: 40px;
`;

const walletButton = css`
  background: #e6e6e8;
  border-radius: 8px;
  color: #0b142680;
  transition: all linear 0.3s;
  :hover,
  :focus {
    background: #bfbfbf;
  }
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 8px 0px;
  :disabled{
    color: ${(props: any) => props.theme.disabledText};
    pointer-events : none;
    cursor : not-allowed;
    background: ${(props: any) => props.theme.disabled};
  }
  border: none;
  max-width: 200px;
  min-width: 200px;
  min-height: 40px;
  height: 40px;
  font-size: 16px;
`;
const filledButton = css`
  background: ${(props: any) => props.theme.primaryText};
  border-radius: 8px;
  color: #f5f6fa;
  font-size: 18px;
  transition: all linear 0.3s;
  width: 100%;
  :hover,
  :focus {
    box-shadow: 0px 0px 5px inherit;
  };

  :disabled{
    color: ${(props: any) => props.theme.disabledText};
    pointer-events : none;
    cursor : not-allowed;
    background: ${(props: any) => props.theme.disabled};
  }
  border: none;
  @media (max-width: ${screenSizes.M}px) {
    font-size: 16px;
  }
`;

const filledButtonSmall = css`
  background: ${(props: any) => props.theme.primaryText};
  border-radius: 5px;
  color: ${(props: any) => props.theme.secondary};
  font-size: 12px;
  transition: all linear 0.3s;
  width: 100%;
  :hover,
  :focus {
    box-shadow: 0px 0px 5px yellow;
  };

  :disabled{
    color: ${(props: any) => props.theme.disabledText};
    pointer-events : none;
    cursor : not-allowed;
    background: ${(props: any) => props.theme.disabled};
  }
  border: none;
  min-width: 2em;
  min-height: 1.5em;
  width: 6em;
`;

const tileButton = css`
  border-radius: 10px;
  color: ${(props: any) => props.theme.secondary};
  font-size: 14px;
  transition: all linear 0.3s;
  width: 100%;
  :hover,
  :focus {
    box-shadow: 0px 0px 5px yellow;
  };
  border: none;
  min-width: 3em;
  min-height: 1.5em;
  padding: 5px 12px;
  font-family: TTNormsProMedium;
`;


const filledButtonNM = css`
  background: ${(props: any) => props.theme.primaryText};
  border-radius: 5px;
  color: ${(props: any) => props.theme.secondary};
  font-size: 18px;
  transition: all linear 0.3s;
  width: 100%;
  :hover,
  :focus {
    box-shadow: 0px 0px 5px #1199fa;
  };

  :disabled{
    color: ${(props: any) => props.theme.disabledText};
    pointer-events : none;
    cursor : not-allowed;
    background: ${(props: any) => props.theme.disabled};
  }
  
  border: none;
`;

const avatarButton = css`
  background: ${(props: any) => props.theme.primaryText};
  border-radius: 5px;
  color: ${(props: any) => props.theme.secondary};
  font-size: 18px;
  transition: all linear 0.3s;
  width: 100%;
  :hover,
  :focus {
    box-shadow: 0px 0px 5px yellow;
  };
  
  border: none;
  width: 5em;
  position: relative;
  bottom: 3em;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: ${screenSizes.M}px) {
    font-size: 18px;
    bottom: 4em;
  }

  :disabled{
    color: ${(props: any) => props.theme.disabledText};
    pointer-events : none;
    cursor : not-allowed;
    background: ${(props: any) => props.theme.disabled};
  }
`;

const borderButtonDarkText = css`
  background: none;
  border-radius: 5px;
  color: ${(props: any) => props.theme.secondary};
  border: 1px solid ${(props: any) => props.theme.secondary};
  font-size: 18px;
  transition: all linear 0.3s;
  width: 100%;
  :hover,
  :focus {
    box-shadow: 0px 0px 5px yellow;
  };

  :disabled{
    color: ${(props: any) => props.theme.disabledText};
    pointer-events : none;
    cursor : not-allowed;
    background: ${(props: any) => props.theme.disabled};
  }
  
  max-width: 5em;
`;

const borderButton = css`
  background: none;
  border-radius: 5px;
  color: ${(props: any) => props.theme.secondaryText};
  border: 1px solid ${(props: any) => props.theme.white};
  font-size: 18px;
  transition: all linear 0.3s;
  width: 100%;

  :disabled{
    color: ${(props: any) => props.theme.disabledText};
    pointer-events : none;
    cursor : not-allowed;
    background: ${(props: any) => props.theme.disabled};
  }

`;

const borderButtonMedium = css`
  background: none;
  border-radius: 5px;
  color: ${(props: any) => props.theme.secondaryText};
  border: 1px solid ${(props: any) => props.theme.white};
  font-size: 18px;
  transition: all linear 0.3s;
  min-width: 2em;
  min-height: 1.5em;
  width: 6em;
  height: 2em;
`;
const disabled = css`
  pointer-events : none;
  cursor : not-allowed;
  opacity: 0.4;
`

export const ButtonWrapper = styled.button<any>`
  ${buttonStyles}
  ${(props: any) =>
    (props.btnType == "error" && error) ||
    (props.btnType == "success" && success) ||
    (props.btnType == "warning" && warning) ||
    (props.btnType == 'disabled' && disabled) ||
    (props.btnType == 'filledButton' && filledButton) ||
    (props.btnType == 'borderButton' && borderButton) ||
    (props.btnType == 'filledButtonNM' && filledButtonNM) ||
    (props.btnType == 'walletButton' && walletButton) ||
    (props.btnType == 'borderButtonDarkText' && borderButtonDarkText) ||
    (props.btnType == 'avatarButton' && avatarButton) ||
    (props.btnType == 'filledButtonSmall' && filledButtonSmall) ||
    (props.btnType == 'borderButtonMedium' && borderButtonMedium) ||
    (props.btnType == 'filledButtonMedium' && filledButtonMedium) ||
    (props.btnType == 'tileButton' && tileButton)
  };
  color: ${(props: any) => props.customColor};
  background: ${(props: any) => props.customBgColor};
  width: ${(props: any) => props.customWidth};
  border-radius: ${(props: any) => props.bRadius};
  border: ${(props: any) => props.custBorder};
  font-size: ${(props: any) =>  props.fSize};
  padding: ${(props: any) => props.customPadding};
  @media (max-width: ${screenSizes.M}px) {
    font-size: ${(props: any) =>  props.fSizeMobile};
  }
  &:hover {
    cursor: ${(props: any) => props.disabled ? 'not-allowed' : props.tile ? 'auto' : 'pointer'};
  }
`;
export const ButtonAlignment = styled.div<any>`
  display: flex;
  align-items: ${(props: any) =>
    (props.align == "center" && "center") ||
    (props.align == "start" && "flex-start") ||
    (props.align == "end" && "flex-end")};
  justify-content: ${(props: any) => 
    (props.justify) ||
    "center"
  };
  width: ${(props: any) => props.wrapperWidth};
`;
