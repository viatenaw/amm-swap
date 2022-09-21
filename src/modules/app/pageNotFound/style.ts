
import styled from 'styled-components';
import { screenSizes } from '../../../styles/theme';

export const NotFoundContainer = styled.div`
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
` 
export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    img {
        @media (max-width: ${screenSizes.M}px) {
            max-width: 285px;
        }
    }
` 
export const SecondaryText = styled.p<any>`
  margin: 0;
  font-size: ${(props: any) =>  props.fSize ? props.fSize : '16px'};
  color: #00000033;
  font-weight: ${(props: any) =>  props.fWeight ? props.fWeight : '800'};
  font-family: ${(props: any) =>  props.fFamily};
  padding: ${(props: any) =>  props.customPadding};

  @media (max-width: ${screenSizes.M}px) {
    font-size: ${(props: any) =>  props.fSizeMobile ? props.fSizeMobile : '16px'};
  }
`