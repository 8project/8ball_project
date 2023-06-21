import { Box, Text } from "@chakra-ui/react";
import PieceNft from "./PieceNft";
import { BsShopWindow } from "react-icons/bs";

function PieceMarket() {
    const imgNum = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
    ];
    return (
        <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px] ">
            <Text className="flex justify-center lg:text-xl text-md font-bold cursor-default">
                <BsShopWindow className="mt-1 mr-1" /> Piece Market
            </Text>
            <Box className="mt-10 flex flex-col justify-center items-center">
                <Box className="grid grid-cols-5 gap-1 lg:w-[512px] w-[256px] border">
                    {imgNum.map((num) => {
                        return (
                            <Box>
                                <PieceNft num={num} />
                            </Box>
                        );
                    })}
                </Box>
                <Box className="flex justify-between px-4 py-2 lg:w-[512px] w-[256px] bg-gray-100 rounded-b-md">
                    <Box>
                        <Text className="font-semibold">Kongz #7332 (#1~#20)</Text>
                        <Text className=" text-blue-500">Total Piece: 20</Text>
                        <Text className="text-blue-600">
                            per piece: <span className="font-bold">0.05 ETH</span>
                        </Text>
                    </Box>
                    <Box className="flex flex-col justify-end items-end">
                        <Text className="font-semibold">Sales list</Text>
                        <Text>14/20</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
export default PieceMarket;
