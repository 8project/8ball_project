import { Box } from "@chakra-ui/react";
import FundingNft from "./FundingNft";

const Funding = () => {
  return (
    <Box className="lg:max-w-[800px] max-w-[460px]">
      <Box className="grid lg:grid-cols-2 gap-14">
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
