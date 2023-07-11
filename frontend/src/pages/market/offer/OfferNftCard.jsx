import {
    Box,
    Text,
    Image,
    Button,
    Flex,
    Badge,
    useDisclosure,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Accordion,
} from "@chakra-ui/react";
import { BiDetail } from "react-icons/bi";
import { useEffect, useState } from "react";
import Nfts from "../../../components/Nfts";
import OfferModal from "./OfferModal";
import { MarketContract, OGNFTContract } from "../../../lib/web3.config";
import axios from "axios";
import Web3 from "web3";
const web3 = new Web3(window.ethereum);

const OfferNft = ({ offerId, account }) => {
    const [offerMetadata, setOfferMetadata] = useState();
    const [price, setPrice] = useState();
    const getOfferTokenURI = async () => {
        try {
            const response = await MarketContract.methods.OGNftList(offerId).call();
            const responseTokenURI = await OGNFTContract.methods
                .tokenURI(Number(response.OGTokenId))
                .call();
            const responseMetadata = await axios.get(responseTokenURI);
            setOfferMetadata(responseMetadata.data);
            setPrice(web3.utils.fromWei(Number(response?.price), "ether"));
        } catch (error) {
            console.log(error);
        }
    };

    const [show, setShow] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        getOfferTokenURI();
    }, []);

    return (
        <Box className="flex flex-col justify-center items-center">
            <Box className="max-w-[256px] border rounded-md mb-10 mt-4">
                {offerMetadata ? (
                    <>
                        {show ? (
                            <Box
                                className=" cursor-pointer"
                                onClick={() => {
                                    setShow(false);
                                }}
                            >
                                <Image
                                    src={offerMetadata?.image}
                                    className="w-[256px] rounded-t-md "
                                />
                            </Box>
                        ) : (
                            <Box
                                className=" cursor-pointer"
                                onClick={() => {
                                    setShow(true);
                                }}
                            >
                                <Nfts />
                            </Box>
                        )}

                        <Box className="bg-gray-100 w-full px-4 py-1">
                            <Text>{offerMetadata?.name}</Text>
                            <Text className="text-blue-400 text-sm mt-1">One(20 piece)</Text>
                            <Text className="text-blue-500 font-semibold mt-1">{price}</Text>

                            <Accordion allowMultiple>
                                <AccordionItem>
                                    <h2>
                                        <AccordionButton>
                                            <Box as="span" flex="1" textAlign="left">
                                                <Box className="flex">
                                                    <BiDetail className="mt-1 mr-1" />
                                                    Details
                                                </Box>
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <Box className="text-xs">
                                            <Box>{offerMetadata?.description}</Box>
                                            <Box>
                                                {offerMetadata?.attributes.map((v, i) => (
                                                    <Flex key={i} alignItems="center" mt={1}>
                                                        <Text fontWeight="bold" mr={2}>
                                                            {v.trait_type}:
                                                        </Text>
                                                        <Badge colorScheme="blue" fontSize="xs">
                                                            {v.value}
                                                        </Badge>
                                                    </Flex>
                                                ))}
                                            </Box>
                                        </Box>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </Box>
                        <Box className="bg-gray-100 w-full flex justify-center py-2">
                            <Button
                                colorScheme="blue"
                                className="font-bold text-white  px-4 py-2 rounded-md "
                                onClick={account ? onOpen : () => alert("Need to Connect Metamask")}
                            >
                                Make Offer
                            </Button>
                        </Box>
                        <OfferModal
                            isOpen={isOpen}
                            onClose={onClose}
                            offerMetadata={offerMetadata}
                            price={price}
                            offerId={offerId}
                            account={account}
                        />
                    </>
                ) : (
                    <Button isLoading loadingText="Loading" colorScheme="blue" variant="outline">
                        Loading
                    </Button>
                )}
            </Box>
        </Box>
    );
};
export default OfferNft;
