import { Box, Text } from "@chakra-ui/react";
import { BsShop, BsShopWindow } from "react-icons/bs";
import { FaVoteYea, FaUserCircle, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
    const [menu, setMenu] = useState("home");

    return (
        <Box className="fixed bottom-0 bg-black  text-white lg:min-w-[800px] lg:max-w-[800px] min-w-[460px] max-w-[460px] font-mono">
            <Box className="flex justify-between gap-10 mt-2 mb-2 py-2 px-6">
                <Link to="/">
                    <Box
                        onClick={() => setMenu("home")}
                        className={`flex flex-col items-center  ${
                            menu === "home" ? "text-white" : "text-gray-500"
                        } hover:text-white`}
                    >
                        <FaHome className="text-2xl" />
                        <Text className="font-semibold text-xs">Home</Text>
                    </Box>
                </Link>
                <Link to="/market">
                    <Box
                        onClick={() => setMenu("market")}
                        className={`flex flex-col items-center  ${
                            menu === "market" ? "text-white0" : "text-gray-500"
                        } hover:text-white`}
                    >
                        <BsShop className="text-2xl " />
                        <Text className=" text-xs">Market</Text>
                    </Box>
                </Link>
                <Link to="/pieceMarket">
                    <Box
                        onClick={() => setMenu("piceMarket")}
                        className={`flex flex-col items-center  ${
                            menu === "piceMarket" ? "text-white" : "text-gray-500"
                        } hover:text-white`}
                    >
                        <BsShopWindow className="text-2xl" />
                        <Text className="text-xs"> Piece Market</Text>
                    </Box>
                </Link>
                <Link to="/vote">
                    <Box
                        onClick={() => setMenu("vote")}
                        className={`flex flex-col items-center  ${
                            menu === "vote" ? "text-white" : "text-gray-500"
                        } hover:text-white`}
                    >
                        <FaVoteYea className="text-2xl" />
                        <Text className="text-xs">Vote</Text>
                    </Box>
                </Link>
                <Link to="/login">
                    <Box
                        onClick={() => setMenu("login")}
                        className={`flex flex-col items-center  ${
                            menu === "login" ? "text-white" : "text-gray-500"
                        } hover:text-white`}
                    >
                        <FaUserCircle className="text-2xl" />
                        <Text className="text-xs">MyPage</Text>
                    </Box>
                </Link>
            </Box>
        </Box>
    );
};

export default Footer;
