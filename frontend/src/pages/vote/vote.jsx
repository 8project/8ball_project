import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import VoteBox from "./voteBox";
import {
  MarketContract,
  MarketContractAddress,
  OGNFTContract,
} from "../../lib/web3.config";
import Web3 from "web3";
const web3 = new Web3(window.ethereum);

function Vote({ account }) {
  const [voteTokenIds, setVoteTokenIds] = useState();

  var A = [];
  const getMyNftTokenId_OGs = async () => {
    try {
      const response = await OGNFTContract.methods
        .getMyNftTokenId_OG(MarketContractAddress)
        .call();
      const marketTokenIdArray = response.map((v) => {
        return Number(v);
      });
      console.log(marketTokenIdArray);
      for (let j = 0; j < marketTokenIdArray.length; j++) {
        const responseCurrentPoll = await MarketContract.methods
          .currentPolls(marketTokenIdArray[j])
          .call();
        const toEther = Number(responseCurrentPoll.bestOfferPrice);
        if (toEther > 0) {
          A.push(marketTokenIdArray[j]);
        }
      }
      setVoteTokenIds(A);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(voteTokenIds);
  }, [voteTokenIds]);

  useEffect(() => {
    getMyNftTokenId_OGs();
  }, []);

  return (
    <Box className="mt-[60px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
      <Box className="mt-6">
        <Text className="flex justify-center lg:text-xl text-md font-[Tenada]">
          Vote Page
        </Text>
        <Box className="mt-10">
          {voteTokenIds?.map((t, i) => {
            return <VoteBox key={i} tokenId={t} account={account} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}
export default Vote;
