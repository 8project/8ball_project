import {
  Box,
  Text,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  InputRightAddon,
  Input,
  FormControl,
} from "@chakra-ui/react";
import Web3 from "web3";
import { PieceMarketContract } from "../../../lib/web3.config";
import { useState } from "react";

const web3 = new Web3(window.ethereum);
const MyPieceNftModal = ({
  isOpen,
  onClose,
  pieceTokenData,
  pieceId,
  account,
}) => {
  const [inputPrice, setInputPrice] = useState();

  const onClickPieceListForSell = async (e) => {
    e.preventDefault();
    try {
      const saleAmount = Number(web3.utils.toWei(inputPrice, "ether"));
      const response = await PieceMarketContract.methods
        .listPieceTokenForSale(pieceId, saleAmount)
        .send({ from: account });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="flex justify-center bg-gray-100 rounded-t-md">
            <Image src={pieceTokenData?.image} w={"256px"} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text className="font-semibold">
              {pieceTokenData?.name} #{pieceTokenData?.edition}
            </Text>
          </ModalBody>
          <FormControl>
            <ModalFooter>
              <InputGroup focusBorderColor="blue">
                <Input
                  type="number"
                  placeholder="Piece Price"
                  value={inputPrice}
                  onChange={(event) =>
                    setInputPrice(parseFloat(event.target.value))
                  }
                />
                <InputRightAddon children="ETH" colorScheme="blue" />
              </InputGroup>
              <Button
                colorScheme="blue"
                mr={2}
                ml={2}
                onClick={onClickPieceListForSell}
              >
                Sell
              </Button>
              <Button colorScheme="teal" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </FormControl>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MyPieceNftModal;
