import { Box } from "@chakra-ui/react";
import MainSlider from "./MainSlider";
import Faq from "./faq/Faq";
import Footer from "./Footer";
import MainContents from "./mainContents";
import ToTopBtn from "../../components/ToTopBtn";

function Main() {
    return (
        <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
            <ToTopBtn />
            <MainSlider />
            <MainContents />
            <Faq />
            <Footer />
        </Box>
    );
}
export default Main;
