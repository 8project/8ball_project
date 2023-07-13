import { Box, Text } from "@chakra-ui/react";
import { OGNFTContract } from "../../../lib/web3.config";
import { useEffect, useState } from "react";
import MyNftCard from "./myNftCard";

const MyNft = ({ account }) => {
    const [OGTokenIds, setOGTokenIds] = useState([]);

    const getMyNftTokenIds_OG = async () => {
        try {
            const response = await OGNFTContract.methods.getMyNftTokenId_OG(account).call();

            const userTokenIdArray = response.map((v) => {
                return Number(v);
            });
            setOGTokenIds(userTokenIdArray);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(OGTokenIds);
    useEffect(() => {
        getMyNftTokenIds_OG();
    }, []);

    return (
        <Box className="mt-[60px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
            <Text className=" mt-10 text-center  font-[Tenada]  lg:text-xl text-md">My NFT</Text>
            <Box className="mt-2 flex flex-col justify-center itesm-center border rounded-lg px-4 py-2">
                <Text className=" font-[Tenada]">
                    소유한 NFT를 <span className=" text-blue-600">Funding Market</span>에 올려보세요
                </Text>
            </Box>
            <Box className="flex flex-col justify-center items-center">
                <Box className="mt-4 max-w-[256px]">
                    {OGTokenIds?.map((t, i) => {
                        return <MyNftCard key={i} tokenId={t} account={account} />;
                    })}
                </Box>
            </Box>
        </Box>
    );
};

export default MyNft;
