import { ButtonWrapper, ButtonAlignment } from "./style";

interface ButtonProps {
  children?: React.ReactNode,
  btnType?: string,
  align?: string,
  justify?: string,
  onClick?: any,
  customColor?: string,
  customBgColor?: string,
  customWidth?: string,
  isDisabled?: boolean,
  className?: string,
  tile?: boolean,
  customPadding?: string,
  bRadius?: string,
  fSize?: string,
  fSizeMobile?: string,
  custBorder?: string,
  wrapperWidth?: string
}

export const Button = (props: ButtonProps) => {
  const { children, btnType, fSize, wrapperWidth, custBorder, fSizeMobile, align, justify, onClick, customColor, customBgColor, customWidth, isDisabled, className, tile, customPadding, bRadius } = props
  return (
    <ButtonAlignment wrapperWidth={wrapperWidth} className={className} justify={justify} align={align} >
      <ButtonWrapper custBorder={custBorder} fSize={fSize} fSizeMobile={fSizeMobile} bRadius={bRadius} disabled={isDisabled} customPadding={customPadding} tile={tile} onClick={onClick} customColor={customColor} customBgColor={customBgColor} customWidth={customWidth} btnType={btnType}>{children}</ButtonWrapper>
    </ButtonAlignment>
  );
}
