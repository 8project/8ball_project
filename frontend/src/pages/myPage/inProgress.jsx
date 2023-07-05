import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
const inProgress = () => {
  return (
    <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
      <Text>In Progress</Text>
      <Box className="flex flex-col justify-center items-center border rounded-md mb-10 ">
        <Image
          src={
            "https://ipfs.io/ipfs/QmavwZZLUcudbdBidTivN7pQTyyZKdmXXbYv4Z7vPjaBMa"
          }
          w={"256px"}
        />

        <Box className="bg-gray-100 w-full px-4 py-1">
          <Text>Kongz #7332</Text>
          <div className="bg-blue-300 justify-center text-center p-4">
            minted
          </div>
        </Box>
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
          <div className="bg-blue-300 justify-center text-center p-4">
            minted
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default inProgress;
