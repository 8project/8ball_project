import {
  Box,
  Text,
  Image,
  useDisclosure,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Accordion,
  Button,
  Spinner,
  Flex,
  Badge,
} from "@chakra-ui/react";
import MyNftModal from "./myNftModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { MarketContractAddress, OGNFTContract } from "../../../lib/web3.config";
import { BiDetail } from "react-icons/bi";

const MyNftCard = ({ tokenId, account }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenData, setTokenData] = useState(null);

  const getOGTokenURI = async () => {
    try {
      const response = await OGNFTContract.methods.tokenURI(tokenId).call();
      const metadataResponse = await axios.get(response);
      setTokenData(metadataResponse.data);
      console.log(metadataResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickApprove = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const checkApproved = await OGNFTContract.methods
        .getApproved(tokenData.edition)
        .call({ from: account });
      if (checkApproved !== MarketContractAddress) {
        const response = await OGNFTContract.methods
          .approve(MarketContractAddress, tokenId)
          .send({ from: account });
        // if (response.status) {
        console.log(response);
        // }
      }
      setIsApproved(true);
      onOpen();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOGTokenURI();
  }, []);

  return (
    <Box className="flex flex-col justify-center items-center border rounded-md mb-10 ">
      {tokenData && (
        <div>
          <div className="relative">
            <Image src={tokenData.image} className=" rounded-t-md absolute" />
            <div className="top-0 w-[256px] h-[256px]  bg-white text-gray-950 flex justify-center items-center">
              Loading...
            </div>
          </div>
          <Box className="bg-gray-100 w-full px-4 py-1">
            <Text>{tokenData.name}</Text>
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
            <Flex justify="center">
              <Button
                colorScheme="blue"
                onClick={isApproved ? onOpen : onClickApprove}
                className="justify-center text-center w-full py-4"
                isLoading={isLoading}
                loadingText="Approving..."
                spinner={<Spinner size="sm" />}
                disabled={isApproved}
              >
                {isLoading
                  ? "Loading..."
                  : isApproved
                  ? "List for Sell"
                  : "Approved"}
              </Button>
            </Flex>
          </Box>
          <MyNftModal
            account={account}
            isOpen={isOpen}
            onClose={onClose}
            tokenData={tokenData}
            tokenId={tokenId}
          />
        </div>
      )}
    </Box>
  );
};

export default MyNftCard;
