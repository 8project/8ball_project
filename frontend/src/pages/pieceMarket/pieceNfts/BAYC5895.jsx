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
import { MarketContract } from "../../../lib/web3.config";
import { useEffect, useState } from "react";
import axios from "axios";

const BAYC5895 = ({ num }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pieceData, setPieceData] = useState();

  const getPieceURI = async () => {
    try {
      const response = await MarketContract.methods.tokenURI(num).call();
      const pieceMetadata = await axios.get(response);
      setPieceData(pieceMetadata.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPieceURI();
  }, []);

  return (
    <Box>
      <Box className="cursor-pointer ">
        <Image onClick={onOpen} src={pieceData?.image} />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="flex justify-center bg-gray-100 rounded-t-md">
            <Image className="w-[256px] rounded-md" src={pieceData?.image} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text className="font-semibold">
              {pieceData?.name} #{num}
            </Text>
            <Text className="text-blue-400 text-sm mt-1">
              Piece Number: {num}
            </Text>
            <Text className="text-blue-500 font-semibold mt-1">
              Price: 0.05 ETH
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={2}>
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

export default BAYC5895;
