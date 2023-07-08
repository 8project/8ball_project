
import { useState } from "react";
import {
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
import { MarketContract, OGNFTContractAddress } from "../../../lib/web3.config";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

const MyNftModal = ({ isOpen, onClose, onSubmit, tokenData, account }) => {
  const [offerPrice, setOfferPrice] = useState(0);

  const handleOffer = async (e) => {
    e.preventDefault();

    let priceInWei = web3.utils.toWei(offerPrice, "ether");

    try {
      const response = await MarketContract.methods
        .listForSale(OGNFTContractAddress, tokenData.edition, priceInWei)
        .send({ from: account });
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    onSubmit();
    onClose();
  };

  const piecePrice = offerPrice ? (1 / 20) * offerPrice : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="flex justify-center bg-gray-100 rounded-t-md">
          <div className="relative">
            <Image src={tokenData.image} className="rounded-t-md absolute" />
            <div className="top-0 w-[256px] h-[256px]  bg-white text-gray-950 flex justify-center items-center">
              Loading...
            </div>
          </div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text className="font-semibold">{tokenData.name}</Text>
          <Text className="text-black text-sm mt-1 bg-gray-400 text-center">
            Price: {piecePrice.toFixed(2)} ETH
          </Text>
        </ModalBody>
        <ModalFooter>
          <FormControl>
            <InputGroup focusBorderColor="blue">
              <Input
                type="number"
                placeholder="Price"
                value={offerPrice}
                onChange={(event) =>
                  setOfferPrice(parseFloat(event.target.value))
                }
              />
              <InputRightAddon children="ETH" colorScheme="blue" />
            </InputGroup>
          </FormControl>
          <Button colorScheme="blue" mr={2} ml={2} onClick={handleOffer}>
            Offer
          </Button>
          <Button colorScheme="teal" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MyNftModal;
