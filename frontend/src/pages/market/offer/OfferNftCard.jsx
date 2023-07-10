import { Box, Text, Image, Button, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Nfts from "../../../components/Nfts";
import OfferModal from "./OfferModal";
import { MarketContract, OGNFTContract } from "../../../lib/web3.config";
import axios from "axios";

const OfferNft = ({ offerId }) => {
  const [offerMetadata, setOfferMetadata] = useState();
  const getOfferTokenURI = async () => {
    try {
      const response = await MarketContract.methods.OGNftList(offerId).call();
      const responseTokenURI = await OGNFTContract.methods
        .tokenURI(Number(response.OGTokenId))
        .call();
      const responseMetadata = await axios.get(responseTokenURI);
      setOfferMetadata(responseMetadata.data);
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
    <Box className="flex flex-col justify-center items-center border rounded-md mb-10 ">
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
                src={offerMetadata.image}
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
            <Text>{offerMetadata.name}</Text>
            <Text className="text-blue-400 text-sm mt-1">1 piece</Text>
            <Text className="text-blue-500 font-semibold mt-1">0.05 ETH</Text>
          </Box>
          <Box className="bg-gray-100 w-full flex justify-center py-2">
            <Button
              colorScheme="blue"
              className="font-bold text-white  px-4 py-2 rounded-md "
              onClick={onOpen}
            >
              Make Offer
            </Button>
          </Box>
          <OfferModal isOpen={isOpen} onClose={onClose} />
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
export default OfferNft;
