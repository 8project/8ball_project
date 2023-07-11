import {
  Box,
  Text,
  Image,
  Button,
  useDisclosure,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Accordion,
  Flex,
  Badge,
} from "@chakra-ui/react";
import FundingModal from "./FundingModal";
import { useState, useEffect } from "react";
import Web3 from "web3";
import axios from "axios";
import { MarketContract, OGNFTContract } from "../../../lib/web3.config";
import { BiDetail } from "react-icons/bi";

const web3 = new Web3(window.ethereum);

const FundingNftCard = ({ indexId, account }) => {
  const [tokenData, setTokenData] = useState();
  const [price, setPrice] = useState(0);
  const [buyerArray, setBuyerArray] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isFundingCompleted = buyerArray.length === 20;

  const getOGTokenURI = async () => {
    try {
      const priceResponse = await MarketContract.methods
        .OGNftList(indexId)
        .call();
      setPrice(web3.utils.fromWei(Number(priceResponse.price), "ether"));

      const response = await OGNFTContract.methods
        .tokenURI(Number(priceResponse.OGTokenId))
        .call();
      const metadataResponse = await axios.get(response);
      setTokenData(metadataResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getFundingBuyerList = async () => {
    try {
      const buyerArray = await MarketContract.methods
        .OGListForSale_buyerList(indexId)
        .call();
      setBuyerArray(buyerArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOGTokenURI();
    getFundingBuyerList();
  }, []);

  return (
    <Box className="flex flex-col justify-center items-center mb-10 ">
      {tokenData ? (
        <>
          {tokenData && (
            <Box className=" border rounded-md max-w-[256px]">
              <Box position="relative">
                {isFundingCompleted && (
                  <div className="absolute bg-black w-full h-full flex justify-center items-center text-2xl font-bold text-white">
                    Funding completed
                  </div>
                )}
                <Image
                  src={tokenData.image}
                  className={`w-[256px] rounded-t-md ${
                    isFundingCompleted ? "opacity-50" : ""
                  }`}
                  style={{ zIndex: 2 }}
                />
              </Box>
              <Box className="bg-gray-100 w-full px-4 py-1">
                <Box className="flex justify-between">
                  <Box>{tokenData.name}</Box>
                  {isFundingCompleted ? (
                    <Text className="cursor-default text-sm font-semibold text-blue-500 rounded-lg">
                      Completed
                    </Text>
                  ) : (
                    <Text className="cursor-default text-sm font-semibold text-green-500 rounded-lg">
                      Inprogress
                    </Text>
                  )}
                </Box>
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
                        <Box>{tokenData.description}</Box>
                        <Box>
                          {tokenData.attributes.map((v, i) => (
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

                <Box className="flex justify-around">
                  <Text className="text-blue-400 text-sm mt-1">
                    Each Piece :
                  </Text>
                  <Text className="text-blue-500 font-semibold mt-1">
                    {parseFloat((price / 20).toFixed(6))} ETH
                  </Text>
                </Box>
              </Box>
              <Box className="bg-gray-100 w-full flex justify-center py-2">
                <Button
                  colorScheme="blue"
                  className="font-bold text-white px-4 py-2 rounded-md"
                  onClick={
                    account ? onOpen : () => alert("Need to Connect Metamask")
                  }
                  isDisabled={isFundingCompleted}
                >
                  Funding
                </Button>
              </Box>
              <FundingModal
                isOpen={isOpen}
                onClose={onClose}
                indexId={indexId}
                account={account}
                tokenData={tokenData}
                price={price}
              />
            </Box>
          )}
        </>
      ) : (
        <Button
          isLoading
          loadingText="Loading"
          colorScheme="blue"
          variant="outline"
        >
          Loading
        </Button>
      )}
    </Box>
  );
};

export default FundingNftCard;
