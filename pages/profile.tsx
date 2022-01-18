import { Box, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import Router from "next/router";
import React from "react";

import Layout from "../components/Layout";
import LoadingOverlay from "../components/LoadingOverlay";
import { useAuthUser } from "../contexts/auth-user-context";

const Privada = () => {
  const { authProcessFinished, authUser } = useAuthUser();

  if (!authProcessFinished) {
    return <LoadingOverlay />;
  }

  if (!authUser) {
    Router.push("/signin");

    return null;
  }

  return (
    <Layout>
      <Box>
        <Heading>User Profile</Heading>
        <UnorderedList>
          <ListItem>ID: {authUser.user?.id}</ListItem>
          <ListItem>Email: {authUser.user?.email}</ListItem>
          <ListItem>Created At: {authUser.user?.created_at}</ListItem>
          <ListItem>JWT Role: {authUser.jwtPayload?.role}</ListItem>
          <ListItem>JWT Expiration: {authUser.jwtPayload?.exp}</ListItem>
        </UnorderedList>
      </Box>
    </Layout>
  );
};

export default Privada;
