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
    const offerAmountArr = [];
    const [bestOfferAmount, setBestOfferAmount] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const onClickOffer = async (e) => {
        e.preventDefault();
        try {
            const offerAmount = Number(web3.utils.toWei(inputOffer, "ether"));
            setIsLoading(true); // Set the loading state to true
            const response = await MarketContract.methods
                .offering(offerId)
                .send({ from: account, value: offerAmount })
                .on("transactionHash", () => {
                    console.log("Transaction sent");
                })
                .on("confirmation", (confirmationNumber, receipt) => {
                    console.log("Transaction confirmed");
                });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
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

            responseGetOfferAmount.map((v) => {
                offerAmountArr.push(parseInt(v) / 10 ** 18);
            });
            setBestOfferAmount(
                offerAmountArr != 0 ? offerAmountArr.sort((a, b) => b - a)[0] : price
            );
            console.log(bestOfferAmount);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(price);
    console.log(bestOfferAmount);

    useEffect(() => {
        getOfferList();
    }, []);

    return (
        <Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="flex justify-center bg-gray-100 rounded-t-md">
                        <Box position="relative" display="inline-block">
                            {/* Horizontal Lines */}
                            <Box
                                position="absolute"
                                top="25%"
                                left="0"
                                right="0"
                                height="2px"
                                background="white"
                            ></Box>
                            <Box
                                position="absolute"
                                top="50%"
                                left="0"
                                right="0"
                                height="2px"
                                background="white"
                            ></Box>
                            <Box
                                position="absolute"
                                top="75%"
                                left="0"
                                right="0"
                                height="2px"
                                background="white"
                            ></Box>
                            {/* Vertical Lines */}
                            <Box
                                position="absolute"
                                top="0"
                                bottom="0"
                                left="20%"
                                width="2px"
                                background="white"
                            ></Box>
                            <Box
                                position="absolute"
                                top="0"
                                bottom="0"
                                left="40%"
                                width="2px"
                                background="white"
                            ></Box>
                            <Box
                                position="absolute"
                                top="0"
                                bottom="0"
                                left="60%"
                                width="2px"
                                background="white"
                            ></Box>
                            <Box
                                position="absolute"
                                top="0"
                                bottom="0"
                                left="80%"
                                width="2px"
                                background="white"
                            ></Box>
                            {/* Image */}
                            <Image src={offerMetadata?.image} w={"256px"} />
                        </Box>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text className="font-semibold">{offerMetadata?.name}</Text>
                        <Text className="text-blue-500 font-semibold mt-1">Price: {price} ETH</Text>
                        <Box className="mt-4 text-sm font-semibold">
                            <Box>
                                <Text className="text-center font-bold text-lg">Offer list</Text>
                                <Box className="flex justify-center">
                                    <Text className="text-semibold mr-4">The highest bid : </Text>
                                    <Text className="text-blue-700"> {bestOfferAmount} ETH</Text>
                                </Box>
                                <Box className="flex justify-around mt-2 bg-gray-100 py-2 rounded-lg">
                                    <Box className="text-xs">
                                        <Text className=" font-bold text-sm">Price</Text>
                                        <Box className="flex flex-col-reverse">
                                            {offerAmount?.map((m, i) => {
                                                return (
                                                    <Text key={i} className="text-blue-600 mt-1 ">
                                                        {Number(m) / 10 ** 18} eth
                                                    </Text>
                                                );
                                            })}
                                        </Box>
                                    </Box>
                                    <Box className="text-xs">
                                        <Text className="font-bold text-sm">Offer</Text>
                                        <Box className="flex flex-col-reverse">
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
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <form
                            onSubmit={
                                bestOfferAmount < inputOffer
                                    ? onClickOffer
                                    : (e) => {
                                          e.preventDefault();
                                          alert("Check offer price");
                                      }
                            }
                        >
                            <Box className="flex items-center">
                                <input
                                    type="text"
                                    value={inputOffer}
                                    onChange={(e) => setInputOffer(e.target.value)}
                                    placeholder={`${bestOfferAmount}`}
                                    className="bg-gray-200 rounded-md border border-black text-center py-1"
                                />
                                <Text className="ml-1 font-bold mr-2">ETH</Text>
                                <Button
                                    type="submit"
                                    colorScheme="blue"
                                    mr={1}
                                    ml={1}
                                    isLoading={isLoading}
                                    loadingText="Loading"
                                >
                                    Offer
                                </Button>
                            </Box>
                        </form>

                        <Button colorScheme="teal" onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default OfferModal;
