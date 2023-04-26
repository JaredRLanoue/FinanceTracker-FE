import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useToast,
} from "@chakra-ui/react";
import React from "react";
import axios, {AxiosRequestConfig} from "axios";
import {DeleteTransactionAlertProp, Transaction} from "../../../common/Types";

const TransactionDeleteAlert: React.FC<DeleteTransactionAlertProp> = ({
  isOpen,
  onClose,
  transaction,
  setReloading,
}) => {
  const toast = useToast();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const jwt = localStorage.getItem("token");

  async function deleteTransaction(transaction: Transaction) {
    try {
      const headers: AxiosRequestConfig["headers"] = {
        Authorization: `Bearer ${jwt}`,
      };
      const response = await axios.delete(
        "http://localhost:8080/api/v1/auth/transactions/delete/" +
          transaction.type +
          "/" +
          transaction.id,
        { headers }
      );
      if (response.status === 200) {
        console.log("FINISHED DELETING");
        setReloading(true);
        onClose();
      } else {
        toast({
          title:
            "An error occurred while trying to delete the transaction, please try again!",
          status: "error",
          isClosable: true,
          position: "bottom",
          variant: "subtle",
        });
      }
    } catch (error) {
      toast({
        title: "Connection to the server has been lost, please try again!",
        status: "error",
        isClosable: true,
        position: "bottom",
        variant: "subtle",
      });
    }
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
            Delete {transaction.counter_party} Transaction
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this transaction? This action cannot
            be undone.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => deleteTransaction(transaction)}
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

export default TransactionDeleteAlert;
