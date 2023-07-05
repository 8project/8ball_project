import { Box, Text, useDisclosure, Button, Image } from "@chakra-ui/react";
// import testImg from "../../images/testFoloder/20220501000342_0.jpg";
import MyPieceNftModal from "./myPieceNftModal";

const MyPieceNft = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleListForSell = () => {
    //"List for sell" 클릭 시 필요한 동작 수행
    console.log("List for sell clicked");
  };

  return (
    <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
      <Text>My Piece NFT</Text>
      <Box className="flex flex-col justify-center items-center border rounded-md mb-10 ">
        <div className="relative">
          {/* <Image src={testImg} className=" rounded-t-md relative" /> */}
          <div className="top-0 w-[256px] h-[256px]  bg-white text-gray-950 flex justify-center items-center">
            Loading...
          </div>
        </div>
        <Box className="bg-gray-100 w-full px-4 py-1">
          <Text>BAYC #5895-8</Text>
          <Button
            colorScheme="blue"
            onClick={onOpen}
            className="justify-center text-center w-full py-4"
          >
            List for Sell
          </Button>
        </Box>
        <MyPieceNftModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleListForSell}
        />
      </Box>
      <Box className="flex flex-col justify-center items-center border rounded-md mb-10 ">
        <Image
          src="/img/8thPiece.png"
          w={"256px"}
          h={"256px"}
          className="rounded-md"
        />
        <Box className="bg-gray-100 w-full px-4 py-1">
          <Text>BAYC #5895-8</Text>
          <Button
            colorScheme="blue"
            onClick={onOpen}
            className="justify-center text-center w-full py-4"
          >
            List for Sell
          </Button>
        </Box>
        <MyPieceNftModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleListForSell}
        />
      </Box>
    </Box>
  );
};

export default MyPieceNft;
