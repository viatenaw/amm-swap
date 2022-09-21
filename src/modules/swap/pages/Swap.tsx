import { useDispatch, useSelector } from "react-redux";
import { withTheme } from "styled-components";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import toast, { Toaster } from "react-hot-toast";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";

import CustomModal from "../../../shared/customModal";
import {
  DarkTextL,
  InputContainer,
  SwapActionArea,
  DivContainer,
  PageContainer,
  SecondaryTextL,
  DarkTextS,
} from "./style";
import metamask from "../../../assets/icons/metamask.svg";
import walletconnectImg from "../../../assets/icons/walletconnect.svg";
import {
  setConnectWallet,
  setDisConnectWallet,
  setIsWrongNetwork,
} from "../../../logic/redux/actions";
import {
  CHAIN_ID,
  formatAddress,
  injector,
  toFixed,
  validateNumberInput,
  web3,
  walletConnectConfig
} from "../../../shared/helpers/util";
import { Snackbar } from "../../../shared/snackbar";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../../shared/button";
import { useIsMobileScreen } from "../../../shared/hooks/useIsMobileScreen";
import { CustomInputField } from "../../../shared/customInputField";
import { Router_, TokenA_, TokenB_ } from "../../../logic/addLiq";
import { TokenA_adr } from "../../../abis/TokenA";
import { TokenB_adr } from "../../../abis/TokenB";
import { InfoBodyContainer, InfoBox, InfoContainer, InfoHeadContainer, InputBox, InputCoin } from "../../pool/pages/style";


