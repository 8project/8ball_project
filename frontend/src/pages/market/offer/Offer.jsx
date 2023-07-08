import { Box } from "@chakra-ui/react";
import OfferNftCard from "./OfferNftCard";
import { useEffect, useState } from "react";
import {
  MarketContract,
  MarketContractAddress,
  OGNFTContract,
} from "../../../lib/web3.config";

const Offer = () => {
  const [OGTokenListArray, setOGTokenListArray] = useState([]);
  const [copy, setCopy] = useState([]);
  const [fundingComplete, setFundingComplete] = useState([]);

  const getNftMetadata = async () => {
    try {
      const response = await OGNFTContract.methods
        .getMyNftTokenId_OG(MarketContractAddress)
        .call();

      const marketTokenArray = response.map((v) => {
        return Number(v);
      });
      setOGTokenListArray(marketTokenArray);
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNftMetadata();
  }, []);

  const getCompleteFunding = async () => {
    try {
      var j;
      var count;
      for (j = 1; j <= OGTokenListArray.length; j++) {
        const response = await MarketContract.methods
          .OGListForSale_buyerList(j)
          .call();
        console.log(response.length);
        if (response.length == 20) {
          setFundingComplete([([count] = j), ...fundingComplete]);
          count++;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompleteFunding();
  }, []);

  return (
    <Box className="lg:max-w-[800px] max-w-[460px]">
      <Box className="grid lg:grid-cols-2 gap-14">
        <OfferNftCard />;
      </Box>
    </Box>
  );
};

export default Offer;
