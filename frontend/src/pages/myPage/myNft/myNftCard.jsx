import { Box, Text, Image, useDisclosure, Button } from "@chakra-ui/react";
import MyNftModal from "./myNftModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { MarketContractAddress, OGNFTContract } from "../../../lib/web3.config";

const MyNftCard = ({ tokenId, account }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleListForSell = () => {
    //"List for sell" 클릭 시 필요한 동작 수행
    console.log("List for sell clicked");
  };

  const [userTokenImages, setUserTokenImages] = useState();
  const getOGTokenURI = async () => {
    try {
      const response = await OGNFTContract.methods.tokenURI(tokenId).call();
      const metadataResponse = await axios.get(`${response}`);
      console.log(metadataResponse);
      setUserTokenImages(metadataResponse.data.image);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickApprove = async (e) => {
    e.preventDefault();

    try {
      const response = await OGNFTContract.methods
        .approve(MarketContractAddress, tokenId)
        .send({ from: account });
      onOpen();
      console.log(response);
    } catch (error) {
      console.error(error);
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
        <Text>BAYC #5895</Text>
        <Button
          colorScheme="blue"
          onClick={onClickApprove}
          className="justify-center text-center w-full py-4"
        >
          List for Sell
        </Button>
      </Box>
      <MyNftModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleListForSell}
      />
    </Box>
  );
};

export default MyNftCard;
