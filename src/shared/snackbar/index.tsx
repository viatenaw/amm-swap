import { useState } from "react";
import { withTheme, ThemeProps } from "styled-components";

import {
  Close,
  SnackbarBody,
  SnackbarContainer,
  SnackbarHeader,
  SnackBodyText,
} from "./style";

// interface SelectButtonProps extends ThemeProps<any> {
//   color?: string;
//   headerMessage?: string;
//   bodyMessage?: string;
// }
export const Snackbar = withTheme((props: any) => {
  const { headerMessage, bodyMessage, color, theme } = props;
  const [show, setShow] = useState(true);

  const formatAddress = (walletAddress?: any) => {
    const address = walletAddress?.toString();

    const formattedAddress = `${address?.substr(0, 10)}...${address?.substr(
      address.length - 10,
      address.length
    )}`;

    return formattedAddress;
  };

  return (
    <SnackbarContainer show={show}>
      <SnackbarHeader snackColor={color}>
        <div>{headerMessage}</div>
        <Close
          onClick={() => {
            setShow(false);
          }}
        />
      </SnackbarHeader>
    </SnackbarContainer>
  );
});
