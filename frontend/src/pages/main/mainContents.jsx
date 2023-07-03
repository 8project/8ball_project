import { Box, Text } from "@chakra-ui/react";
import GridAnimation from "../../components/GridAnimation";

const MainContents = () => {
    return (
        <Box className="mt-20">
            <Box w="100%" bgGradient="linear(to-t, gray.300, white)" className="py-10 px-4">
                <Box className="flex justify-around gap-2">
                    <GridAnimation className=" shadow-xl " />
                    <Box className="flex flex-col justify-center items-center font-['Tenada']">
                        <Text className="lg:text-2xl text-sm ">비싼 NFT 고민만 하셨나요?</Text>
                        <Text className="lg:text-lg text-xs animate-bounce">
                            조각 투자를 통해 쉽게 접근해 보세요!
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MainContents;
