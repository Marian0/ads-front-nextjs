import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Flex,
  Wrap,
  Heading,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useToast } from "@chakra-ui/react";

import Layout from "../components/Layout";

type LoginData = {
  email: string;
  password: string;
};

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    try {
      const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADS_BACKEND_URL}auth/signup`,
        requestOptions
      );
      const jsonResponse = await response.json();

      switch (response.status) {
        case 201:
          // allright
          break;
        case 409:
          toast({
            title: "Email taken",
            description:
              "This email has already taken, please use a different one or try loggin in",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          setIsLoading(false);

          return;

        default:
          throw new Error(jsonResponse.message || "Unknown error");
      }

      toast({
        title: "Registered!",
        description: "Your account has been created successfully !",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Register Failed",
        description: "There was an error trying to create your account.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log("ERROL", error);
    }
    setIsLoading(false);
  };
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  return (
    <Layout>
      <Flex height="100%" justifyContent="center" paddingY={20} width="100%">
        <form
          style={{ width: "100%", maxWidth: "400px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Wrap spacing="30px">
            <Heading>Sign up!</Heading>

            <FormControl isDisabled={isLoading} isInvalid={errors.email}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdEmail />
                </InputLeftElement>
                <Input
                  defaultValue=""
                  placeholder="Please, type your email..."
                  type="email"
                  {...register("email", { required: true })}
                />
              </InputGroup>
              <FormErrorMessage>Email is required.</FormErrorMessage>
            </FormControl>

            <FormControl isDisabled={isLoading} isInvalid={errors.password}>
              <InputGroup size="md">
                <InputLeftElement pointerEvents="none">
                  <RiLockPasswordFill />
                </InputLeftElement>
                <Input
                  placeholder="Please, type a password..."
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>Password is required.</FormErrorMessage>
            </FormControl>

            <Button
              isLoading={isLoading}
              loadingText="Please, wait..."
              type="submit"
            >
              Submit!
            </Button>
          </Wrap>
        </form>
      </Flex>
    </Layout>
  );
}
