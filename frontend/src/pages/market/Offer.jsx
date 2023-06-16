import { Box } from "@chakra-ui/react";
import OfferNft from "./OfferNft";

const Offer = () => {
    return (
        <Box className="lg:max-w-[800px] max-w-[460px]">
            <Box className="flex flex-col justify-center items-center gap-14">
                <OfferNft />
            </Box>
        </Box>
    );
};

export default Offer;
