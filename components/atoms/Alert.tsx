import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

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
        <AlertDialogContent borderRadius="0px">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody fontFamily="body_regular">{message}</AlertDialogBody>

          <AlertDialogFooter>
            {/* @ts-ignore */}
            <Button ref={cancelRef} onClick={onClose} borderRadius="0px">
              Cancel
            </Button>
            <Button backgroundColor="yellow" onClick={onConfirm} ml={3} borderRadius="0px">
              Ok
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Alert;
