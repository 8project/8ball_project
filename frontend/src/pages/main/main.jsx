import { Box } from "@chakra-ui/react";
import MainSlider from "./MainSlider";
import Nfts from "../../components/Nfts";
import Faq from "./faq/Faq";
import Footer from "./Footer";
import MainContents from "./mainContents";

function Main() {
  return (
    <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
      <MainSlider />
      <MainContents />
      <Faq />
      <Footer />
    </Box>
  );
}
export default Main;
