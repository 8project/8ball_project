import { Box, Image, Text } from "@chakra-ui/react";
import logo from "../images/logo.png";
import { FaWallet } from "react-icons/fa";

const Header = () => {
    return (
        <Box className="max-w-[460px] min-w-[460px] bg-gray-200">
            <Box className="flex justify-between  text-gray-800 gap-16 ml-4 mr-4 mt-2 mb-4">
                <Box>
                    <Image src={logo} boxSize="50px" />
                </Box>
                <Box className="mt-3 ml-1 mr-1 text-lg font-extrabold font-mono">
                    <Text>8Ball NFT Market</Text>
                </Box>
                <Box className="flex hover:text-gray-400">
                    <FaWallet className="mt-4 mr-2" />
                    <Text className="mt-4 text-sm font-semibold font-mono">connect</Text>
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
