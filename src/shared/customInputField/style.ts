import styled from "styled-components";
import { screenSizes } from "../../styles/theme";

export const InputField = styled.input`
    // border-radius: 20px;
    border-radius: 20px 0 0 20px;
    border: 1px solid ${(props: any) => props.theme.gray2} !important;
    height: 72px;
    text-align: center;
    font-family: TTNormsProExtraBold;
    font-size: 24px;
    min-width: 20em;
    color: ${(props: any) =>  props.theme.gray4};
    @media (max-width: ${screenSizes.M}px) {
        height: 50px;
        font-size: 30px;
        min-width: 7.5em;
        max-width: 55vw;
    }
    :focus{
        outline: none;
    }
`