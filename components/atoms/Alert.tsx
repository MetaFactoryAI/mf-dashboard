import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import Button from "./Button";

const Alert: React.FC<{
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  message: string;
  confirmCallback: () => void;
}> = ({ isOpen, setIsOpen, title, message, confirmCallback }) => {
  const onClose = () => setIsOpen(false);
  const onConfirm = () => {
    onClose();
    confirmCallback();
  };
  const cancelRef = React.useRef();

  return (
    // @ts-ignore
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent borderRadius="0px" backgroundColor="background" border="2px">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody fontFamily="body_regular">{message}</AlertDialogBody>

          <AlertDialogFooter>
            {/* @ts-ignore */}
            <Button
              ref={cancelRef}
              height="35px"
              width="80px"
              backgroundColor="background"
              title="Cancel"
              handleClickCallback={onClose}
            />
            <Button
              height="35px"
              width="80px"
              backgroundColor="background"
              title="Ok"
              handleClickCallback={onConfirm}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Alert;
