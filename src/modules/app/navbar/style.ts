import styled from 'styled-components'
import { HiOutlineMenu } from "react-icons/hi"
import { IoCloseOutline } from "react-icons/io5"
import { screenSizes } from '../../../styles/theme'

export const HeaderContainer = styled.header`
    padding : 10px 30px;
    position : sticky;
    top : 0;
    backdrop-filter : blur(8px);
    background: ${(props: any) => props.theme.secondary};
    .active-route {
        color: ${(props: any) => props.theme.gray3} !important;
        font-weight: 600;
    }
    z-index: 999;
    @media (min-width: ${screenSizes.XXL}px) {
        align-items: center;
        display: flex;
        flex-wrap: inherit;
        justify-content: space-between;
    }
`
export const LogoContainer = styled.div`
    width : 80px;
    height : 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 100%;
        height : 100%;
    }
    :hover {
        cursor: pointer
    }
`
export const HandBurger = styled(HiOutlineMenu)<any>`
  cursor: pointer;
  font-size: xxx-large;
  color: ${(props: any) => props.theme.gray3};
`;
export const Close = styled(IoCloseOutline)<any>`
  cursor: pointer;
  font-size: xxx-large;
  color:${(props: any) => props.theme.gray3};
`;
export const NavContainer = styled.div`
    display: flex;
`
export const NavMenu = styled.div`
    display: flex;
`
export const Navigations = styled.nav`
    display : flex;
    align-items : center;
    a {
        font-size : 18px;
        text-decoration : none ;
        color : #aeaeae;
        padding : 10px 20px;
        margin : 0 10px;
        
    }
    .hamburger {
        display: none;
        background: ${(props: any) => props.theme.secondary};
        border: 0;
    }
    @media screen and (max-width: 811px) {
        .hamburger {
          display: block;
        }
        .navigation-menu {
            display: none;
        }
        .navigation-menu.expanded {
            display: flex;
            height: 100vh;
            width: 100vw;
            background: ${(props: any) => props.theme.secondary};
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translate(-50%, 0%);
            align-items: center;
        }
    }
`