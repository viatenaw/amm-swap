import { createGlobalStyle, css } from 'styled-components'
import { rgba } from 'polished'

import { gapSizes, screenSizes } from './theme'

import TTNormsProRegular from '../assets/fonts/tt-norms-pro-cufonfonts/TTNormsPro-Regular.ttf'
import TTNormsProExtraBold from '../assets/fonts/tt-norms-pro-cufonfonts/TTNormsPro-ExtraBold.ttf'
import TTNormsProBold from '../assets/fonts/tt-norms-pro-cufonfonts/TTNormsPro-Bold.ttf'
import TTNormsProMedium from '../assets/fonts/tt-norms-pro-cufonfonts/TTNormsPro-Medium.ttf'
import IBMPlexSansSemiBold from '../assets/fonts/IBM_Plex_Sans/IBMPlexSans-SemiBold.ttf'

export const LinkStyle = css`
  color: ${(props: any) => props.theme.secondary};
  cursor: pointer;
  font-family: TTNormsProMedium;
`

export const GlobalStyle = createGlobalStyle`
  :root {
    transition: margin 300ms ease-in-out;
    --pageMargin: 80px;
    @media (max-width: ${screenSizes.L}px) {
      --pageMargin: 40px;
    }
    @media (max-width: ${screenSizes.M}px) {
      --pageMargin: 20px;
    }
  }
  @font-face {
    font-family: TTNormsProRegular;
    src: url(${TTNormsProRegular});
  }
  @font-face {
    font-family: TTNormsProExtraBold;
    src: url(${TTNormsProExtraBold});
  }
  @font-face {
    font-family: TTNormsProMedium;
    src: url(${TTNormsProMedium});
  }
  @font-face {
    font-family: TTNormsProBold;
    src: url(${TTNormsProBold});
  }
  @font-face {
    font-family: IBMPlexSansSemiBold;
    src: url(${IBMPlexSansSemiBold});
  }

  h1, h2, h3, h4 {
    margin: 0;
  }
  
 
  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html,
  body {
    font-size: 16px;
    height: 100%;
    scroll-behavior: smooth;
    width: 100%;
  }
  body {
    min-height: 100%;
    margin: 0;
    padding: 0;
    background-color: ${(props: any) => props.theme.secondary};
  }
  *::-webkit-scrollbar {
    width: 12px;
    background-color: ${rgba(81, 111, 119, 0.101961)};
    border-radius: 4px;
  }
  *::-webkit-scrollbar-thumb {
    border: 2px solid transparent;
    background-color: #9CA6AD;
    border-radius: 20px;
    background-clip: content-box;
  }
  #root{
    display: flex;
    flex-flow: column;
    min-height: 100vh;
    max-width: 100%;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    font-family: TTNormsProRegular;
  }
  a{
    font-family: TTNormsProRegular;
    text-decoration: none;
    color: ${(props: any) => props.theme.white};
  }
 
  input:disabled ~ label{
   color: red;
  }
  input[type="checkbox"] {
  -webkit-appearance: radio;
  -moz-appearance: radio;
  -ms-appearance: radio; 
  }
  
  button {
    font-size: 16px;
    margin: 0;
    padding: 8px 12px;
  }
  hr {
    background-color: ${(props: any) => rgba(props.theme.white, 0.2)};
    border: 0;
  }
  a {
    ${LinkStyle};
  }
  a.disabled {
    pointer-events: none;
  }
  svg{
    overflow: visible;
    + span {
      margin-left: ${gapSizes.S};
    }
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }

  html {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; 
  }

  .closingModal {
    display: block !important;
    pointer-events: none;
    inset: 0;
    animation: fade-out 300ms forwards;
  }

  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`
