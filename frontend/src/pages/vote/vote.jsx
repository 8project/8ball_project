import { Box, Text } from "@chakra-ui/react";
import React from "react";
import VoteBox from "./voteBox";
function Vote({ account }) {
    return (
        <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
            <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
                <Box>
                    <VoteBox account={account} />
                </Box>
            </Box>
        </Box>
    );
}
export default Vote;
