import { Box, Text } from "@chakra-ui/react";
import { BsShop, BsShopWindow } from "react-icons/bs";
import { FaVoteYea, FaUserCircle, FaHome } from "react-icons/fa";

const Footer = () => {
    return (
        <Box className="fixed bottom-0 bg-black  text-white max-w-[460px] min-w-[460px] font-mono">
            <Box className="flex justify-between gap-10 mt-2 mb-2">
                <Box className="ml-4 flex flex-col items-center hover:text-gray-300">
                    <BsShop className="text-3xl " />
                    <Text className="text-sm">Market</Text>
                </Box>
                <Box className="flex flex-col items-center hover:text-gray-300">
                    <BsShopWindow className="text-3xl" />
                    <Text className="text-sm"> Owner Market</Text>
                </Box>
                <Box className="flex flex-col items-center hover:text-gray-300">
                    <FaHome className="text-3xl" />
                    <Text className="font-semibold text-sm">Main</Text>
                </Box>
                <Box className="flex flex-col items-center hover:text-gray-300">
                    <FaVoteYea className="text-3xl" />
                    <Text className="text-sm">Vote</Text>
                </Box>
                <Box className="mr-4 flex flex-col items-center hover:text-gray-300">
                    <FaUserCircle className="text-3xl" />
                    <Text className="text-sm">MyPage</Text>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
