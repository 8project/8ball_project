import { Box, Text } from "@chakra-ui/react";
import ToTopBtn from "../../components/ToTopBtn";
import { useEffect, useState } from "react";
import {
  MarketContract,
  MarketContractAddress,
  OGNFTContract,
} from "../../lib/web3.config";
import Web3 from "web3";
import PieceMarketCard from "./pieceMarketCard";
const web3 = new Web3(window.ethereum);

function PieceMarket({ account }) {
  const [fundingComplete, setFundingComplete] = useState([]);

  const P = [];
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

        if (response.length === 20) {
          P.push(j);
        }
      }
      setFundingComplete(P);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   console.log(fundingComplete);
  // }, [fundingComplete]);

  useEffect(() => {
    getNftMetadata();
  }, []);

  return (
    <Box className="relative mt-[60px] mb-[72px] lg:max-w-[800px] max-w-[460px] py-4">
      <ToTopBtn />
      <Box className=" cursor-default py-2">
        <Text className="flex justify-center lg:text-xl text-md font-[Tenada]">
          Piece Market
        </Text>
        <Box className="flex flex-col justify-center items-center mt-2 py-2 border roundedlg rounded-lg">
          <Text className="font-[Tenada]">
            8Ball에서만 경험 할 수 있는{" "}
            <span className="text-lg text-blue-700">조각 NFT</span>
          </Text>
          <Box className="text-xs px-2">
            <Text>* 조각 NFT는 펀딩한 NFT를 실제로 20등분 합니다.</Text>
            <Text>
              * 조각 NFT 당 펀딩 NFT에 대해 5%의 지분율을 갖게 됩니다.
            </Text>
            <Text>* 조각 NFT는 PieceMarket에서 유저간 거래가 가능합니다.</Text>
          </Box>
        </Box>
      </Box>
      {fundingComplete?.map((p, i) => {
        return <PieceMarketCard baseId={p} key={i} account={account} />;
      })}
    </Box>
  );
}
export default PieceMarket;
