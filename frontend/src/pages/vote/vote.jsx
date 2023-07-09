import { Box, Text } from "@chakra-ui/react";
import React from "react";
import VoteBox from "./voteBox";
function Vote() {
  return (
    <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
      <Text>votePage</Text>
      <div className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
        <div className=" bg-gray-500 lg:max-w-[800px] max-w-[460px] border rounded-md p-2">
          <VoteBox />
          
        </div>
      </div>
    </Box>
  );
}
export default Vote;
