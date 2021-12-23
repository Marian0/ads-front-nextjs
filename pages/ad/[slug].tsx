import Link from "next/link";
import { Link as ReactLink } from "@chakra-ui/react";
import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { Ad } from "../../types/ad";
import Layout from "../../components/Layout";
import LoadingOverlay from "../../components/LoadingOverlay";

type Props = {
  ad: Ad;
  slug: string;
};

export default function AdProfile({ ad }: Props) {
  if (!ad) {
    return <LoadingOverlay />;
  }

  return (
    <Layout>
      <VStack align="stretch" spacing={4} w="100%">
        <Box>
          <Heading>{ad.title}</Heading>
        </Box>
        <Box>
          <Text>{ad.description}</Text>
        </Box>
        <Link passHref href="/">
          <ReactLink href="/">
            Back to Home <ExternalLinkIcon mx="2px" />
          </ReactLink>
        </Link>
      </VStack>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context || !context.params || !context.params.slug) {
    return {
      notFound: true,
    };
  }
  const res = await fetch(
    `${process.env.ADS_BACKEND_URL}ads/${context.params.slug}`
  );

  if (res.status === 404) {
    return {
      notFound: true,
    };
  }

  const ad: Ad[] = await res.json();

  return {
    props: {
      ad,
    },
  };
};
