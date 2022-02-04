import React, { useEffect, useState } from "react";
import { Box, Heading, Spinner } from "@chakra-ui/react";

import Layout from "../../components/Layout";
import { withAuthUser } from "../../hocs/withAuthUser";
import { AuthUser } from "../../contexts/auth-user-context";
import { AdStatus } from "../../types/ad-status.enum";
import AdSimple from "../../components/Ads/AdSimple.component";

type Props = {
  authUser: AuthUser;
};

type GetAdsResponseType = Array<{
  id: string;
  slug: string;
  title: string;
  description: string;
  status: AdStatus;
  created_at: string;
  updated_at: string;
  userId: string;
  user: string;
}>;

const ListAds = ({ authUser }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ads, setAds] = useState<GetAdsResponseType | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      if (!authUser || !authUser.user?.id) {
        return;
      }
      setIsLoading(true);
      const requestOptions: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser.jwtToken}`,
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADS_BACKEND_URL}ads?user_id=${authUser.user?.id}`,
        requestOptions
      );

      if (response.status !== 200) {
        throw new Error("Wrong status response");
      }

      const jsonResponse: GetAdsResponseType = await response.json();

      if (!jsonResponse) {
        throw new Error("Wrong respnse format");
      }

      setAds(jsonResponse);
      setIsLoading(false);
    };

    fetchAds();
  }, [authUser]);

  return (
    <Layout>
      <Box>
        <Heading>My Ads</Heading>
        {isLoading && <Spinner color="red.500" />}
        {!ads || (ads.length === 0 && <p>There are no ads</p>)}
        <ul>
          {ads?.map((ad) => (
            <AdSimple key={ad.id} ad={ad} />
          ))}
        </ul>
      </Box>
    </Layout>
  );
};

export default withAuthUser(ListAds);
