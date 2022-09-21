import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useWeb3React} from "@web3-react/core";
import { useDispatch, useSelector } from 'react-redux'
import { withTheme } from "styled-components";


import logo from "../../../assets/icons/G03.png";
import {
  HeaderContainer,
  LogoContainer,
  Navigations,
  NavContainer,
  HandBurger,
  NavMenu,
  Close,
} from "./style";
import { FlexBox } from "../../../shared/flexBox";
import { swapPath, rootPath } from "../../../logic/paths";
import { Button } from "../../../shared/button";
import { CHAIN_ID, formatAddress } from "../../../shared/helpers/util";
import { setConnectWallet, setDisConnectWallet } from "../../../logic/redux/actions";

export const Navbar : React.FC = withTheme((props:any)=> {
  const globalSelector = useSelector((state: any) => state);
  const { isWrongNetwork } = globalSelector.navbar;

  const { account, chainId, } = useWeb3React<any>();
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleconnectwallet = () => {
    dispatch(setConnectWallet(true))
    handleHandBurgerAction()
  }

  const handleDisConnectwallet = () => {
    dispatch(setDisConnectWallet(true))
    document.body.style.overflow = "hidden";
    handleHandBurgerAction()
  }
 
  const handleHandBurgerAction = () => {
    setIsNavExpanded(prev => !prev)
  }
  console.log('isWrongNetwork', isWrongNetwork);
  
  return (
    <HeaderContainer>
      <FlexBox>
        <LogoContainer
          onClick={() => {
            navigate(rootPath)
          }}
        >
          <img src={logo} alt="logo" />
        </LogoContainer>
        <NavContainer>
          <Navigations>
            <button className="hamburger" onClick={handleHandBurgerAction}>
              {isNavExpanded ? <Close /> : <HandBurger />}
            </button>
            <NavMenu className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active-route" : "inactive-route"
                }
                onClick={handleHandBurgerAction}
                to={rootPath}
              >
                Pool
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active-route" : "inactive-route"
                }
                onClick={handleHandBurgerAction}
                to={swapPath}
              >
                Swap
              </NavLink>
              {account && chainId == CHAIN_ID ? (
                <Button className={'walletNavButton'} bRadius='20px' btnType="walletButton" onClick={handleDisConnectwallet}>
                  {formatAddress(account)}
                </Button>
              ) : (
                <Button customColor={isWrongNetwork ? '' : '#1199fa'} bRadius='20px' customBgColor={isWrongNetwork ? '#ff6871' : '#0f98fa66'} className={'walletNavButton'} btnType={isWrongNetwork ? "filledButton" : "filledButtonMedium" }onClick={handleconnectwallet}>
                  {isWrongNetwork ? "Wrong Network" : "Connect"}
                </Button>
              )}
            </NavMenu>
          </Navigations>

        </NavContainer>
      </FlexBox>
    </HeaderContainer>
  );
})
