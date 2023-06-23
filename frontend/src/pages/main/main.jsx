import { Box } from "@chakra-ui/react";
import MainSlider from "./MainSlider";
import Nfts from "../../components/Nfts";
import Faq from "./Faq";
import Footer from "./Footer";

function Main() {
    return (
        <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
            <MainSlider />
            <Box className="flex flex-col items-center justify-center mt-20 mb-10">
                <Nfts />
                <Box>테스트 중입니다</Box>
            </Box>
            <Faq />
            <Footer />
        </Box>
    );
}
export default Main;
