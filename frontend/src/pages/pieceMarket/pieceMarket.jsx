import { Box, Text } from "@chakra-ui/react";
import { BsShopWindow } from "react-icons/bs";
import BAYC5895 from "./pieceNfts/BAYC5895";
import BAYC7090 from "./pieceNfts/BAYC7090";
import BAYC7698 from "./pieceNfts/BAYC7698";
import BAYC8580 from "./pieceNfts/BAYC8580";
import BAYC9315 from "./pieceNfts/BAYC9315";
import ToTopBtn from "../../components/ToTopBtn";

function PieceMarket() {
    const imgNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    return (
        <Box className="relative mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px] ">
            <ToTopBtn />
            <Text className="flex justify-center lg:text-xl text-md font-bold cursor-default">
                <BsShopWindow className="mt-1 mr-1" /> Piece Market
            </Text>
            <Box className="mt-10 flex flex-col justify-center items-center">
                <Box className="grid grid-cols-5 gap-1 lg:w-[512px] w-[256px] border">
                    {imgNum.map((num) => {
                        return (
                            <Box>
                                <Box>
                                    <BAYC5895 num={num} />
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
                <Box className="flex justify-between px-4 py-2 lg:w-[512px] w-[256px] bg-gray-100 rounded-b-md">
                    <Box>
                        <Text className="font-semibold">BAYC #5895 (#1~#20)</Text>
                        <Text className=" text-blue-500">Total Piece: 20</Text>
                        <Text className="text-blue-600">
                            per piece: <span className="font-bold">0.05 ETH</span>
                        </Text>
                    </Box>
                    <Box className="flex flex-col justify-end items-end lg:text-sm text-xs">
                        <Text className="font-semibold">Sales list</Text>
                        <Text>14/20</Text>
                    </Box>
                </Box>
            </Box>
            <Box className="mt-10 flex flex-col justify-center items-center">
                <Box className="grid grid-cols-5 gap-1 lg:w-[512px] w-[256px] border">
                    {imgNum.map((num) => {
                        return (
                            <Box>
                                <Box>
                                    <BAYC7090 num={num} />
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
                <Box className="flex justify-between px-4 py-2 lg:w-[512px] w-[256px] bg-gray-100 rounded-b-md">
                    <Box>
                        <Text className="font-semibold">BAYC #7090 (#1~#20)</Text>
                        <Text className=" text-blue-500">Total Piece: 20</Text>
                        <Text className="text-blue-600">
                            per piece: <span className="font-bold">0.05 ETH</span>
                        </Text>
                    </Box>
                    <Box className="flex flex-col justify-end items-end lg:text-sm text-xs">
                        <Text className="font-semibold">Sales list</Text>
                        <Text>14/20</Text>
                    </Box>
                </Box>
            </Box>
            <Box className="mt-10 flex flex-col justify-center items-center">
                <Box className="grid grid-cols-5 gap-1 lg:w-[512px] w-[256px] border">
                    {imgNum.map((num) => {
                        return (
                            <Box>
                                <Box>
                                    <BAYC7698 num={num} />
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
                <Box className="flex justify-between px-4 py-2 lg:w-[512px] w-[256px] bg-gray-100 rounded-b-md">
                    <Box>
                        <Text className="font-semibold">BAYC #7698 (#1~#20)</Text>
                        <Text className=" text-blue-500">Total Piece: 20</Text>
                        <Text className="text-blue-600">
                            per piece: <span className="font-bold">0.05 ETH</span>
                        </Text>
                    </Box>
                    <Box className="flex flex-col justify-end items-end lg:text-sm text-xs">
                        <Text className="font-semibold">Sales list</Text>
                        <Text>14/20</Text>
                    </Box>
                </Box>
            </Box>
            <Box className="mt-10 flex flex-col justify-center items-center">
                <Box className="grid grid-cols-5 gap-1 lg:w-[512px] w-[256px] border">
                    {imgNum.map((num) => {
                        return (
                            <Box>
                                <Box>
                                    <BAYC8580 num={num} />
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
                <Box className="flex justify-between px-4 py-2 lg:w-[512px] w-[256px] bg-gray-100 rounded-b-md">
                    <Box>
                        <Text className="font-semibold">BAYC #8580 (#1~#20)</Text>
                        <Text className=" text-blue-500">Total Piece: 20</Text>
                        <Text className="text-blue-600">
                            per piece: <span className="font-bold">0.05 ETH</span>
                        </Text>
                    </Box>
                    <Box className="flex flex-col justify-end items-end lg:text-sm text-xs">
                        <Text className="font-semibold">Sales list</Text>
                        <Text>14/20</Text>
                    </Box>
                </Box>
            </Box>
            <Box className="mt-10 flex flex-col justify-center items-center">
                <Box className="grid grid-cols-5 gap-1 lg:w-[512px] w-[256px] border">
                    {imgNum.map((num) => {
                        return (
                            <Box>
                                <Box>
                                    <BAYC9315 num={num} />
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
                <Box className="flex justify-between px-4 py-2 lg:w-[512px] w-[256px] bg-gray-100 rounded-b-md">
                    <Box>
                        <Text className="font-semibold">BAYC #9315 (#1~#20)</Text>
                        <Text className=" text-blue-500">Total Piece: 20</Text>
                        <Text className="text-blue-600">
                            per piece: <span className="font-bold">0.05 ETH</span>
                        </Text>
                    </Box>
                    <Box className="flex flex-col justify-end items-end lg:text-sm text-xs">
                        <Text className="font-semibold">Sales list</Text>
                        <Text>14/20</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
export default PieceMarket;
