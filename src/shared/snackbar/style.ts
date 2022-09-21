import styled from "styled-components"
import { IoCloseOutline } from "react-icons/io5"
import { screenSizes } from "../../styles/theme"

// interface SnackbarHeaderProps {
//     show?: boolean
// }

export const SnackbarContainer = styled.div<any>`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
    z-index: 999;
    display: ${(props: any) => props.show ? 'block' : 'none'}
`
interface SnackbarHeaderProps {
    snackColor?: string,
    message?: string
}

export const SnackbarHeader = styled.div<SnackbarHeaderProps>`
    background: ${(props: any) => props.snackColor};
    padding: .5em 1em;
    display: flex;
    justify-content: space-between;
    font-family: TTNormsProExtraBold;
    color: ${(props: any) => props.theme.white};
    @media (max-width: ${screenSizes.M}px) {
        font-size: 14px;
    }
    gap: 2em;
    align-items: center;
`
export const SnackbarBody = styled.div`
    background: ${(props: any) => props.theme.white};
    color: ${(props: any) => props.theme.secondary};
    min-width: 25em;
    height: 10em;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: ${screenSizes.M}px) {
        min-width: 20em;
        height: 5em;
    }
`
export const SnackBodyText = styled.p`
    padding: 0 2em;
    font-family: TTNormsProMedium;
    font-size:20px;
    @media (max-width: ${screenSizes.M}px) {
        font-size: 16px;
    }
`
export const Close = styled(IoCloseOutline) <any>`
  cursor: pointer;
  font-size: 1.5rem;
  color: ${(props: any) => props.theme.white};
`;