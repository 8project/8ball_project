import { Box, Text, Button } from "@chakra-ui/react";
import MyPieceNftCard from "./myPieceNftCard";
import { useEffect, useState } from "react";
import {
  MarketContract,
  MarketContractAddress,
} from "../../../lib/web3.config";

const MyPieceNft = ({ account }) => {
  const [pieceTokenIds, setPieceTokenIds] = useState([]);
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

  const checkApprovalStatus = async () => {
    try {
      const checkApproved = await MarketContract.methods
        .isApprovedForAll(account, MarketContractAddress)
        .call({ from: account });
      setIsApproved(checkApproved);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickPieceApprove = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await MarketContract.methods
        .setApprovalForAll(MarketContractAddress, true)
        .send({ from: account });

      if (response.status) {
        setIsApproved(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyNftTokenIds_Piece();
    checkApprovalStatus();
  }, []);

  return (
    <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
      <Text>
        My Piece NFT
        <Box>
          Sell Status{" "}
          {isApproved ? (
            <Button colorScheme="green" size="sm" variant="outline">
              Possible
            </Button>
          ) : (
            <Button
              colorScheme="red"
              size="sm"
              variant="outline"
              onClick={onClickPieceApprove}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Approved"}
            </Button>
          )}
        </Box>
      </Text>
      {pieceTokenIds.map((p, i) => (
        <MyPieceNftCard
          key={i}
          pieceId={p}
          account={account}
          isApproved={isApproved}
          onClickPieceApprove={onClickPieceApprove}
        />
      ))}
    </Box>
  );
};

export default MyPieceNft;
