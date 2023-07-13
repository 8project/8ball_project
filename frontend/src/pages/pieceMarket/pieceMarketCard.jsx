import { Box, Text, Button } from "@chakra-ui/react";
import BAYC5895 from "./pieceNfts/BAYC5895";
import { useEffect, useState } from "react";
import {
  MarketContract,
  PieceMarketContractAddress,
  PieceMarketContract,
} from "../../lib/web3.config";
import axios from "axios";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

const PieceMarketCard = ({ baseId, account, indexId }) => {
  const [a, setA] = useState();
  const [pieceData, setPieceData] = useState();
  const [pieceTokenListArray, setPieceTokenListArray] = useState();
  const [rangePiece, setRangePiece] = useState([]);
  const [price, setPrice] = useState(0);

  const imgNum = [];
  const getRange = () => {
    for (var j = 20 * baseId - 19; j <= 20 * baseId; j++) {
      imgNum.push(j);
    }
    setA(imgNum);
  };

  const getPieceURI = async () => {
    try {
      const response = await MarketContract.methods.tokenURI(baseId).call();

      const pieceMetadata = await axios.get(response);
      setPieceData(pieceMetadata.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getPieceTokenURI = async () => {
    try {
      const priceResponse = await PieceMarketContract.methods
        .PieceNftList(indexId)
        .call();
      console.log("priceResponse:", priceResponse);
      setPrice(web3.utils.fromWei(Number(priceResponse.price), "ether"));
    } catch (error) {
      console.error(error);
    }
  };

  const getMyNftTokenId_Pieces = async () => {
    try {
      const response = await MarketContract.methods
        .getMyNftTokenId_Piece(PieceMarketContractAddress)
        .call();

      const pieceMarketTokenArray = response.map((v) => {
        return Number(v);
      });
      setPieceTokenListArray(pieceMarketTokenArray);

      for (let i = 0; i < pieceMarketTokenArray.length; i++) {}
    } catch (error) {
      console.log(error);
    }
  };

  const listPieceNum = [];
  const checkOutListPieceTokenId = () => {
    var A = 20 * baseId - 19;
    var Z = 20 * baseId;
    for (var k = 0; k < pieceTokenListArray?.length; k++) {
      if (A <= pieceTokenListArray[k] && pieceTokenListArray[k] <= Z) {
        listPieceNum.push(pieceTokenListArray[k]);
      }
    }
    setRangePiece(listPieceNum);
  };

  useEffect(() => {
    getRange();
    getPieceTokenURI();
    console.log("price", price);
  }, []);

  useEffect(() => {
    console.log("rangePiece,", rangePiece);
  }, [rangePiece]);

  //   useEffect(() => {
  //     console.log(a);
  //   }, [imgNum]);
  useEffect(() => {
    console.log("pieceTokenListArray,", pieceTokenListArray);
  }, [pieceTokenListArray]);

  useEffect(() => {
    getPieceURI();
    getMyNftTokenId_Pieces();
  }, []);

  useEffect(() => {
    checkOutListPieceTokenId();
  }, [pieceTokenListArray]);

  return (
    <Box>
      {a ? (
        <Box className="mt-10 flex flex-col justify-center items-center">
          <Box className="grid grid-cols-5 gap-1 lg:w-[512px] w-[256px] border">
            {a?.map((num) => {
              return (
                <Box>
                  <Box>
                    <BAYC5895
                      num={num}
                      pieceTokenListArray={pieceTokenListArray}
                      account={account}
                      price={price}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box className="flex justify-between px-4 py-2 lg:w-[512px] w-[256px] bg-gray-100 rounded-b-md">
            <Box>
              <Text className="font-semibold">
                {pieceData?.name} #{a?.[0]}~#{a?.[19]}
              </Text>
              <Text className=" text-blue-500">Total Piece: 20</Text>
            </Box>
            <Box className="flex flex-col justify-end items-end lg:text-sm text-xs">
              <Text className="font-semibold">Sales list</Text>
              <Text>{rangePiece?.length}/20</Text>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <Button
            isLoading
            loadingText="Loading"
            colorScheme="blue"
            variant="outline"
          >
            Loading
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PieceMarketCard;
