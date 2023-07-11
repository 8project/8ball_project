import { Box, Text, Button } from "@chakra-ui/react";
import MyPieceNftCard from "./myPieceNftCard";
import { useEffect, useState } from "react";
import {
  MarketContract,
  MarketContractAddress,
} from "../../../lib/web3.config";

const MyPieceNft = ({ account }) => {
  const [pieceTokenIds, setPieceTokenIds] = useState();
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getMyNftTokenIds_Piece = async () => {
    try {
      const response = await MarketContract.methods
        .getMyNftTokenId_Piece(account)
        .call();

      const userPieceTokenIdArray = response.map((v) => {
        return Number(v);
      });
      setPieceTokenIds(userPieceTokenIdArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyNftTokenIds_Piece();
  }, []);

  const onClickPieceApprove = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const checkApproved = await MarketContract.methods
        .isApprovedForAll(account, MarketContractAddress)
        .call({ from: account });
      if (checkApproved !== true) {
        const response = await MarketContract.methods
          .setApprovalForAll(MarketContractAddress, true)
          .send({ from: account });
        // if (response.status) {
        console.log(response);
        // }
      }
      setIsApproved(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
      <Text>
        My Piece NFT
        <Box>
          판매가능 상태{" "}
          <Button onClick={onClickPieceApprove}>
            {isApproved ? "가능" : "불가"}
          </Button>
        </Box>
      </Text>
      {pieceTokenIds?.map((p, i) => {
        return (
          <MyPieceNftCard
            key={i}
            pieceId={p}
            account={account}
            isApproved={isApproved}
            isLoading={isLoading}
          />
        );
      })}
    </Box>
  );
};

export default MyPieceNft;
