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
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import axios, {AxiosRequestConfig} from "axios";
import {EditExpenseCategoryProp} from "../../../common/Types";

export const CategoryExpenseEditModal: React.FC<EditExpenseCategoryProp> = ({
  isOpen,
  onClose,
  category,
  setReloading,
}) => {
  const jwt = localStorage.getItem("token");
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      monthlyBudget: formData.get("monthly-budget"),
    };

    try {
      const headers: AxiosRequestConfig["headers"] = {
        Authorization: `Bearer ${jwt}`,
      };
      const response = await axios.put(
        "http://localhost:8080/api/v1/auth/expense/categories/update/" +
          category.id,
        payload,
        { headers }
      );
      if (response.status === 200) {
        setReloading(true);
        onClose();
        toast({
          title: "Expense category successfully created!",
          status: "success",
          isClosable: true,
          position: "bottom",
          variant: "subtle",
        });
      } else {
        toast({
          title:
            "An error occurred while trying to edit the expense category, please try again!",
          status: "error",
          isClosable: true,
          position: "bottom",
          variant: "subtle",
        });
      }
    } catch (error) {
      toast({
        title: "Connection to the server has been lost!",
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
        <ModalHeader>Edit Budget Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="edit-form" onSubmit={(event) => handleSubmit(event)}>
            <VStack spacing="24px">
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  placeholder="Enter name"
                  defaultValue={category.name}
                />
              </FormControl>
              <FormControl id="monthly-budget">
                <FormLabel>Monthly Budget</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="$" />
                  <Input
                    name="monthly-budget"
                    type="number"
                    placeholder="Enter monthly budget"
                    step={0.01}
                    defaultValue={category.monthly_budget}
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
