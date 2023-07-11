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
import { BiDetail } from "react-icons/bi";
import MyPieceNftModal from "./myPieceNftModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { MarketContract } from "../../../lib/web3.config";

const MyPieceNftCard = ({ pieceId, account, isLoading, isApproved }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pieceTokenData, setPieceTokenData] = useState(null);

  const getPieceTokenURI = async () => {
    try {
      const response = await MarketContract.methods.tokenURI(pieceId).call();
      const metadataResponse = await axios.get(response);
      setPieceTokenData(metadataResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPieceTokenURI();
  }, []);

  return (
    <Box className="flex flex-col justify-center items-center border rounded-md mb-10 ">
      {pieceTokenData && (
        <div>
          <div className="relative">
            <Image
              src={pieceTokenData?.image}
              className=" rounded-t-md absolute"
            />
            <div className="top-0 w-[256px] h-[256px]  bg-white text-gray-950 flex justify-center items-center">
              Loading...
            </div>
          </div>
          <Box className="bg-gray-100 w-full px-4 py-1">
            <Text>
              {pieceTokenData?.name} #{pieceTokenData?.edition}
            </Text>
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
                    <Box>{pieceTokenData?.description}</Box>
                    <Box>
                      {pieceTokenData?.attributes.map((v, i) => (
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
                // onClick={isApproved ? onOpen : onClickPieceApprove}
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
          <MyPieceNftModal
            account={account}
            isOpen={isOpen}
            onClose={onClose}
            pieceTokenData={pieceTokenData}
            pieceId={pieceId}
          />
        </div>
      )}
    </Box>
  );
};

export default MyPieceNftCard;
