import { Box, Text } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlinePuzzle } from "react-icons/hi";
import { SlPicture } from "react-icons/sl";
import { CiShop } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdOutlineContentCopy } from "react-icons/md";
import { OGNFTContract } from "../../lib/web3.config";
// import { useState } from "react";

function MyPage({ account }) {
    const handleCopyAccount = () => {
        navigator.clipboard.writeText(account);
    };

    const onClickMint = async () => {
        try {
            const mintResponse = await OGNFTContract.methods.mintNFT().send({ from: account });

            console.log(mintResponse);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box className="mt-[60px] mb-[72px] lg:max-w-[800px] max-w-[460px] w-[100%]">
            <Text className="flex justify-center lg:text-xl text-md font-[Tenada] mt-6">
                MyPage
            </Text>
            <Box display="flex" flexDirection="column" alignItems="center" className="pb-6">
                <Box className="mt-10  flex flex-col justify-center items-center border px-4 py-2 rounded-lg">
                    <Box color="gray.500">
                        <AiOutlineUser size={100} />
                    </Box>
                    <Box fontWeight="bold" color="gray.400" className="pb-5">
                        UserWallet
                    </Box>
                    <Box className="font-extrabold font-mono flex justify-center items-center ml-6">
                        <div className="mr-2">
                            {account.substring(0, 4)}...{account.slice(-4)}
                        </div>
                        <div onClick={handleCopyAccount} style={{ cursor: "pointer" }}>
                            <MdOutlineContentCopy />
                        </div>
                    </Box>
                </Box>
            </Box>
            <Box className="font-extrabold font-mono">
                <Box
                    borderTop="1px solid gray"
                    width="100%"
                    maxW={["460px", "460px", "460px", "800px"]}
                    mx="auto"
                ></Box>
                <Link to="/mypage/MyNft">
                    <Box className="pt-6 border-b border-gray-400 flex justify-between items-center">
                        <Box className="flex pb-2 ml-6 items-center">
                            <SlPicture />
                            <Box className="pl-2">My NFT</Box>
                        </Box>
                        <IoIosArrowForward className=" text-gray-300" />
                    </Box>
                </Link>
                <Link to="/mypage/MyPieceNft">
                    <Box className="pt-6 border-b border-gray-400 flex justify-between items-center">
                        <Box className="flex pb-2 ml-6 items-center">
                            <HiOutlinePuzzle />
                            <Box className="pl-2">My Piece NFT</Box>
                        </Box>
                        <IoIosArrowForward className=" text-gray-300" />
                    </Box>
                </Link>
                <Link to="/mypage/inProgress">
                    <Box className="pt-6 border-b border-gray-400 flex justify-between items-center">
                        <Box className="flex pb-2 ml-6 items-center">
                            <CiShop />
                            <Box className="pl-1">In Progress</Box>
                        </Box>
                        <IoIosArrowForward className=" text-gray-300" />
                    </Box>
                </Link>
                <Link to="/mypage/onSale">
                    <Box className="pt-6 border-b border-gray-400 flex justify-between items-center">
                        <Box className="flex pb-2 ml-6 items-center">
                            <CiShop />
                            <Box className="pl-1">On Sale</Box>
                        </Box>
                        <IoIosArrowForward className=" text-gray-300" />
                    </Box>
                </Link>
            </Box>
            <Box className="flex justify-center mt-10">
                <button className="bg-red-300" onClick={onClickMint}>
                    민팅하기{" "}
                </button>
            </Box>
        </Box>
    );
}

export default MyPage;
