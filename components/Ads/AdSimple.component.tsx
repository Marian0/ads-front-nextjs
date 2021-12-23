import React from "react";
import Link from "next/link";
import { Text, Box, Heading, Badge } from "@chakra-ui/react";

import { Ad } from "../../types/ad";

export default function AdSimple({ ad }: { ad: Ad }) {
  return (
    <Link passHref href={`/ad/${ad.slug}`}>
      <Box
        _hover={{ backgroundColor: "gray.100" }}
        border="2px"
        borderColor="gray.200"
        borderRadius={5}
        cursor="pointer"
        padding={10}
      >
        <Heading fontSize={20}>{ad.title}</Heading>
        <Text>{ad.description}</Text>
        <Badge>{ad.status}</Badge>
      </Box>
    </Link>
  );
}
