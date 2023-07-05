import { Box, Text, Image, useDisclosure, Button } from "@chakra-ui/react";

import MyNftModal from "./myNftModal";

const MyNft = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleListForSell = () => {
    //"List for sell" 클릭 시 필요한 동작 수행
    console.log("List for sell clicked");
  };

  return (
    <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
      <Text>My NFT</Text>
      <Box className="flex flex-col justify-center items-center border rounded-md mb-10 ">
        <div className="relative">
          {/* <Image
            src={
              "https://ipfs.io/ipfs/QmavwZZLUcudbdBidTivN7pQTyyZKdmXXbYv4Z7vPjaBMa"
            }
            className=" rounded-t-md absolute"
          /> */}
          <div className="top-0 w-[256px] h-[256px]  bg-white text-gray-950 flex justify-center items-center">
            Loading...
          </div>
        </div>
        <Box className="bg-gray-100 w-full px-4 py-1">
          <Text>BAYC #5895</Text>
          <Button
            colorScheme="blue"
            onClick={onOpen}
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
      <Box className="flex flex-col justify-center items-center border rounded-md mb-10 ">
        <Image
          src={
            "https://ipfs.io/ipfs/QmavwZZLUcudbdBidTivN7pQTyyZKdmXXbYv4Z7vPjaBMa"
          }
          className="w-[256px] rounded-t-md "
        />

        <Box className="bg-gray-100 w-full px-4 py-1">
          <Text>BAYC #5896</Text>
          <Button
            colorScheme="blue"
            onClick={onOpen}
            className="justify-center text-center w-full py-4"
          >
            List for Sell
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MyNft;
