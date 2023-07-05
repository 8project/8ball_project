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

const MyNftModal = ({ isOpen, onClose, onSubmit }) => {
  const [offerPrice, setOfferPrice] = useState(0);

  const handleOffer = () => {
    // 제안 버튼 클릭 시 필요한 동작 수행
    console.log("Offer submitted with price:", offerPrice);
    onSubmit();
    onClose();
  };

  const handlePriceChange = (event) => {
    const inputPrice = parseFloat(event.target.value);
    setOfferPrice(inputPrice);
  };

  const piecePrice = offerPrice ? (1 / 20) * offerPrice : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="flex justify-center bg-gray-100 rounded-t-md">
          <Image
            src={
              "https://ipfs.io/ipfs/QmavwZZLUcudbdBidTivN7pQTyyZKdmXXbYv4Z7vPjaBMa"
            }
            w={"256px"}
          />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text className="font-semibold">BAYC #5895</Text>
          <Text className="text-black text-sm mt-1 bg-gray-400 text-center">
            Piece Price: {piecePrice.toFixed(2)} ETH
          </Text>
        </ModalBody>
        <ModalFooter>
          <FormControl>
            <InputGroup focusBorderColor="blue">
              <Input
                type="number"
                placeholder="Price"
                value={offerPrice}
                onChange={handlePriceChange}
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
