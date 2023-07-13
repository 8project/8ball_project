import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import OnSaleNft from "./onSaleNft";
import OnSalePieceNft from "./onSalePieceNft";
import { HiOutlinePuzzle } from "react-icons/hi";
import { SlPicture } from "react-icons/sl";
import ToTopBtn from "../../../components/ToTopBtn";

function OnSale({ account }) {
    const [show, setShow] = useState(true);

    return (
        <Box className="mt-[60px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
            <Text className="text-center mt-10 font-[Tenada]  lg:text-xl text-md">
                My Piece NFT
            </Text>
            <ToTopBtn />
            <Box className="flex flex-col justify-center items-center">
                <Box className="flex mt-4">
                    <Box
                        className={`flex justify-center w-[120px] border-2 text-center py-2 px-10 font-mono font-semibold cursor-pointer ${
                            show ? "bg-gray-200" : "bg-white"
                        }`}
                        onClick={() => setShow(true)}
                    >
                        {/* <SlPicture className="mr-1"  /> */}
                        NFT
                    </Box>
                    <Box
                        className={`flex justify-center w-[120px] border-2 text-center py-2 px-10 font-mono font-semibold cursor-pointer ${
                            show ? "bg-white" : "bg-gray-200"
                        }`}
                        onClick={() => setShow(false)}
                    >
                        {/* <HiOutlinePuzzle className="mr-1" /> */}
                        PieceNft
                    </Box>
                </Box>
                <Box className="mt-10">
                    {show ? <OnSaleNft account={account} /> : <OnSalePieceNft account={account} />}
                </Box>
            </Box>
        </Box>
    );
}
export default OnSale;
