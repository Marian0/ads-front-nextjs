import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Spinner, useToast } from "@chakra-ui/react";

import Layout from "../../components/Layout";
import { withAuthUser } from "../../hocs/withAuthUser";
import { AuthUser } from "../../contexts/auth-user-context";
import { AdStatus } from "../../types/ad-status.enum";
import AdSimple from "../../components/Ads/AdSimple.component";
import { Ad } from "../../types/ad";
import { Role } from "../../types/role.enum";

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
  const toast = useToast();

  useEffect(() => {
    const fetchAds = async () => {
      try {
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
      } catch (error) {
        toast({
          title: "Error!",
          description: "There was an error trying to get your ads",
          status: "error",
        });
      }
    };

    fetchAds();
  }, [authUser, toast]);

  const deleteAd = async (ad: Ad) => {
    try {
      setIsLoading(true);
      const requestOptions: RequestInit = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser.jwtToken}`,
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADS_BACKEND_URL}ads/${ad.id}`,
        requestOptions
      );

      if (response.status !== 200) {
        throw new Error("Wrong status response");
      }

      ads && setAds(ads.filter((a) => a.id !== ad.id));
      setIsLoading(false);
      toast({
        title: "Ad deleted successfully!",
        description: "The Ad has been correctly removed!",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error!",
        status: "error",
        description: "There was an error trying to delete this ad",
      });
    }
  };

  return (
    <Layout>
      <Box>
        <Heading>My Ads</Heading>
        {isLoading && <Spinner color="red.500" />}
        {!ads || (ads.length === 0 && <p>There are no ads</p>)}
        {ads?.map((ad) => (
          <div key={ad.id}>
            <AdSimple ad={ad} />
            {ad.status === AdStatus.APPROVED ||
              (authUser.jwtPayload?.role === Role.ADMIN && (
                <Button onClick={() => deleteAd(ad)}>Delete</Button>
              ))}
          </div>
        ))}
      </Box>
    </Layout>
  );
};

export default withAuthUser(ListAds);
