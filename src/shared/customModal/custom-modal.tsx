import { useState } from "react";
import { ModalBody, ModalContent, ModelHead, Close, ModalContainer } from "./style";

const CustomModal = (props: any) => {
  const { show, toggleModal, borderRadius, heading, styles } = props;

  const handleClickOutside = (e: any) => {
    if (e.target === e.currentTarget) {
      toggleModal(false);

    }
  };

  const [closingModal, setClosingModal] = useState('')
  const handleToggle = (show: boolean) => {
    toggleModal(show)
    setClosingModal('closingModal')
    setTimeout(() => {
      setClosingModal('')
    }, 500)
    
  }

  return (
    <ModalContainer className={closingModal} onMouseDown={handleClickOutside} show={show}>
      <ModalBody style={{ ...styles }}>
        <ModelHead>
          <p>{heading}</p>
          <Close
            onClick={() => handleToggle(!show)}
          />
        </ModelHead>
        <ModalContent borderRadius={borderRadius}>
          {props.children}
        </ModalContent>
      </ModalBody>
    </ModalContainer>
  );
};
export default CustomModal;
