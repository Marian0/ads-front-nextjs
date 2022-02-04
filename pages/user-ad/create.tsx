import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import { AuthUser } from "../../contexts/auth-user-context";
import { withAuthUser } from "../../hocs/withAuthUser";
import { AdStatus } from "../../types/ad-status.enum";

type Props = {
  authUser: AuthUser;
};

type CreateAdRequestType = {
  title: string;
  description: string;
};

type CreateAdResponseTyme = {
  title: string;
  description: string;
  slug: string;
  userId: string;
  id: string;
  status: AdStatus;
  created_at: string;
  updated_at: string;
};

const CreateAd = ({ authUser }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const onSubmit = async (data: CreateAdRequestType) => {
    setIsLoading(true);
    try {
      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser.jwtToken}`,
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADS_BACKEND_URL}ads`,
        requestOptions
      );

      if (response.status !== 201) {
        throw new Error("Wrong status response");
      }

      const jsonResponse: CreateAdResponseTyme = await response.json();

      if (!jsonResponse) {
        throw new Error("Wrong respnse format");
      }

      toast({
        title: "Ad created successfully!",
        description:
          "The Ad has been correctly submitted. An administrartor will validate it soon! Stay tune!",
        status: "success",
      });

      router.push(`/ad/${jsonResponse.slug}`);
    } catch (error) {
      toast({
        title: "Error creating",
        description: "There was an error trying to create your Ad.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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
      <Box>
        <Heading>Create Ad</Heading>
        <form
          style={{ width: "100%", maxWidth: "400px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl isDisabled={isLoading} isInvalid={errors.email}>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              defaultValue=""
              id="title"
              placeholder="Please, type your title..."
              type="title"
              {...register("title", { required: true })}
            />
            <FormErrorMessage>Title is required.</FormErrorMessage>
          </FormControl>

          <FormControl isDisabled={isLoading} isInvalid={errors.email}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input
              defaultValue=""
              id="description"
              placeholder="Please, type your description..."
              type="description"
              {...register("description", { required: true })}
            />
            <FormErrorMessage>Description is required.</FormErrorMessage>
          </FormControl>

          <Button
            isLoading={isLoading}
            loadingText="Please, wait..."
            type="submit"
          >
            Submit!
          </Button>
        </form>
      </Box>
    </Layout>
  );
};

export default withAuthUser(CreateAd);
