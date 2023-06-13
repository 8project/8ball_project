import { Box, Image } from "@chakra-ui/react";
import kongs from "../images/testFoloder/20220501000342_0-008.jpg";

function Market() {
    return (
        <Box>
            <Image src={kongs} boxSize={"216px"} className="mt-20" />
        </Box>
    );
}
export default Market;
