import { Box, Text, Button } from "@chakra-ui/react";
import MyPieceNftCard from "./myPieceNftCard";
import { useEffect, useState } from "react";
import { MarketContract, PieceMarketContractAddress } from "../../../lib/web3.config";

const MyPieceNft = ({ account }) => {
    const [pieceTokenIds, setPieceTokenIds] = useState([]);
    const [isApproved, setIsApproved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getMyNftTokenIds_Piece = async () => {
        try {
            const response = await MarketContract.methods.getMyNftTokenId_Piece(account).call();

            const userPieceTokenIdArray = response?.map((v) => {
                return Number(v);
            });
            setPieceTokenIds(userPieceTokenIdArray);
        } catch (error) {
            console.log(error);
        }
    };

    const checkApprovalStatus = async () => {
        try {
            const checkApproved = await MarketContract.methods
                .isApprovedForAll(account, PieceMarketContractAddress)
                .call({ from: account });
            setIsApproved(checkApproved);
        } catch (error) {
            console.error(error);
        }
    };

    const onClickPieceApprove = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const response = await MarketContract.methods
                .setApprovalForAll(PieceMarketContractAddress, true)
                .send({ from: account });

            if (response.status) {
                setIsApproved(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getMyNftTokenIds_Piece();
        checkApprovalStatus();
    }, []);

    return (
        <Box className="mt-[60px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
            <Text className="text-center mt-10 font-[Tenada]  lg:text-xl text-md">
                My Piece NFT
            </Text>
            <Box className="mt-6 flex flex-col justify-center items-center  border rounded-lg px-4 py-2">
                <Text className="font-[Tenada]"></Text>
                <Box className="flex items-center">
                    <Text className="font-[Tenada] mr-2 mt-1">Sell Status : </Text>
                    {isApproved ? (
                        <Button colorScheme="green" size="sm" variant="outline">
                            Possible
                        </Button>
                    ) : (
                        <Button
                            colorScheme="red"
                            size="sm"
                            variant="outline"
                            onClick={onClickPieceApprove}
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Approved"}
                        </Button>
                    )}
                </Box>
                <Text className="font-[Tenada] mt-4">
                    소유한 조각 NFT를 <span className="text-blue-600">Piece Market</span>에 판매 할
                    수 있습니다.
                </Text>
            </Box>
            <Box className="mt-4 grid lg:grid-cols-2 gap-14">
                {pieceTokenIds.map((p, i) => (
                    <Box>
                        <MyPieceNftCard
                            key={i}
                            pieceId={p}
                            account={account}
                            isApproved={isApproved}
                            onClickPieceApprove={onClickPieceApprove}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default MyPieceNft;
