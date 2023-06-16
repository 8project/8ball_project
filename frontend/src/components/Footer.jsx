import { Box, Text } from "@chakra-ui/react";
import { BsShop, BsShopWindow } from "react-icons/bs";
import { FaVoteYea, FaUserCircle, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box className="fixed bottom-0 bg-gray-950  text-white lg:min-w-[800px] lg:max-w-[800px] min-w-[460px] max-w-[460px] font-mono">
      <Box className="flex justify-between gap-10 mt-2 mb-2 py-2 px-6">
        <Link to="/">
          <Box className="flex flex-col items-center  hover:text-gray-300">
            <FaHome className="text-2xl" />
            <Text className="font-semibold text-xs">Home</Text>
          </Box>
        </Link>
        <Link to="/market">
          <Box className=" flex flex-col items-center hover:text-gray-300">
            <BsShop className="text-2xl " />
            <Text className=" text-xs">Market</Text>
          </Box>
        </Link>
        <Link to="/pieceMarket">
          <Box className="flex flex-col items-center hover:text-gray-300">
            <BsShopWindow className="text-2xl" />
            <Text className="text-xs"> Piece Market</Text>
          </Box>
        </Link>
        <Link to="/vote">
          <Box className="flex flex-col items-center hover:text-gray-300">
            <FaVoteYea className="text-2xl" />
            <Text className="text-xs">Vote</Text>
          </Box>
        </Link>
        <Link to="/login">
          <Box className=" flex flex-col items-center hover:text-gray-300">
            <FaUserCircle className="text-2xl" />
            <Text className="text-xs">MyPage</Text>
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
