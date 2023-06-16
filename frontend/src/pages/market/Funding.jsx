import { Box, Image, Text, Button } from "@chakra-ui/react";
import testImg from "../../images/testFoloder/20220501000342_0.jpg";

const Funding = () => {
  return (
    <Box className="lg:max-w-[800px] max-w-[460px] z-auto">
      <Box className="grid lg:grid-cols-2 gap-20">
        <Box className="flex flex-col justify-center items-center border rounded-md mb-10">
          <Image src={testImg} className="w-[256px] rounded-t-md" />
          <Box className="bg-gray-100 w-full px-4 py-1">
            <Text>Kongz #7332</Text>
            <Text className="text-blue-400 text-sm">1 piece</Text>
            <Text className="text-blue-500 font-semibold">0.05 ETH</Text>
          </Box>
          <Box className="bg-gray-100 w-full flex justify-center py-2">
            <Text className="font-bold text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-300">
              Funding
            </Text>
          </Box>
        </Box>
        <Box className="flex flex-col justify-center items-center border rounded-md mb-10">
          <Image src={testImg} className="w-[256px] rounded-t-md" />
          <Box className="bg-gray-100 w-full px-4 py-1">
            <Text>Kongz #7332</Text>
            <Text className="text-blue-400 text-sm">1 piece</Text>
            <Text className="text-blue-500 font-semibold">0.05 ETH</Text>
          </Box>
          <Box className="bg-gray-100 w-full flex justify-center py-2">
            <Text className="font-bold text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-300">
              Funding
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Funding;
