import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  FormLabel,
  InputGroup,
  ModalFooter,
  Button,
  VStack,
  Select,
  useToast,
} from "@chakra-ui/react";
import { InputLeftAddon } from "@chakra-ui/react";
import axios, { AxiosRequestConfig } from "axios";
import React from "react";
import { NewEntityModalProps } from "../../../common/Types";

export const CategoryExpenseNewModal: React.FC<NewEntityModalProps> = ({
  isOpen,
  onClose,
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
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/expense/categories/create",
        payload,
        { headers }
      );
      if (response.status === 200) {
        setReloading(true);
        onClose();
      } else {
        toast({
          title:
            "An error occurred while trying to delete the account, please try again!",
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
        <ModalHeader>Create New Budget Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="edit-form" onSubmit={(event) => handleSubmit(event)}>
            <VStack spacing="24px">
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input name="name" placeholder="Enter name" />
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
