import styled from "styled-components";

import { screenSizes } from "../../../styles/theme";


export const pageContentWidth = '900'

export const PageContainer = styled.div<any>`
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 100%;
    margin-top: 100px;
    transition: all 300ms ease-in-out;
    height: 100%;
    align-items: center;

    `
export const DivContainer = styled.div`
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-flow: column;
    gap: 2em;
    // padding: 0em 8em 2em 1em;
    border-radius: 10px;
    
    @media (max-width: 767px) {
        padding: 1em 1em;
    }
    max-height: 753px;
    max-width: 1200px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 1200px;
    @media (max-width: ${screenSizes.XXL}px) {
        width: 1200px;
    }
    @media (max-width: ${screenSizes.XL}px) {
        width: 1000px;
    }
    @media (max-width: ${screenSizes.L}px) {
        width: 800px;
    }
    @media (max-width: 820px) {
        width: 720px;
    }
    @media (max-width: 767px) {
        background-image: none;
        width: inherit;
    }
    @media (min-width: 767px) {
        height: 753px;
    }
    
`
interface TextProps {
    fSize?: string,
    fWeight?: string,
    customPadding?: string,
    fFamily?: string,
}

export const SecondaryTextL = styled.p<TextProps>`
  margin: 0;
  font-size: ${(props: any) => props.fSize ? props.fSize : '16px'};
  color: #00000033;
  font-family: ${(props: any) => props.fFamily};
  padding: ${(props: any) => props.customPadding};

  @media (max-width: ${screenSizes.M}px) {
    font-size: 25px;
  }
`
export const DarkTextL = styled.p<TextProps>`
  margin: 0;
  font-size: ${(props: any) => props.fSize ? props.fSize : '16px'};
  color: ${(props: any) => props.theme.gray3};
  font-weight: ${(props: any) => props.fWeight ? props.fWeight : '800'};
  align-items: flex-start;
  padding:  ${(props: any) => props.customPadding ? props.customPadding : 0};
  font-family: ${(props: any) => props.fFamily};
  
  @media (max-width: ${screenSizes.M}px) {
    font-size: 30px;
  }
`
export const DarkTextS = styled.p<TextProps>`
  margin: 0;
  font-size: ${(props: any) => props.fSize ? props.fSize : '16px'};
  color: ${(props: any) => props.theme.gray3};
  font-weight: ${(props: any) => props.fWeight ? props.fWeight : '800'};
  align-items: flex-start;
  padding:  ${(props: any) => props.customPadding ? props.customPadding : 0};
  font-family: ${(props: any) => props.fFamily};

  @media (max-width: ${screenSizes.M}px) {
    font-size: 16px;
  }
  
  @media (max-width: ${screenSizes.XXS}px) {
    font-size: 14px;
  }
`

export const SwapActionArea = styled.div`
    display: flex;
    flex-flow: column;
    gap: 2em;
    align-items: center;
    background: ${(props: any) => props.theme.primary};
    border-radius: 10px;
    padding: 2em 1em;
    @media (max-width: ${screenSizes.M}px) {
        padding: 2em 1em;
    }
    animation: slider 1000ms forwards;

    @keyframes slider {
        0% {
          transform: translateY(-25%);
        }
        100% {
          transform: translateY(0%);
        }
    }
`
export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: center;
    @media (max-width: ${screenSizes.M}px) {
        gap: 1em;
    }
    span {
        margin-top: 1em;
    }
`