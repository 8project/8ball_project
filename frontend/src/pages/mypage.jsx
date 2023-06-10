import { Box } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyPage() {
    return (
        <Box className="flex flex-col justify-center items-center ">
            <Box className="lg:min-w-[800px] lg:max-w-[800px] min-w-[460px] max-w-[460px] border-l-2 border-r-2 border-gray-200">
                <Box className="flex flex-col h-screen justify-center items-center ">
                    <Header />
                    <Box className="flex-1 flex justify-center">
                        <Box className="text-center">myPage</Box>
                    </Box>
                    <Footer />
                </Box>
            </Box>
        </Box>
    );
}
export default MyPage;
