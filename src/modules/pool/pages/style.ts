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
  text-align: center;
  @media (max-width: ${screenSizes.M}px) {
    font-size: ${(props: any) => props.fSizeMobile || '30px'};
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
    font-size: 14px;
  }
  
  @media (max-width: ${screenSizes.XXS}px) {
    font-size: 14px;
  }
`

export const AddActionArea = styled.div`
    display: flex;
    flex-flow: column;
    gap: 2em;
    align-items: center;
    background: ${(props: any) => props.theme.primary};
    box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
    border-radius: 30px;
    padding: 2em 1em;
    @media (max-width: ${screenSizes.M}px) {
        padding: 2em 1em;
    }
    .sqBoxesContainer{
      display: flex;
      gap: 1em;
      @media (max-width: ${screenSizes.M}px) {
        gap: .5em;
      }
    }
    .approvContainer{
      display: flex;
      gap: 1em;
    }
    .textContainer{
      display: flex;
      flex-direction: column;
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

export const RemoveActionArea = styled.div`
    display: flex;
    flex-flow: column;
    gap: 2em;
    align-items: center;
    background: ${(props: any) => props.theme.primary};
    box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
    border-radius: 30px;
    padding: 2em 1em;
    @media (max-width: ${screenSizes.M}px) {
        padding: 2em 1em;
    }
    .sqBoxesContainer{
      display: flex;
      gap: 1em;
      @media (max-width: ${screenSizes.M}px) {
        gap: .5em;
      }
    }
    .approvContainer{
      display: flex;
      gap: 1em;
    }
    .textContainer{
      display: flex;
      flex-direction: column;
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
export const BtnsContainer = styled.div<any>`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 1em;
`
export const SquareBox = styled.div<any>`
    padding: 1em;
    font-weight:bold;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props: any) => props.selected ? "#8a8a8a" : "#eaeaea"};
    color: ${(props: any) => props.selected ? "#fff" : "#77797a"};
    cursor: pointer;
    border-radius: 20px;
    opacity: .5;
    min-width: 75px;
    @media (max-width: ${screenSizes.M}px) {
        min-width: 66px;
        max-width: 66px;
    }
    :hover,
    focus {
        box-shadow: 0px 0px 5px rgb(0 0 0 / 90%);
    }
`
export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: ${screenSizes.M}px) {
        gap: 1em;
    }
    span {
      margin: .5em 0;
    }
`

export const InfoHeadContainer = styled.div`
    display: flex;
    padding: .75em 1em;
`
export const InfoBodyContainer = styled.div`
    display: flex;
    padding: 1em 0;
    justify-content: space-around;
    border-radius: 20px;
    border: 1px solid rgb(247, 248, 250);
    background-color: rgb(255, 255, 255);
`
export const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`
export const InfoContainer = styled.div`
    display: flex;
    border-radius: 20px;
    background-color: rgb(237, 238, 242);
    width: 100%;
    flex-direction: column;
`
export const InputBox = styled.div`
    display: flex;
`
export const InputCoin = styled.div`
  display: flex;
  align-items: center;
  border-radius: 0 20px 20px 0;
  border: 1px solid ${(props: any) => props.theme.gray2};
  border-left-width: 0px;
  padding: 0 10px;
  font-weight: 700;
  color: ${(props: any) => props.theme.gray3};
`
