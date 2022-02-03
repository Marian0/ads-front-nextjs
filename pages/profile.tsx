import { Box, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import React from "react";

import Layout from "../components/Layout";
import { AuthUser } from "../contexts/auth-user-context";
import { withAuthUser } from "../hocs/withAuthUser";

type Props = {
  authUser: AuthUser;
};

const Profile = ({ authUser }: Props) => {
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

export default withAuthUser(Profile);
