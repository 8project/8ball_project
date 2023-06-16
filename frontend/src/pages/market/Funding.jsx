import { Box } from "@chakra-ui/react";
import FundingNft from "./FundingNft";

const Funding = () => {
    return (
        <Box className="lg:max-w-[800px] max-w-[460px]">
            <Box className="flex flex-col justify-center items-center gap-14">
                <FundingNft />
                <FundingNft />
                <FundingNft />
                <FundingNft />
                <FundingNft />
            </Box>
        </Box>
    );
};

export default Funding;
