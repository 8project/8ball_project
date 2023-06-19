import { Box } from "@chakra-ui/react";
import OfferNft from "./OfferNft";

const Offer = () => {
  return (
    <Box className="lg:max-w-[800px] max-w-[460px]">
      <Box className="grid lg:grid-cols-2 gap-14">
        <OfferNft />
        <OfferNft />
        <OfferNft />
      </Box>
    </Box>
  );
};

export default Offer;
