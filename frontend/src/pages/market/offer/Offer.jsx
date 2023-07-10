import { Box } from "@chakra-ui/react";
import OfferNftCard from "./OfferNftCard";
import { useEffect, useState } from "react";
import {
  MarketContract,
  MarketContractAddress,
  OGNFTContract,
} from "../../../lib/web3.config";

const Offer = () => {
  const [fundingComplete, setFundingComplete] = useState([]);

  const getNftMetadata = async () => {
    try {
      const response = await OGNFTContract.methods.getMyNftTokenId_OG(MarketContractAddress).call();

      const marketTokenArray = response.map((v) => {return Number(v);});

      for (var j = 1; j <= marketTokenArray.length; j++) {
        const response = await MarketContract.methods.OGListForSale_buyerList(j).call();
        if (response.length == 20) {
          setFundingComplete((prev) => [...prev, j]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(fundingComplete);
  }, [fundingComplete]);

  useEffect(() => {
    getNftMetadata();
  }, []);

  return (
    <Box className="lg:max-w-[800px] max-w-[460px]">
      <Box className="grid lg:grid-cols-2 gap-14">
        {fundingComplete?.map((o, i) => {
          return <OfferNftCard key={i} offerId={o} />;
        })}
      </Box>
    </Box>
  );
};

export default Offer;
