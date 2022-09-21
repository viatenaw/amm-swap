import styled from "styled-components";
import { screenSizes } from "../../styles/theme";

export const FlexContainer = styled.div`
    display : flex ;
    justify-content : space-between;
    align-items : center;
    flex-flow : row wrap;
    @media (min-width: ${screenSizes.XXL}px) {
        flex-wrap: inherit;
        justify-content: center;
        width: 100%;
        gap: 45em;
    }
`