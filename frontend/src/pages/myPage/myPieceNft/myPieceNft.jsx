import { Box, Text, Button } from "@chakra-ui/react";
import MyPieceNftCard from "./myPieceNftCard";
import { useEffect, useState } from "react";
import {
  MarketContract,
  PieceMarketContract,
  PieceMarketContractAddress,
} from "../../../lib/web3.config";

const MyPieceNft = ({ account }) => {
  const [pieceTokenIds, setPieceTokenIds] = useState([]);
  const [notListTokenIds, setNotListTokenIds] = useState([]);
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

      for (var j = 0; j < pieceTokenIds.length; j++) {
        const pieceStatus = await PieceMarketContract.methods
          .PieceNftList(pieceTokenIds[j])
          .call();
        if (pieceStatus.status == 0) {
          setNotListTokenIds((prev) => [...prev, pieceTokenIds[j]]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkApprovalStatus = async () => {
    try {
      const checkApproved = await MarketContract.methods
        .isApprovedForAll(account, PieceMarketContractAddress)
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
        .setApprovalForAll(PieceMarketContractAddress, true)
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
      {notListTokenIds.map((p, i) => (
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
