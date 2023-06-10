import { Box, Image, Text } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Test from "../components/test";
import logo from "../images/8ball.png";
function Main() {
    return (
        <Box className="flex justify-center">
            <Box className="hidden lg:inline-block mr-20 mt-40">
                <Image src={logo} boxSize={300} />
                <Text className="-mt-14 ml-6 font-mono font-extrabold">
                    진짜 조각 투자, 오직 8ball에서!
                </Text>
                <Text className="mt-2 ml-6 font-mono font-semibold text-sm">
                    8ball에서는 NFT를 조각 발행해 지분을 발행합니다.
                </Text>
            </Box>
            <Box className="min-w-[460px] max-w-[460px] border-l-2 border-r-2">
                <Box className="flex flex-col h-screen justify-center items-center ">
                    <Header />
                    <Box className="flex-1 flex justify-center">
                        <Box className="text-center">
                            <Test />
                        </Box>
                    </Box>
                    <Footer />
                </Box>
            </Box>
        </Box>
    );
}
export default Main;
