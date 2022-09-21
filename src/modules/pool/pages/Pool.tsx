import { useDispatch, useSelector } from "react-redux";
import BigNumber from "bignumber.js";
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
  BtnsContainer,
  DarkTextL,
  DarkTextS,
  InfoBodyContainer,
  InfoBox,
  InfoContainer,
  InfoHeadContainer,
  InputBox,
  InputCoin,
  InputContainer,
  AddActionArea,
  DivContainer,
  PageContainer,
  SecondaryTextL,
  SquareBox,
  RemoveActionArea,
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
} from "../../../shared/helpers/util";
import { Snackbar } from "../../../shared/snackbar";
import { walletConnectConfig } from "../../../shared/helpers/util";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../../shared/button";
import { useIsMobileScreen } from "../../../shared/hooks/useIsMobileScreen";
import { CustomInputField } from "../../../shared/customInputField";
import { Router_ } from "../../../logic/addLiq";
import { TokenA_adr } from "../../../abis/TokenA";
import { TokenB_adr } from "../../../abis/TokenB";
import { TokenA_, TokenB_ } from "../../../logic/addLiq"
import { Router_address } from "../../../abis/Router"
import { Pair_ } from "../../../logic/addLiq";


export const Pool: React.FC = withTheme((props: any) => {
  const globalSelector = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const { connectwallet, disconnectWallet, isWrongNetwork } = globalSelector.navbar;
  const { theme } = props;
  const { activate, deactivate, active, chainId, account, library } =
    useWeb3React<any>();
  const isMobileScreen = useIsMobileScreen();

  const [allowance1, setAllowance1] = useState('');
  const [allowance2, setAllowance2] = useState('');
  const [canSupply, setCanSupply] = useState<boolean>(false);

  const [price1, setPrice1] = useState<any>("");
  const [price2, setPrice2] = useState<any>("");
  const [buttonText, setText] = useState<string>("Supply");
  const [fundsBtn, setFundBtn] = useState<boolean>(false);
  const [reserveBUSD, setReserveBUSD] = useState<string>(""); //Total reserve BUSD token in Pair contract
  const [reserveBUST, setReserveBUST] = useState<string>("");
  const [balance1, setbalance1] = useState('');
  const [balance2, setbalance2] = useState('');
  const [poolShare, setPoolShare] = useState(""); //Initial Total LP token
  const [removedPS, setRemovedPS] = useState<string>(""); //LP token to be removed
  const [buttonTextRem, setRemText] = useState<string>("Approve");
  const [percentage, setPercentage] = useState<number>(100);
  const [balanceToken1, setBalanceByPS1] = useState(""); //initial TOken to be get
  const [balanceToken2, setBalanceByPS2] = useState("");
  const [BUSDremoved, setBUSDRemove] = useState(''); //BUST and BUST tokens to be remved
  const [BUSTremoved, setBUSTRemove] = useState('');

  const [newChainID, setIsNewChainID] = useState<string>('');

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
    const nChainID = web3.utils.toDecimal(e)
    setIsNewChainID(nChainID.toString())
    if (nChainID.toString() == CHAIN_ID) {
      dispatch(setIsWrongNetwork(false))
    }
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
    let mounted = true

    ;(async () => {
      if (mounted && library) {
        const networkNumber = await library.eth.net.getId()
        if (account && networkNumber == CHAIN_ID) getInitialBalance()
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

  function setSuppliedTokens(
    Lp: string,
    supply: number,
    Busd: string,
    Bust: string
  ) {
    let token1balance = (Number(Busd) / supply) * Number(Lp)
    let token2balance = (Number(Bust) / supply) * Number(Lp)

    setBalanceByPS1(token1balance.toString())
    setBalanceByPS2(token2balance.toString())

  }
  const getInitialBalance = async () => {
    try {
      const tokenABal = await TokenA_.methods.balanceOf(account).call()
      const tokenBBal = await TokenB_.methods.balanceOf(account).call()
      const ps = await Pair_.methods.balanceOf(account).call()

      const allowanceA = await TokenA_.methods.allowance(account, Router_address).call()
      const allowanceB = await TokenB_.methods.allowance(account, Router_address).call()
      setAllowance1(allowanceA)
      setAllowance2(allowanceB)
      
      const bal1 = web3.utils.fromWei(tokenABal, 'ether')
      const bal2 = web3.utils.fromWei(tokenBBal, 'ether')

      if (ps != 0) {
        const supply = await Pair_.methods.totalSupply().call()

        const poolShareInEth = web3.utils.fromWei(ps, "ether")
        const { _reserve0: resA, _reserve1: resB } = await Pair_.methods.getReserves().call()
        
        setReserveBUSD(resA)
        setReserveBUST(resB)
        setPoolShare(poolShareInEth)
        setRemovedPS(poolShareInEth)
        setSuppliedTokens(poolShareInEth, Number(supply), resA, resB)
        getBalanceByPS(100)
        setFundBtn(false)
      } else {
        const { _reserve0: resA, _reserve1: resB } = await Pair_.methods.getReserves().call();
        setReserveBUSD(resA)
        setReserveBUST(resB)
        setPoolShare("")
      }
      setbalance1(bal1)
      setbalance2(bal2)
    } catch (error) {
      console.error('errr', error);

      setFundBtn(true)
    }
  }

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
              color={theme.error}
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


  async function handlePrice1Change(e: React.ChangeEvent<HTMLInputElement>) {
    let val = validateNumberInput(e)
    setPrice1(`${val}`)
    if (val > 0) {
      const busdInput = web3.utils.toWei(val.toString(), 'ether')
      const bustVal = await Router_.methods.quote(busdInput, reserveBUSD, reserveBUST).call()
      const bustValEth: any = web3.utils.fromWei(bustVal, 'ether') || ''
      const fixedVal = bustValEth.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0]
      setPrice2(fixedVal)

      console.log(bustValEth, balance2 ,bustValEth <= balance2);
      
      if (Number(bustValEth) <= Number(balance2) && Number(val) <= Number(balance1) && Number(bustValEth) > 0) {
        setCanSupply(true)
      } else {
        setCanSupply(false)
      }
    } else {
      setPrice2(0)
      setCanSupply(false)
    }
  }

  async function handlePrice2Change(e: React.ChangeEvent<HTMLInputElement>) {
    let val = validateNumberInput(e)
    setPrice2(`${val}`)
    if (val > 0) {
      const bustInput = web3.utils.toWei(val.toString(), 'ether')
      const busdVal = await Router_.methods.quote(bustInput, reserveBUST, reserveBUSD).call()
      const busdValEth: any = web3.utils.fromWei(busdVal, 'ether') || ''
      const fixedVal = busdValEth.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0]
      setPrice1(fixedVal)
      if (Number(busdValEth) <= Number(balance1) && Number(val) <= Number(balance2) && Number(busdValEth) > 0) {
        setCanSupply(true)
      } else {
        setCanSupply(false)
      }
    } else {
      setPrice1(0)
      setCanSupply(false)
    }
  }

  const approveToken1 = async () => {
    try {
      const maxAllowance = new BigNumber(2).pow(256).minus(1).toFixed(0)
      await TokenA_.methods.approve(Router_address, maxAllowance).send({ from: account })
      setAllowance1(maxAllowance.toString())
    } catch (error) {
      console.error('errr approving token 1', error);
    }
  }

  const approveToken2 = async () => {
    try {
      const maxAllowance = new BigNumber(2).pow(256).minus(1).toFixed(0)
      await TokenB_.methods.approve(Router_address, maxAllowance).send({ from: account })
      setAllowance2(maxAllowance.toString())
    } catch (error) {
      console.error('errr approving token 2', error)
    }
  }

  async function addLiquidity() {
    if (buttonText === 'Processing...') return
    try {
      setText('Processing...')
      const deadLineValue = 5
      const amtA = web3.utils.toWei(price1, 'ether')
      const amtB = web3.utils.toWei(price2, 'ether')
      const deadLine = (Math.round(new Date().getTime() / 1000) + (Number(deadLineValue) ? Number(deadLineValue) * 60 : 5 * 60)).toString()
      const sleepage = .5
      const minAmtAEth: any = Number(price1) - (Number(price1) * sleepage) / 100
      const minAmtBEth: any = Number(price2) - (Number(price2) * sleepage) / 100
      const minAmtA = web3.utils.toWei(minAmtAEth.toString(), 'ether')
      const minAmtB = web3.utils.toWei(minAmtBEth.toString(), 'ether')

      await Router_.methods.addLiquidity(
        TokenA_adr,
        TokenB_adr,
        amtA,
        amtB,
        minAmtA,
        minAmtB,
        account,
        deadLine
      )
        .send({ from: account })

      toast.custom(
        <Snackbar
          headerMessage={"Successfully added!"}
          bodyMessage={""}
          color={'#1199fa80'}
        />
      );
      setText('Supply')
      setPrice1('')
      setPrice2('')
      setCanSupply(false)
      getInitialBalance()
    } catch (error) {
      console.error('errr adding liquidity', error);
      let errMsg = "Failed to add!"
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
      setText('Supply')
    }
  }



  async function removeFromPool() {
    try {
      setRemText("Approving..")
      const psInWei = web3.utils.toWei(removedPS, 'ether')
      await Pair_.methods.approve(Router_address, psInWei).send({ from: account })
      removeLiquidity(psInWei)
    } catch (error) {
      setRemText("Remove")
      let errMsg = "!"
      const e: any = error
      if (
        e.code === 4001 ||
        e.code === -32000 || "ACTION_REJECTED"
      ) {
        toast.custom(
          <Snackbar
            headerMessage='Rejected by user'
            bodyMessage={""}
            color={theme.error}
          />
        )
      }
      console.error('err approving ps to remove', error)
    }
  }

  async function removeLiquidity(ps: any) {
    try {
      setRemText("Removing..");
      const deadLineValue = 5
      const sleepage = .5
      const deadLine = (Math.round(new Date().getTime() / 1000) + (Number(deadLineValue) ? Number(deadLineValue) * 60 : 5 * 60)).toString()
      const minAmtAEth: any = Number(price1) - (Number(price1) * sleepage) / 100
      const minAmtBEth: any = Number(price2) - (Number(price2) * sleepage) / 100
      const minAmtA = web3.utils.toWei(minAmtAEth.toString(), 'ether')
      const minAmtB = web3.utils.toWei(minAmtBEth.toString(), 'ether')

      await Router_.methods.removeLiquidity(
        TokenA_adr,
        TokenB_adr,
        ps,
        minAmtA,
        minAmtB,
        account,
        deadLine
      )
        .send({ from: account })

      toast.custom(
        <Snackbar
          headerMessage={"Successfully removed!"}
          bodyMessage={""}
          color={'#1199fa80'}
        />
      );
      setCanSupply(false)
      setRemText("Remove");
      getInitialBalance()
      setPercentage(100);
      getBalanceByPS(100)
    } catch (error) {
      console.error('err removing ps', error);
      setRemText("Remove");
      toast.custom(
        <Snackbar
          headerMessage='Failed to remove'
          bodyMessage={""}
          color={theme.error}
        />
      );
    }
  }

  async function getBalanceByPS(percent: number) {
    setPercentage(percent);
    const token1 = (Number(balanceToken1) * percent) / 100
    const token2 = (Number(balanceToken2) * percent) / 100
    const ps = (Number(poolShare) * percent) / 100

    setRemovedPS(ps.toString())
    setBUSDRemove(`${token1}`)
    setBUSTRemove(`${token2}`)

  }
  const [btntrigger, setTrigger] = useState(true);

  function trigger() {
    setTrigger((prev) => !prev)
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
      {
        btntrigger
          ? (
            <DivContainer>
              <SecondaryTextL fSize={"40px"} fFamily={"TTNormsProExtraBold"}>
                Liquidity Pool
              </SecondaryTextL>
              <AddActionArea>
                <InfoContainer>
                  <InfoHeadContainer>
                    <DarkTextS fSize={"16px"} fFamily={"TTNormsProRegular"}>
                      Balances and pool share
                    </DarkTextS>
                  </InfoHeadContainer>
                  <LpInfo
                    balance1={balance1}
                    balance2={balance2}
                    poolShare={poolShare}
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
                  <span>+</span>
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


                <BtnsContainer>
                  {!active
                    ? (
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
                    )
                    : allowance1 === '0' || allowance2 === '0'
                      ? (
                        <>
                          <Button
                            btnType="filledButton"
                            bRadius='20px'
                            customBgColor="#1199fa80"
                            wrapperWidth='100%'
                            onClick={approveToken1}
                            isDisabled={allowance1 !== '0'}
                          >
                            Approve BUSD
                          </Button>

                          <Button
                            btnType="filledButton"
                            bRadius='20px'
                            customBgColor="#1199fa80"
                            wrapperWidth='100%'
                            onClick={approveToken2}
                            isDisabled={allowance2 !== '0'}
                          >
                            Approve BUST
                          </Button>
                        </>
                      )
                      : (
                        <>
                          <Button
                            btnType="filledButton"
                            onClick={addLiquidity}
                            bRadius='20px'
                            customBgColor="#1199fa80"
                            wrapperWidth='100%'
                            isDisabled={!canSupply}
                          >
                            {fundsBtn ? 'Insufficiant Funds' : buttonText}
                          </Button>
                          {poolShare ?
                            <Button
                              btnType="filledButton"
                              customBgColor={'#ff6871'}
                              customColor={'#f5f6fa'}
                              bRadius='20px'
                              wrapperWidth='100%'
                              onClick={() => {
                                getBalanceByPS(100);
                                trigger();
                              }}
                            >
                              Remove
                            </Button> : ''
                          }
                        </>
                      )}
                </BtnsContainer>
              </AddActionArea>
            </DivContainer>
          )
          : (
            <DivContainer>
              <SecondaryTextL fSize={"40px"} fFamily={"TTNormsProExtraBold"}>
                Liquidity Pool
              </SecondaryTextL>
              <RemoveActionArea>
                <div className="sqBoxesContainer">
                  <SquareBox
                    selected={percentage === 25}
                    onClick={() => {
                      getBalanceByPS(25);
                    }}
                  >
                    25
                  </SquareBox>
                  <SquareBox
                    selected={percentage === 50}
                    onClick={() => {
                      getBalanceByPS(50);
                    }}
                  >
                    50
                  </SquareBox>
                  <SquareBox
                    selected={percentage === 75}
                    onClick={() => {
                      getBalanceByPS(75);
                    }}
                  >
                    75
                  </SquareBox>
                  <SquareBox
                    selected={percentage === 100}
                    onClick={() => {
                      getBalanceByPS(100);
                    }}
                  >
                    100
                  </SquareBox>
                </div>
                <InfoContainer>
                  <InfoHeadContainer>
                    <DarkTextS fSize={"16px"} fFamily={"TTNormsProRegular"}>
                      Removing balances and pool share
                    </DarkTextS>
                  </InfoHeadContainer>
                  <InfoBodyContainer>
                    <InfoBox>
                      <DarkTextL fSizeMobile='16px' fSize={"20px"} fFamily={"TTNormsProBold"}>
                        BUSD
                      </DarkTextL>
                      <DarkTextS>
                        {Number(BUSDremoved).toFixed(3)}
                      </DarkTextS>
                    </InfoBox>
                    <InfoBox>
                      <DarkTextL fSizeMobile='16px' fSize={"20px"} fFamily={"TTNormsProBold"}>
                        BUST
                      </DarkTextL>
                      <DarkTextS>
                        {Number(BUSTremoved).toFixed(3)}
                      </DarkTextS>
                    </InfoBox>
                    <InfoBox>
                      <DarkTextL fSizeMobile='16px' fSize={"20px"} fFamily={"TTNormsProBold"}>
                        Pool Share
                      </DarkTextL>
                      <DarkTextS fSize={"16px"} fFamily={"TTNormsProRegular"}>
                        {Number(removedPS).toFixed(3) || '0'}
                      </DarkTextS>
                    </InfoBox>
                  </InfoBodyContainer>
                </InfoContainer>
                <BtnsContainer>
                  <Button
                    bRadius='20px'
                    btnType="filledButton"
                    customBgColor={'#ff6871'}
                    customColor={'#f5f6fa'}
                    onClick={removeFromPool}
                    wrapperWidth='100%'
                  >
                    {buttonTextRem}
                  </Button>
                  <Button
                    bRadius='20px'
                    btnType="filledButton"
                    onClick={trigger}
                    customBgColor="#1199fa80"
                    wrapperWidth='100%'
                  >
                    Supply
                  </Button>
                </BtnsContainer>
              </RemoveActionArea>
            </DivContainer>
          )

      }

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


const LpInfo = (props: any) => {

  const { balance1, balance2, poolShare } = props


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
          Pool Share
        </DarkTextL>
        <DarkTextS fSize={"16px"} fFamily={"TTNormsProRegular"}>
          {poolShare ? toFixed(poolShare) : "0"}
        </DarkTextS>
      </InfoBox>
    </InfoBodyContainer>
  )
}