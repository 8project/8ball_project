import { Box, Text } from "@chakra-ui/react";
import { BsShop, BsShopWindow } from "react-icons/bs";
import { FaVoteYea, FaUserCircle, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <Box className="fixed bottom-0 bg-black  text-white max-w-[460px] min-w-[460px] font-mono">
            <Box className="flex justify-between gap-10 mt-2 mb-2">
                <Link to="/market">
                    <Box className="ml-4 flex flex-col items-center hover:text-gray-300">
                        <BsShop className="text-3xl " />
                        <Text className=" text-xs">Market</Text>
                    </Box>
                </Link>
                <Link to="/ownermarket">
                    <Box className="flex flex-col items-center hover:text-gray-300">
                        <BsShopWindow className="text-3xl" />
                        <Text className="text-xs"> Owner Market</Text>
                    </Box>
                </Link>
                <Box className="flex flex-col items-center hover:text-gray-300">
                    <Link to="/">
                        <FaHome className="text-3xl" />
                        <Text className="font-semibold text-xs">Main</Text>
                    </Link>
                </Box>
                <Link to="/vote">
                    <Box className="flex flex-col items-center hover:text-gray-300">
                        <FaVoteYea className="text-3xl" />
                        <Text className="text-xs">Vote</Text>
                    </Box>
                </Link>
                <Link to="/mypage">
                    <Box className="mr-4 flex flex-col items-center hover:text-gray-300">
                        <FaUserCircle className="text-3xl" />
                        <Text className="text-xs">MyPage</Text>
                    </Box>
                </Link>
            </Box>
        </Box>
    );
};

export default Footer;
