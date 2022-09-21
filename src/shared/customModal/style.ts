import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5"

import { screenSizes } from "../../styles/theme"

interface ModalBodyProps {
  show: boolean;
}

export const ModelHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  align-items: center;
  p {
    color: #0b142680;
    font-weight: 800;
    font-size: 16px;
    line-height: 29px;
    margin: 0;
    font-family: TTNormsProExtraBold;
  }
  background: #fff;
  border-radius: 20px 20px 0 0;
`;

export const ModalContainer = styled.div<ModalBodyProps>`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  /* background-color:blue; */
  display: ${(props: any) => (props.show ? "block" : "none")};
  z-index: 9999;
  backdrop-filter:blur(5px);
  /* border:1px solid; */
  /* padding:0;
  margin:0 ; */
  overflow:hidden ;
  background: #00000033;
  .modalInputArea{
    padding-left: 25px;
    background: url("https://static.thenounproject.com/png/101791-200.png") no-repeat left;
    padding-right: 25px;
    background: url("https://static.thenounproject.com/png/101791-200.png") no-repeat right;
    background-size: 20px;
  }
`

export const ModalBody = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 25em;
  height: 26em;
  /* overflow: auto; */
  background: #f7f8fa;
  /* backdrop-filter: blur(50px); */
  border-radius: 20px;
  border:1px solid ${(props: any) => props.theme.white};
  box-sizing:border-box;
  z-index:110;
  text-align: center;
  color: #0b142680;
  .modaltextleftaligned{
    font-family: TTNormsProRegular;
    text-align: left;
    font-weight: 700;
    color: ${(props: any) => props.theme.lightGrey};
  } 
  .modalPrimaryText {
    font-weight: 700;
    color: ${(props: any) => props.theme.warning};
  }

  .modalMediumText {
    font-family: TTNormsProMedium;
  }
  .modalSecondaryText {
    font-family: TTNormsProExtraBold;
    font-weight: 800;
    color: ${(props: any) => props.theme.gray3};
    font-size: 18px;
  }
  .modalNote {
    color: ${(props: any) => props.theme.gray};
    font-size: 14px;
    margin-bottom: 2em;
    text-align: start;
    font-family: TTNormsProMedium;
  }
  .modalActionBtnContainer{
    display: flex;
    padding-top: 1em;
    justify-content: center;
    align-items: center;
    gap: 1em;
  }
  .anchorText{
    color: ${(props: any) => props.theme.primary};
    font-family: TTNormsProBold;
  }
  .anchorText:hover{
    cursor: pointer;
  }
  .walletconnectcontainer{
    height: 8em;
    display: flex;
    justify-content:space-around;
    align-items: center;
    flex-direction:column;
    position:relative;
    overflow:hidden;
    .metamask {
      border: 1px solid ${(props: any) => props.theme.gray2};
      border-radius:5px;
      height: 40%;
      width: 100%;
      display:flex;
      justify-content:flex-around;
      align-items:center;
      cursor:pointer;

      img {
        height: 90%;
      }

      span {
        font-family: TTNormsProBold;
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        width: 100%;
      }
    }

    .walletConnect {
      border: 1px solid ${(props: any) => props.theme.gray2};
      border-radius: 5px;
      height: 40%;
      width: 100%;
      display: flex;
      justify-content: flex-around;
      align-items: center;
      cursor:pointer;

      img {
        height: 90%;
      }

      span {
        font-family: TTNormsProBold;
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        width: 100%;
      }
    }
  }
  
  @media (max-width: ${screenSizes.M}px) {
    width: 90%;
  }

  animation: slide-down 1000ms forwards, fade-in 800ms forwards;

  @keyframes slide-down {
    0% {
      transform: translate(-50%, 50%);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    50% {
      opacity: .5;
    }
    100% {
      opacity: 1;
    }
  }

`;

export const ModalContent = styled.div<any>`
  margin-top: 2em;
  padding: 10px;
  display: inline-block;
  overflow: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 100%;
  // overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  width: 90%;

  
`;

export const ModalContainerHeading = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0;
`;
export const ModalContainerText = styled.p`
  font-size: 16px;
  margin: 0;
`;
export const Close = styled(IoCloseOutline)`
  cursor: pointer;
  font-size: 1.5rem;
  color: ${(props: any) => props.theme.navyHigh};
`;

export const ToastClose = styled.img`
  cursor:pointer
`;