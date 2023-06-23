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
import img from "../../../images/testFoloder/20220501000342_0.jpg";

const OfferModal = ({ isOpen, onClose }) => {
    return (
        <Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="flex justify-center bg-gray-100 rounded-t-md">
                        <Image src={img} w={"256px"} />
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text className="font-semibold">Kongz #7332</Text>
                        <Text className="text-blue-400 text-sm mt-1">Piece: 1</Text>
                        <Text className="text-blue-500 font-semibold mt-1">Price: 1 ETH</Text>
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
                                            <Tr>
                                                <Td>1.5 ETH</Td>
                                                <Td>0x39...efgh</Td>
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
                            <Button colorScheme="blue" mr={2} ml={2}>
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