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

const OfferModal = ({ isOpen, onClose, offerMetadata, price, offerId, account }) => {
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
            // console.log(responseOffer);
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
                        <Text className="text-blue-500 font-semibold mt-1">Price: {price} ETH</Text>
                        <Box className="mt-4 text-sm font-semibold">
                            <Box>
                                <Text className="text-center font-bold text-lg">Offer list</Text>
                                <Box className="flex justify-around mt-2 bg-gray-100 py-2 rounded-lg">
                                    <Box className="text-xs">
                                        <Text className=" font-bold text-sm">Price</Text>
                                        {offerAmount?.map((m, i, c) => {
                                            return (
                                                <Text key={i} className="text-blue-600 mt-1">
                                                    {Number(m) / 10 ** 18} eth
                                                </Text>
                                            );
                                        })}
                                    </Box>
                                    <Box className="text-xs">
                                        <Text className="font-bold text-sm">Offer</Text>
                                        {offerAccount?.map((c, i) => {
                                            return (
                                                <Text key={i} className="text-gray-600 mt-1">
                                                    {c.substring(0, 4)}...{c.slice(-4)}
                                                </Text>
                                            );
                                        })}
                                    </Box>
                                </Box>
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
                            <form
                                onSubmit={
                                    onClickOffer
                                    /* 
                                  Number(offerAmount / 10 ** 18) < inputOffer / 10 ** 18
                                        ? onClickOffer
                                        : (e) => {
                                              e.preventDefault();
                                              alert("Check offer price");
                                          }
                                */
                                }
                            >
                                <input
                                    type="text"
                                    value={inputOffer}
                                    onChange={(e) => setInputOffer(e.target.value)}
                                    placeholder="Ethereum"
                                    className="bg-gray-200 rounded-md border border-black text-center py-1"
                                />
                                <Button type="submit" colorScheme="blue" mr={2} ml={2}>
                                    Offer
                                </Button>
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
