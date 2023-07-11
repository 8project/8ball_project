import { Box } from "@chakra-ui/react";
import {
    AiOutlineInstagram,
    AiOutlineTwitter,
    AiFillMediumCircle,
    AiOutlineYoutube,
} from "react-icons/ai";

const Footer = () => {
    return (
        <Box className="mt-40 bg-black  text-gray-400 font-semibold flex  justify-between items-center  ">
            <Box className="mb-6 ml-10">
                <Box className="mt-4 sm:text-lg text-md">Team 8ball</Box>
                <Box className="mt-2 sm:text-md text-xs">Contract: 조성윤, 송우석</Box>
                <Box className="mt-2 sm:text-md text-xs">Frontend: 이정호, 이주혁</Box>
                <Box className="mt-2 sm:text-md text-xs">TECHIT BCS3 8Team</Box>
            </Box>
            <Box className="bm-6 mr-10 flex gap-2">
                <AiOutlineInstagram className="sm:text-4xl" />
                <AiOutlineTwitter className="sm:text-4xl" />
                <AiFillMediumCircle className="sm:text-4xl" />
                <AiOutlineYoutube className="sm:text-4xl" />
            </Box>
            <Box className="bm-6 mr-10">
                <Box className="mt-2 sm:text-md text-xs">이용약관</Box>
                <Box className="mt-2 sm:text-md text-xs">개인정보처리방침</Box>
                <Box className="mt-2 sm:text-md text-xs">자주묻는질문</Box>
            </Box>
        </Box>
    );
};
export default Footer;
