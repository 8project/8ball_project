import { Box, Image } from "@chakra-ui/react";
import kongs from "../images/testFoloder/20220501000342_0-008.jpg";

function Market() {
    return (
        <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
            <Image src={kongs} boxSize={"216px"} />
        </Box>
    );
}
export default Market;
