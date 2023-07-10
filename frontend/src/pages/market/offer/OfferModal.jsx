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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  InputGroup,
  InputRightAddon,
  Input,
  FormControl,
} from "@chakra-ui/react";

const OfferModal = ({ isOpen, onClose, offerMetadata, price }) => {
  // const onClickOffer = async () => {
  //     try {
  //         const
  //     } catch (error) {
  //         console.log();
  //     }
  // }

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="flex justify-center bg-gray-100 rounded-t-md">
            <Image src={offerMetadata?.image} w={"256px"} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text className="font-semibold">{offerMetadata?.name}</Text>
            <Text className="text-blue-400 text-sm mt-1">One</Text>
            <Text className="text-blue-500 font-semibold mt-1">
              Price: {price} ETH
            </Text>
            <Box className="mt-4 text-sm font-semibold">
              <Box>
                <Text>Offer list</Text>
                <TableContainer className="mt-1">
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>price</Th>
                        <Th>from</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>1.2 ETH</Td>
                        <Td>0x94...abcd</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </ModalBody>
          <FormControl>
            <ModalFooter>
              <InputGroup focusBorderColor="blue">
                <Input type="number" placeholder="Price" />
                <InputRightAddon children="ETH" colorScheme="blue" />
              </InputGroup>
              <Button /*  onClick={onClickOffer} */
                colorScheme="blue"
                mr={2}
                ml={2}
              >
                Offer
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

export default OfferModal;
