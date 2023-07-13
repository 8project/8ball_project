import {
  Box,
  Text,
  Image,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { MarketContract, PieceMarketContract } from "../../../lib/web3.config";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

const PieceNftModal = ({ num, pieceTokenListArray, account }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pieceDatas, setPieceDatas] = useState();
  const [piecePrice, setPiecePrice] = useState();

  const getPieceURIs = async () => {
    try {
      const response = await MarketContract.methods.tokenURI(num).call();
      const pieceMetadata = await axios.get(response);
      setPieceDatas(pieceMetadata.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPieceTokenPrice = async () => {
    try {
      const priceResponse = await PieceMarketContract.methods
        .PieceNftList(pieceDatas?.edition)
        .call();
      setPiecePrice(web3.utils.fromWei(Number(priceResponse.price), "ether"));
    } catch (error) {
      console.error(error);
    }
  };

  const onClickBuyPieceToken = async (e) => {
    e.preventDefault();
    try {
      const response = await PieceMarketContract.methods
        .buyPieceToken(pieceDatas?.edition)
        .send({ from: account, value: web3.utils.toWei(piecePrice, "ether") });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPieceURIs();
    getPieceTokenPrice();
  }, []);

  // console.log(pieceDatas.edition);
  // useEffect(() => {
  //     console.log(pieceTokenListArray[0]);
  // }, pieceTokenListArray);
  // useEffect(() => {
  //     console.log(pieceTokenListArray?.includes(pieceDatas?.edition));
  // }, [pieceTokenListArray]);

  return (
    <Box>
      <Box>
        <Image
          onClick={
            account
              ? pieceTokenListArray?.includes(pieceDatas?.edition) === true
                ? onOpen
                : (e) => {
                    e.preventDefault();
                  }
              : () => {
                  alert("Need to Connect Metamask");
                }
          }
          src={pieceDatas?.image}
          className={`${
            pieceTokenListArray?.includes(pieceDatas?.edition) === true
              ? "cursor-pointer hover:scale-110 hover:rounded-md"
              : "opacity-20 "
          }`}
        />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="flex justify-center bg-gray-100 rounded-t-md">
            <Image className="w-[256px] rounded-md" src={pieceDatas?.image} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text className="font-semibold">
              {pieceDatas?.name} #{num}
            </Text>
            <Text className="text-blue-400 text-sm mt-1">
              Piece Number: {num}
            </Text>
            <Text className="text-blue-500 font-semibold mt-1">
              Price: {piecePrice} ETH
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={2} onClick={onClickBuyPieceToken}>
              Buy now
            </Button>
            <Button colorScheme="gray" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PieceNftModal;
