import { Box } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Medium from "../components/Medium";
import Top from "../components/Top";

function Main() {
    return (
        <Box>
            <Box className="flex flex-col h-screen justify-center items-center">
                <Top />
                <Box className="flex-1 flex justify-center items-center">
                    <Box className="text-center">
                        <Medium />
                    </Box>
                </Box>
                <Footer />
            </Box>
        </Box>
    );
}
export default Main;
