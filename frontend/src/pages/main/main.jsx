import { Box } from "@chakra-ui/react";
import MainSlider from "./MainSlider";
import Faq from "./Faq";
import Footer from "./Footer";

function Main() {
  return (
    <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
      <MainSlider />
      <Faq />
      <Footer />
    </Box>
  );
}
export default Main;
