import { Box, Text } from "@chakra-ui/react";
import React from "react";
import VoteBox from "./voteBox";
function Vote({ account }) {
    return (
        <Box className="mt-[60px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
            <Box className="mt-6">
                <Text className="flex justify-center lg:text-xl text-md font-[Tenada]">
                    Vote Page
                </Text>
                <Box className="mt-10">
                    <VoteBox account={account} />
                </Box>
            </Box>
        </Box>
    );
}
export default Vote;
