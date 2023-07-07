import { Box } from "@chakra-ui/react";
import FundingNft from "./FundingNft";

const Funding = () => {
    const arr = [1, 2, 3, 4, 5];

    return (
        <Box className="lg:max-w-[800px] max-w-[460px]">
            <Box className="grid lg:grid-cols-2 gap-14">
                {arr.map((num) => {
                    return (
                        <Box>
                            <FundingNft num={num} />
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default Funding;
