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

const web3 = new Web3(window.ethereum);
const MyPieceNftModal = ({ isOpen, onClose }) => {
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="flex justify-center bg-gray-100 rounded-t-md">
            <Image src="/img/8thPiece.png" w={"256px"} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text className="font-semibold">BAYC #5895-8</Text>
          </ModalBody>

          <FormControl>
            <ModalFooter>
              <InputGroup focusBorderColor="blue">
                <Input type="number" placeholder="Piece Price" />
                <InputRightAddon children="ETH" colorScheme="blue" />
              </InputGroup>
              <Button colorScheme="blue" mr={2} ml={2}>
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
