import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Account } from "./AccountsTable";
import axios, { AxiosRequestConfig } from "axios";

interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  accountData: Account;
  setReloading: (reloading: boolean) => void;
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({
  isOpen,
  onClose,
  accountData,
  setReloading,
}) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const jwt = localStorage.getItem("token");

  async function deleteAccount(account: Account) {
    try {
      const headers: AxiosRequestConfig["headers"] = {
        Authorization: `Bearer ${jwt}`,
      };
      const response = await axios.delete(
        "http://localhost:8080/api/v1/auth/accounts/delete/" + account.id,
        { headers }
      );
      if (response.status === 200) {
        setReloading(true);
        onClose();
      } else {
        console.log("Error deleting account");
      }
    } catch (error) {
      console.log(error);
    }

    onClose();
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay
        sx={{
          background: "rgba(0, 0, 0, 0.8)",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: "overlay",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete {accountData.name} Account
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this account? This action deletes
            all associated transactions and cannot be undone.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => deleteAccount(accountData)}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteAlert;
