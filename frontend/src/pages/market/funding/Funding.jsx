import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { OGNFTContract, MarketContractAddress } from "../../../lib/web3.config";
import FundingNftCard from "./FundingNftCard";

const Funding = ({ account }) => {
    const [OGTokenListArray, setOGTokenListArray] = useState();

    const getNftMetadata = async () => {
        try {
            const response = await OGNFTContract.methods
                .getMyNftTokenId_OG(MarketContractAddress)
                .call();

            const marketTokenArray = response.map((v) => {
                return Number(v);
            });
            setOGTokenListArray(marketTokenArray);
            // console.log(response);
        } catch (error) {
            console.error(error);
        }
    };
    console.log(OGTokenListArray);
    useEffect(() => {
        getNftMetadata();
    }, []);

    return (
        <Box className="lg:max-w-[800px] max-w-[460px]">
            <Box className="mb-10 py-4 border px-2 flex flex-col text-center w-[100%] rounded-md">
                <Box>
                    <Text className="font-[Tenada]">
                        펀딩을 통해 <span className=" text-blue-700 text-lg">조각 투자</span>를
                        시작해보세요.
                    </Text>
                    <Box className="text-xs">
                        <Text>* 펀딩 NFT 당 모집인원은 20명입니다.</Text>
                        <Text>* 펀딩 모집은 선착순으로 진행됩니다.</Text>
                        <Text>* 모집 완료시점 이후 조각 NFT는 랜덤으로 지급 됩니다.</Text>
                        <Text></Text>
                    </Box>
                </Box>
            </Box>
            <Box className="grid lg:grid-cols-2 gap-14">
                {OGTokenListArray?.map((t, i) => {
                    return <FundingNftCard key={i} indexId={i + 1} account={account} />;
                })}
            </Box>
        </Box>
    );
};

export default Funding;
