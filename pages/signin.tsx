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
import Router from "next/router";

import Layout from "../components/Layout";
import { useAuthUser } from "../contexts/auth-user-context";

type LoginData = {
  email: string;
  password: string;
};

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithBearer, persistBearer } = useAuthUser();
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
        `${process.env.NEXT_PUBLIC_ADS_BACKEND_URL}auth/signin`,
        requestOptions
      );

      if (response.status !== 201) {
        toast({
          title: "Wrong credentials",
          description: "The email or password are not correct",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false);

        return;
      }

      const jsonResponse = await response.json();

      if (!jsonResponse || !jsonResponse.accessToken) {
        toast({
          title: "Wrong credentials",
          description: "The email or password are not correct",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false);

        return;
      }

      await loginWithBearer(jsonResponse.accessToken);
      persistBearer(jsonResponse.accessToken);
      Router.replace("/");
    } catch (error) {
      toast({
        title: "Register Failed",
        description: "There was an error trying to create your account.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      // console.log("ERROL", error);
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
            <Heading>Sign In!</Heading>

            <FormControl isDisabled={isLoading} isInvalid={errors.email}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdEmail />
                </InputLeftElement>
                <Input
                  defaultValue=""
                  id="email"
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
                  id="password"
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
