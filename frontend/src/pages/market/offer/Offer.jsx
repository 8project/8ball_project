import { Box, Text } from "@chakra-ui/react";
import OfferNftCard from "./OfferNftCard";
import { useEffect, useState } from "react";
import {
  MarketContract,
  MarketContractAddress,
  OGNFTContract,
} from "../../../lib/web3.config";

const Offer = ({ account }) => {
  const [fundingComplete, setFundingComplete] = useState([]);

  const getNftMetadata = async () => {
    try {
      const response = await OGNFTContract.methods
        .getMyNftTokenId_OG(MarketContractAddress)
        .call();

      const marketTokenArray = response.map((v) => {
        return Number(v);
      });

      for (var j = 1; j <= marketTokenArray.length; j++) {
        const response = await MarketContract.methods
          .OGListForSale_buyerList(j)
          .call();
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
      <Box className="flex flex-col justify-center items-center border rounded-lg px-4 py-2">
        <Text className=" font-[Tenada] mt-2">
          조각 NFT를 <span className="text-lg text-blue-600">하나로</span>{" "}
          합쳐보세요.
        </Text>
        <Box className="text-xs mt-2">
          <Text>* Offer를 통해 조각NFT를 온전한 NFT로 구매 가능합니다.</Text>
          <Text>* Offer는 월~수요일에 가능합니다</Text>
          <Text>* 금~토요일에 최고 제안가에 대한 판매 투표를 진행합니다.</Text>
          <Text>* 투표자 60% 이상이 찬성시 NFT를 구매할 수 있습니다.</Text>
        </Box>
      </Box>
      <Box className="grid lg:grid-cols-2 gap-14">
        {fundingComplete?.map((o, i) => {
          return <OfferNftCard key={i} offerId={o} account={account} />;
        })}
      </Box>
    </Box>
  );
};

export default Offer;