export const Swap: React.FC = withTheme((props: any) => {
  const globalSelector = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const { connectwallet, disconnectWallet, isWrongNetwork } = globalSelector.navbar;
  const { theme } = props;
  const { activate, deactivate, active, account, library } =
    useWeb3React<any>();
  const isMobileScreen = useIsMobileScreen();
  const [balance1, setbalance1] = useState('');
  const [balance2, setbalance2] = useState('');
  const [price1, setPrice1] = useState<string>("");
  const [price2, setPrice2] = useState<string>("");
  const [newChainID, setIsNewChainID] = useState<string>('');
  const [canSwap, setCanSwap] = useState(false);
  const [swapState, setSwap] = useState<string>("Swap");

  const [variableInput, setVariableInput] = useState(1)

  useEffect(() => {
    (async () => {
      if (web3.givenProvider) {
        const currentChainId = await web3.eth.getChainId();
        let actvMask = JSON.parse(
          JSON.stringify(localStorage.getItem("connectorId_Metamask"))
        );
        let actvWalletConnect = JSON.parse(
          JSON.stringify(localStorage.getItem("connectorId_WalletConnect"))
        );
        if (actvMask && currentChainId == CHAIN_ID) {
          ConnectMetamask();
        } else if (actvWalletConnect && currentChainId == CHAIN_ID) {
          ConnectWalletConnect();
        }
      }
    })();
  }, [newChainID]);

  const handleNetworkChange = (e: any) => {
    console.log('chainChanged', e, web3.utils.toDecimal(e));
    const nChainID = web3.utils.toDecimal(e)
    setIsNewChainID(nChainID.toString())
    if (nChainID.toString() == CHAIN_ID) {
      dispatch(setIsWrongNetwork(false))
    }
  }
  const getInitialBalance = async () => {
    const tokenABal = await TokenA_.methods.balanceOf(account).call()
    const tokenBBal = await TokenB_.methods.balanceOf(account).call()
    const bal1 = web3.utils.fromWei(tokenABal, 'ether')
    const bal2 = web3.utils.fromWei(tokenBBal, 'ether')
    setbalance1(bal1)
    setbalance2(bal2)
  }
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', handleNetworkChange)
    }
    return () => {
      window.ethereum.removeListener('chainChanged', handleNetworkChange)
    }
  }, [])

  useEffect(() => {
    let mounted = true;

    (async () => {
      if (mounted && library) {
        const networkNumber = await library.eth.net.getId();
        if (account && networkNumber == CHAIN_ID) getInitialBalance();
      }
    })();

    return () => {
      mounted = false;
    };
  }, [
    active,
    account,
    library,
  ]);

  function handleconnectwallet(props: any) {
    dispatch(setConnectWallet(props));
  }
  const ConnectMetamask = async () => {
    try {
      await activate(injector, (error) => {
        if (error instanceof UnsupportedChainIdError) {
          dispatch(setIsWrongNetwork(true))
          toast.custom(
            <Snackbar
              headerMessage={"Wrong Network"}
              bodyMessage={"Please connect to the Binance TestNet"}
              color={theme.warning}
            />
          );
          deactivate();
        } else {
          if (error instanceof NoEthereumProviderError) {
            alert("Install Metamask ");
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
          } else {
            localStorage.clear();
          }
        }
      });

      if (web3.eth) {
        const currentChainId = await web3.eth.getChainId();
        if (currentChainId == CHAIN_ID) {
          localStorage.setItem("connectorId_Metamask", JSON.stringify(true));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const ConnectWalletConnect = async () => {
    try {
      let errorFlag = false;
      activate(walletConnectConfig, (error: any) => {
        if (error instanceof UnsupportedChainIdError) {
          errorFlag = true;
          dispatch(setIsWrongNetwork(true))
          toast.custom(
            <Snackbar
              headerMessage={"Wrong Network"}
              bodyMessage={"Please connect to the Binance TestNet"}
              color={theme.warning}
            />
          );
          deactivate();
        } else {
          if (error instanceof NoEthereumProviderError) {
            errorFlag = true;
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            errorFlag = true;
            //@ts-ignore
            walletConnectConfig.walletConnectProvider = null;
            localStorage.removeItem("connectorId_WalletConnect");
          } else {
            errorFlag = true;
            localStorage.clear();
          }
        }
      });

      if (web3.eth) {
        const currentChainId = await web3.eth.getChainId();
        if (currentChainId == CHAIN_ID) {
          localStorage.setItem(
            "connectorId_WalletConnect",
            JSON.stringify(true)
          );
        }
      }
    } catch (err) {
      console.error("walletconnect error ", err);
    }
  };

  const handleDisConnectwallet = (props: any) => {
    dispatch(setDisConnectWallet(props));
  };
  const Disconnect_ = useCallback(() => {
    deactivate();
    handleDisConnectwallet(false);
    localStorage.clear();
    document.body.style.overflow = "unset";
  }, [deactivate]);


  const handlePrice1Change = async (e: any) => {
    let val = validateNumberInput(e)
    setPrice1(`${val}`)
    if (val && val > 0) {
      setVariableInput(1)
      const busdInput = web3.utils.toWei(val.toString(), 'ether')
      const [busdVal, bustVal] = await Router_.methods.getAmountsOut(busdInput, [TokenA_adr, TokenB_adr]).call()
      const bustValEth: any = web3.utils.fromWei(bustVal, 'ether') || ''
      setPrice2(bustValEth)
      console.log('Number(balance1) > Number(price1)', balance1, val, Number(balance1) > Number(val));

      if (Number(balance1) > Number(val)) {
        setCanSwap(true)
      } else {
        setCanSwap(false)
      }
    } else {
      setPrice2('0')
      setCanSwap(false)
    }
  }
  const handlePrice2Change = async (e: any) => {
    let val = validateNumberInput(e)
    setPrice2(`${val}`)
    if (val && val > 0) {
      setVariableInput(2)
      const bustInput = web3.utils.toWei(val.toString(), 'ether')
      const [bustVal, busdVal] = await Router_.methods.getAmountsOut(bustInput, [TokenB_adr, TokenA_adr]).call()
      console.log({
        bustVal, busdVal
      });

      const busdValEth: any = web3.utils.fromWei(busdVal, 'ether') || ''
      setPrice1(busdValEth)
      const variableMinIn = Number(busdValEth) - (Number(busdValEth) * .5) / 100
      console.log('Number(balance1) > Number(busdValEth)>>>>>', balance1, Number(balance1) > Number(busdValEth));
      if (Number(balance1) > variableMinIn) {
        setCanSwap(true)
      } else {
        setCanSwap(false)
      }
    } else {
      setPrice1('0')
      setCanSwap(false)
    }
  }

  async function swap() {
    try {
      setSwap('Swapping..')
      const deadLineValue = 5
      const sleepage = .5
      const deadLine = (Math.round(new Date().getTime() / 1000) + (Number(deadLineValue) ? Number(deadLineValue) * 60 : 5 * 60)).toString()
      if (variableInput === 1) {
        const amountIn = web3.utils.toWei(price1, 'ether')
        const minAmtOutEth: any = Number(price2) - (Number(price2) * sleepage) / 100
        const amountOutMin = web3.utils.toWei(minAmtOutEth.toString(), 'ether')
        await Router_.methods.swapExactTokensForTokens(
          amountIn,
          amountOutMin,
          [TokenA_adr, TokenB_adr],
          account,
          deadLine
        ).send({ from: account })
      } else {
        const amountOut = web3.utils.toWei(price2, 'ether')
        const maxAmtInEth: any = Number(price1) + (Number(price1) * sleepage) / 100
        const amountInMax = web3.utils.toWei(maxAmtInEth.toFixed(18), 'ether')
        await Router_.methods.swapTokensForExactTokens(
          amountOut,
          amountInMax,
          [TokenA_adr, TokenB_adr],
          account,
          deadLine
        ).send({ from: account })
      }
      toast.custom(
        <Snackbar
          headerMessage={"Successfully swapped!"}
          bodyMessage={""}
          color={'#1199fa80'}
        />
      );
      setSwap('Swap')
    } catch (error) {
      console.error('error in swapping', error)
      let errMsg = "Failed to swap!"
      const e: any = error
      if (
        e.code === 4001 ||
        e.code === -32000 || "ACTION_REJECTED"
      ) {
        errMsg = 'Rejected by user'
      }
      toast.custom(
        <Snackbar
          headerMessage={errMsg}
          bodyMessage={""}
          color={theme.error}
        />
      );
      setSwap('Swap')
    }
  }

  return (
    <PageContainer>
      <Toaster
        containerStyle={
          !isMobileScreen
            ? {
              top: "15vh",
              left: "80vw",
            }
            : {}
        }
      />
      <DivContainer>
        <SecondaryTextL fSize={"40px"} fFamily={"TTNormsProExtraBold"}>
          Swap
        </SecondaryTextL>
        <SwapActionArea>
          <InfoContainer>
            <InfoHeadContainer>
              <DarkTextS fSize={"16px"} fFamily={"TTNormsProRegular"}>
                Balance
              </DarkTextS>
            </InfoHeadContainer>
            <SwapInfo
              balance1={balance1}
              balance2={balance2}
            />

          </InfoContainer>
          <InputContainer>
            <div>
              <InputBox>
                <CustomInputField
                  value={price1}
                  onChange={handlePrice1Change}
                  placeholder="BUSD"
                />
                <InputCoin>BUSD</InputCoin>
              </InputBox>
            </div>
            <svg height='20px' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#6a6a6a" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
            </svg>
            <div>
              <InputBox>
                <CustomInputField
                  value={price2}
                  onChange={handlePrice2Change}
                  placeholder="BUST"
                />
                <InputCoin>BUST</InputCoin>

              </InputBox>
            </div>
          </InputContainer>
          {active ? (
            <Button
              btnType="filledButton"
              onClick={swap}
              customBgColor="#1199fa80"
              bRadius='20px'
              wrapperWidth='100%'
              isDisabled={!canSwap || swapState === 'Swapping..'}
            >
              {swapState}
            </Button>
          ) : (
            <Button
              bRadius='20px'
              wrapperWidth='100%'
              btnType="filledButton"
              onClick={handleconnectwallet}
              customColor={isWrongNetwork ? '' : '#1199fa'}
              customBgColor={isWrongNetwork ? '#ff6871' : '#0f98fa66'}
            >
              {isWrongNetwork ? "Wrong Network" : "Connect Wallet"}
            </Button>
          )}
        </SwapActionArea>
      </DivContainer>

      {/* Connect Modal */}
      <CustomModal
        show={connectwallet}
        toggleModal={(p: boolean) => {
          handleconnectwallet(p);
          document.body.style.overflow = "unset";
        }}
        heading={isWrongNetwork ? "Wrong Network" : "Connect a Wallet"}
        styles={{ height: isWrongNetwork ? "10em" : "15em" }}
      >
        {!isWrongNetwork
          ? <div className="walletconnectcontainer">
            <div
              className="metamask"
              onClick={() => {
                handleconnectwallet(false);
                ConnectMetamask();
                document.body.style.overflow = "unset";
              }}
            >
              <img src={metamask} alt="metamask" />
              <span>Metamask</span>
            </div>
            <div
              className="walletConnect"
              onClick={() => {
                handleconnectwallet(false);
                ConnectWalletConnect();
                document.body.style.overflow = "unset";
              }}
            >
              <img src={walletconnectImg} alt="walletconnect" />
              <span>WalletConnect</span>
            </div>
          </div>
          : <DarkTextL fSize='18px' fWeight='500'>Please connect to the Binance TestNet</DarkTextL>
        }
      </CustomModal>

      {/* Disconnect */}
      <CustomModal
        show={disconnectWallet}
        toggleModal={(p: boolean) => {
          handleDisConnectwallet(p);
          document.body.style.overflow = "unset";
        }}
        heading={"Disconnect your wallet"}
        styles={{ height: "15em" }}
      >
        <p className="modalSecondaryText">
          {formatAddress(account)}
        </p>
        <div className="modalActionBtnContainer">
          <Button
            bRadius='20px'
            btnType="filledButton"
            customBgColor="#ededed"
            wrapperWidth='100%'
            onClick={() => {
              handleDisConnectwallet(false);
              document.body.style.overflow = "unset";
            }}
            customColor={theme.submittedSnackbar}
          >
            Cancel
          </Button>
          <Button bRadius='20px' wrapperWidth='100%' customBgColor="#1199fa80" btnType="filledButton" onClick={() => Disconnect_()}>
            Disconnect
          </Button>
        </div>
      </CustomModal>
    </PageContainer>
  );
});


const SwapInfo = (props: any) => {

  const { balance1, balance2 } = props


  return (
    <InfoBodyContainer>
      <InfoBox>
        <DarkTextL fSizeMobile='16px' fSize={"20px"} fFamily={"TTNormsProBold"}>
          BUSD
        </DarkTextL>
        <DarkTextS>
          {toFixed(balance1)}
        </DarkTextS>
      </InfoBox>
      <InfoBox>
        <DarkTextL fSizeMobile='16px' fSize={"20px"} fFamily={"TTNormsProBold"}>
          BUST
        </DarkTextL>
        <DarkTextS>
          {toFixed(balance2)}
        </DarkTextS>
      </InfoBox>
      <InfoBox>
        <DarkTextL fSizeMobile='16px' fSize={"20px"} fFamily={"TTNormsProBold"}>
          Sleepage
        </DarkTextL>
        <DarkTextS fSize={"16px"} fFamily={"TTNormsProRegular"}>
          0.5%
        </DarkTextS>
      </InfoBox>
    </InfoBodyContainer>
  )
}