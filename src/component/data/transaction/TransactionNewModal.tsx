import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    useToast,
    VStack,
} from "@chakra-ui/react";
import React, {useState} from "react";
import axios, {AxiosRequestConfig} from "axios";
import {Account, NewTransactionModalProps} from "../../../common/Types";
import {DateTimeFormatter, Instant, ZoneId} from "js-joda";

export const TransactionNewModal: React.FC<NewTransactionModalProps> = ({
  isOpen,
  onClose,
  setReloading,
  accounts,
  incomeCategories,
  expenseCategories,
}) => {
  const jwt = localStorage.getItem("token");
  const toast = useToast();
  const [transactionType, setTransactionType] = useState("Expense");
  const instant = Instant.now();
  const zonedDateTime = instant.atZone(ZoneId.UTC);
  const localDate = zonedDateTime.toLocalDate();
  const formattedDate = localDate.format(DateTimeFormatter.ISO_LOCAL_DATE);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const date = new Date(formData.get("date") as string);
    const payload = {
      type: formData.get("type"),
      accountId: formData.get("account"),
      categoryId: formData.get("category"),
      amount: formData.get("amount"),
      counterParty: formData.get("name"),
      date: date.toISOString(),
    };

    // console.log(payload.date)
    try {
      const headers: AxiosRequestConfig["headers"] = {
        Authorization: `Bearer ${jwt}`,
      };
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/transactions/create",
        payload,
        { headers }
      );
      if (response.status === 200) {
        setReloading(true);
        onClose();
        toast({
          title: "Transaction successfully created!",
          status: "success",
          isClosable: true,
          position: "bottom",
          variant: "subtle",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to create transaction, please try again!",
        status: "error",
        isClosable: true,
        position: "bottom",
        variant: "subtle",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
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
      />
      <ModalContent>
        <ModalHeader>Create Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="edit-form" onSubmit={(event) => handleSubmit(event)}>
            <VStack spacing="24px">
              <FormControl id="type">
                <FormLabel>Type</FormLabel>
                <Select
                  name="type"
                  defaultValue={transactionType}
                  onChange={(event) =>
                    setTransactionType(event.target?.value ?? "")
                  }
                >
                  <option value="Expense">Expense</option>
                  <option value="Income">Income</option>
                </Select>
              </FormControl>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input name="name" placeholder="Enter name" />
              </FormControl>
              {transactionType === "Income" && incomeCategories && (
                <FormControl id="category">
                  <FormLabel>Category</FormLabel>
                  <Select name="category" placeholder="Select category type">
                    {(incomeCategories.categories ?? []).map(
                      (category: any) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      )
                    )}
                  </Select>
                </FormControl>
              )}
              {transactionType === "Expense" && expenseCategories && (
                <FormControl id="category">
                  <FormLabel>Category</FormLabel>
                  <Select name="category" placeholder="Select category type">
                    {(expenseCategories.categories ?? []).map(
                      (category: any) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      )
                    )}
                  </Select>
                </FormControl>
              )}
              <FormControl id="account">
                <FormLabel>Account</FormLabel>
                <Select name="account" placeholder="Select account type">
                  {(accounts?.data ?? []).map((account: Account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="date">
                <FormLabel>Date</FormLabel>
                <Input name="date" type="date" />
                {/*//defaultValue={formattedDate}*/}
              </FormControl>
              <FormControl id="amount">
                <FormLabel>Amount</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="$" />
                  <Input
                    name="amount"
                    type="number"
                    placeholder="Enter amount"
                    step={0.01}
                  />
                </InputGroup>
              </FormControl>
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" colorScheme="green" form="edit-form">
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
