import { Box, Text } from "@chakra-ui/react";
import BAYC5895 from "./pieceNfts/BAYC5895";
import BAYC7090 from "./pieceNfts/BAYC7090";
import BAYC7698 from "./pieceNfts/BAYC7698";
import BAYC8580 from "./pieceNfts/BAYC8580";
import BAYC9315 from "./pieceNfts/BAYC9315";
import ToTopBtn from "../../components/ToTopBtn";

function PieceMarket() {
    const imgNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    return (
        <Box className="relative mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px] py-4">
            <ToTopBtn />
            <Box className=" cursor-default py-2">
                <Text className="flex justify-center lg:text-xl text-md font-[Tenada]">
                    Piece Market
                </Text>
                <Box className="flex flex-col justify-center items-center mt-2 py-2 border roundedlg rounded-lg">
                    <Text className="font-[Tenada]">
                        8Ball에서만 경험 할 수 있는{" "}
                        <span className="text-lg text-blue-700">조각 NFT</span>
                    </Text>
                    <Box className="text-xs px-2">
                        <Text>* 조각 NFT는 펀딩한 NFT를 실제로 20등분 합니다.</Text>
                        <Text>* 조각 NFT 당 펀딩 NFT에 대해 5%의 지분율을 갖게 됩니다.</Text>
                        <Text>* 조각 NFT는 PieceMarket에서 유저간 거래가 가능합니다.</Text>
                    </Box>
                </Box>
            </Box>
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
