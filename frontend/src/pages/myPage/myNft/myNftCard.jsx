import {
  Box,
  Text,
  Image,
  useDisclosure,
  Button,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import MyNftModal from "./myNftModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { MarketContractAddress, OGNFTContract } from "../../../lib/web3.config";

const MyNftCard = ({ tokenId, account }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleListForSell = () => {
    console.log("List for sell clicked");
  };

  const [userTokenImages, setUserTokenImages] = useState(null);
  const getOGTokenURI = async () => {
    try {
      const response = await OGNFTContract.methods.tokenURI(tokenId).call();
      const metadataResponse = await axios.get(response);
      setUserTokenImages(metadataResponse.data.image);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickApprove = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await OGNFTContract.methods
        .approve(MarketContractAddress, tokenId)
        .send({ from: account });

      console.log(response);
      if (response.status) {
        setIsApproved(true);
        onOpen();
      }
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
      <div className="relative">
        <Image src={userTokenImages} className=" rounded-t-md absolute" />
        <div className="top-0 w-[256px] h-[256px]  bg-white text-gray-950 flex justify-center items-center">
          Loading...
        </div>
      </div>
      <Box className="bg-gray-100 w-full px-4 py-1">
        <Text>BAYC #{tokenId}</Text>
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
              ? "Approved"
              : "List for Sell"}
          </Button>
        </Flex>
      </Box>
      <MyNftModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleListForSell}
        userTokenImages={userTokenImages}
      />
    </Box>
  );
};

export default MyNftCard;
