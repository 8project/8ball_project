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
import { MarketContract } from "../../../lib/web3.config";
import Web3 from "web3";
import { useEffect, useState } from "react";
const web3 = new Web3(window.ethereum);

const OfferModal = ({
  isOpen,
  onClose,
  offerMetadata,
  price,
  offerId,
  account,
}) => {
  const [inputOffer, setInputOffer] = useState();
  const [offerAccount, setOfferAccount] = useState([]);
  const [offerAmount, setOfferAmount] = useState([]);

  const onClickOffer = async (e) => {
    e.preventDefault();
    try {
      const offerAmount = Number(web3.utils.toWei(inputOffer, "ether"));
      const responseOffer = await MarketContract.methods
        .offering(offerId)
        .send({ from: account, value: offerAmount });
      console.log(responseOffer);
    } catch (error) {
      console.log(error);
    }
  };

  const getOfferList = async () => {
    try {
      const responseGetOfferAccount = await MarketContract.methods
        .getOfferAccount(offerId)
        .call();
      const responseGetOfferAmount = await MarketContract.methods
        .getOfferAmount(offerId)
        .call();
      setOfferAccount(responseGetOfferAccount);
      setOfferAmount(responseGetOfferAmount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOfferList();
  }, []);

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
                        {offerAmount?.map((m, i) => {
                          return <Td key={i}>{Number(m) / 10 ** 18}</Td>;
                        })}
                        {offerAccount?.map((c, i) => {
                          return (
                            <Td key={i}>
                              {c.substring(0, 4)}...{c.slice(-4)}
                            </Td>
                          );
                        })}
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </ModalBody>
          <FormControl>
            <ModalFooter>
              {/* <InputGroup focusBorderColor="blue">
                <Input type="number" placeholder="Price" />
                <InputRightAddon children="ETH" colorScheme="blue" />
              </InputGroup>
              <Button   onClick={onClickOffer} 
                colorScheme="blue"
                mr={2}
                ml={2}
              >
                Offer
              </Button> */}
              <form onSubmit={onClickOffer}>
                <input
                  type="text"
                  value={inputOffer}
                  onChange={(e) => setInputOffer(e.target.value)}
                  className="bg-blue-100"
                />
                <input type="submit" value="Offer" className="bg-yellow-100" />
              </form>
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
