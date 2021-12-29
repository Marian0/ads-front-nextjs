import React from "react";
import { SimpleGrid, Heading, Stack } from "@chakra-ui/react";
import { GetStaticProps } from "next";

import { Ad } from "../types/ad";
import Layout from "../components/Layout";
import AdSimple from "../components/Ads/AdSimple.component";
import { AdStatus } from "../types/ad-status.enum";

type Props = {
  ads: Ad[];
};

const HomePage = ({ ads }: Props) => {
  return (
    <Layout>
      <Stack width="100%">
        <Stack>
          <Heading color="primary.500" paddingY={5}>
            Welcome to ads!
          </Heading>
        </Stack>
        <Stack>
          <SimpleGrid minChildWidth="200px" spacing="40px">
            {ads.map((ad) => (
              <AdSimple key={ad.id} ad={ad} />
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_ADS_BACKEND_URL}ads`);
  const data: Ad[] = await res.json();

  const ads = data
    // filter out blocked ads
    .filter((ad) => ad.status !== AdStatus.BLOCKED)
    // sort to get approved first
    .sort((a, b) => {
      return a.status === AdStatus.PENDING && b.status === AdStatus.APPROVED
        ? 1
        : -1;
    });

  return {
    props: {
      ads,
    },
    // seconds to revalidate
    revalidate: 20,
  };
};

export default HomePage;
