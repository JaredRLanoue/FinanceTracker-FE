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
import {Account, Category, EditTransactionModalProps,} from "../../../common/Types";
import {DateTimeFormatter, Instant, ZoneId} from "js-joda";

export const TransactionEditModal: React.FC<EditTransactionModalProps> = ({
  isOpen,
  onClose,
  transaction,
  setReloading,
  accounts,
  incomeCategories,
  expenseCategories,
}) => {
  const jwt = localStorage.getItem("token");
  const toast = useToast();
  const [transactionType, setTransactionType] = useState<string>(
    transaction.type
  );
  const instant = Instant.parse(transaction.date);
  const zonedDateTime = instant.atZone(ZoneId.UTC);
  const localDateTime = zonedDateTime.toLocalDateTime();
  const formattedDate = localDateTime.format(DateTimeFormatter.ISO_LOCAL_DATE);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      type: formData.get("type"),
      accountId: formData.get("account"),
      categoryId: formData.get("category"),
      amount: formData.get("amount"),
      counterParty: formData.get("name"),
      date: new Date(formData.get("date") as string).toISOString(),
    };
    try {
      const headers: AxiosRequestConfig["headers"] = {
        Authorization: `Bearer ${jwt}`,
      };
      const response = await axios.put(
        "http://localhost:8080/api/v1/auth/transactions/update/" +
          transaction.id,
        payload,
        { headers }
      );
      if (response.status === 200) {
        setReloading(true);
        onClose();
        toast({
          title: "Transaction successfully updated!",
          status: "success",
          isClosable: true,
          position: "bottom",
          variant: "subtle",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to edit transaction, please try again!",
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
        <ModalHeader>Edit Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="edit-form" onSubmit={(event) => handleSubmit(event)}>
            <VStack spacing="24px">
              <FormControl id="type">
                <FormLabel>Type</FormLabel>
                <Select
                  name="type"
                  placeholder="Select type"
                  defaultValue={transaction.type}
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
                <Input
                  name="name"
                  placeholder="Enter name"
                  defaultValue={transaction.counter_party}
                />
              </FormControl>
              {transactionType === "Income" && incomeCategories && (
                <FormControl id="category">
                  <FormLabel>Category</FormLabel>
                  <Select name="category" defaultValue={transaction.category}>
                    {(incomeCategories.categories ?? []).map(
                      (category: Category) => (
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
                  <Select name="category" defaultValue={transaction.category}>
                    {(expenseCategories.categories ?? []).map(
                      (category: Category) => (
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
                <Select name="account" defaultValue={transaction.account}>
                  {(accounts?.data ?? []).map((account: Account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="date">
                <FormLabel>Date</FormLabel>
                <Input name="date" type="date" defaultValue={formattedDate} />
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
                    defaultValue={transaction.amount}
                  />
                </InputGroup>
              </FormControl>
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" colorScheme="green" form="edit-form">
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
