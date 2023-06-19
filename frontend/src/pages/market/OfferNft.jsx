import { Box, Text, Image } from "@chakra-ui/react";
import { useState } from "react";
import testImg from "../../images/testFoloder/20220501000342_0.jpg";
import Test from "../../components/test";

const OfferNft = () => {
  const [show, setShow] = useState(false);

  return (
    <Box className="flex flex-col justify-center items-center border rounded-md mb-10 ">
      {show ? (
        <Box
          className=" cursor-pointer"
          onClick={() => {
            setShow(false);
          }}
        >
          <Image src={testImg} className="w-[256px] rounded-t-md " />
        </Box>
      ) : (
        <Box
          className=" cursor-pointer"
          onClick={() => {
            setShow(true);
          }}
        >
          <Test />
        </Box>
      )}

      <Box className="bg-gray-100 w-full px-4 py-1">
        <Text>Kongz #7332</Text>
        <Text className="text-blue-400 text-sm mt-1">1 piece</Text>
        <Text className="text-blue-500 font-semibold mt-1">0.05 ETH</Text>
      </Box>
      <Box className="bg-gray-100 w-full flex justify-center py-2">
        <Text className="font-bold text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-400 cursor-pointer">
          Offer
        </Text>
      </Box>
    </Box>
  );
};
export default OfferNft;
