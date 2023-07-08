import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { OGNFTContract, MarketContractAddress } from "../../../lib/web3.config";
import FundingNftCard from "./FundingNftCard";


const Funding = ({account}) => {
    const[OGTokenListArray, setOGTokenListArray] = useState();

    const getNftMetadata = async () => {
        try {
            const response = await OGNFTContract.methods.getMyNftTokenId_OG(MarketContractAddress).call();
            
            const marketTokenArray = response.map((v) => {return Number(v)});
            setOGTokenListArray(marketTokenArray);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };
    console.log(OGTokenListArray);
    useEffect(() => {getNftMetadata()}, []);

    return (
        <Box className="lg:max-w-[800px] max-w-[460px]">
            <Box className="grid lg:grid-cols-2 gap-14">
                {OGTokenListArray?.map((t,i) => {
                    return (<FundingNftCard key={i} tokenId={t} account={account} />
                    );
                })}
            </Box>
        </Box>
    );
};

export default Funding;
