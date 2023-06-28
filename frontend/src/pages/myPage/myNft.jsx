import { Box, Text } from "@chakra-ui/react";
import React from "react";

const myNft = () => {
  return (
    <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
      <Text>votePage</Text>
      <div className="border-2 ml-12 mt-5 mb-12 flex flex-col items-center rounded-lg w-48 md:w-72 shadow-2xl">
        <img
          src="img/pieceNft.png"
          alt=""
          className="w-72 h-80 rounded-lg object-cover"
          crossOrigin="anonymous"
        />
        <div className="text-white w-full p-2 bg-gradient-to-t from-[#454545] to-transparent rounded-lg pt-5 -mt-20">
          <strong className="text-xl">lalala</strong>
          <p className="display-inline">babababa</p>
        </div>
      </div>
    </Box>
  );
};

export default myNft;
