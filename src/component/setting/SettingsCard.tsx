import axios, {AxiosRequestConfig} from "axios";
import {Button, useToast,} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export const SettingsCard = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const jwt = localStorage.getItem("token");

      const headers: AxiosRequestConfig["headers"] = {
        Authorization: `Bearer ${jwt}`,
      };

      await axios.delete(`http://localhost:8080/api/v1/auth/user/delete`, {
        headers,
      });
      localStorage.removeItem("token");
      navigate("/login");
      toast({
        title: "User deleted successfully! Bye!",
        status: "success",
        isClosable: true,
        position: "bottom",
        variant: "subtle",
      });
    } catch (error) {
      toast({
        title: "Failed to delete user account, please try again!",
        status: "error",
        isClosable: true,
        position: "bottom",
        variant: "subtle",
      });
    }
  };

  const handleLoadExampleData = async () => {
    try {
      const jwt = localStorage.getItem("token");

      const headers: AxiosRequestConfig["headers"] = {
        Authorization: `Bearer ${jwt}`,
      };

      await axios.post(
        `http://localhost:8080/api/v1/auth/user/create-example-data`,
        {},
        { headers }
      );
      toast({
        title: "Example data loaded successfully!",
        status: "success",
        isClosable: true,
        position: "bottom",
        variant: "subtle",
      });
    } catch (error) {
      toast({
        title: "Failed to load example data, please try again!",
        status: "error",
        isClosable: true,
        position: "bottom",
        variant: "subtle",
      });
    }
  };

  return (
    <>
      <Button colorScheme="red" onClick={handleDelete}>
        Delete Account
      </Button>
      <Button colorScheme="green" onClick={handleLoadExampleData}>
        Load Example Data
      </Button>
    </>
  );
};
