import { Box, Text, Image } from "@chakra-ui/react";
import testImg from "../../images/testFoloder/20220501000342_0.jpg";

const myNft = () => {
  return (
    <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
      <Text>On Sale</Text>
      <Box className="flex flex-col justify-center items-center border rounded-md mb-10 ">
        <Image src={testImg} className="w-[256px] rounded-t-md " />
        <Box className="bg-gray-100 w-full px-4 py-1">
          <Text>Kongz #7332</Text>
          <div className="bg-blue-300 justify-center text-center p-4">
            List for sell
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default myNft;
