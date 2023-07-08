import { Box, Text, Image, Button, useDisclosure } from "@chakra-ui/react";
import FundingModal from "./FundingModal";
import { useState, useEffect } from "react";
import Web3 from "web3";
import axios from "axios";
import { MarketContract, OGNFTContract } from "../../../lib/web3.config";

 const web3 = new Web3(window.ethereum);

const FundingNftCard = ({ indexId, account}) => {
    const[tokenData, setTokenData] = useState();
    const [price, setPrice] = useState(0);
    // const [OGIndex, setOGIndex] = useState();
    
    const getOGTokenURI = async () => {
        try {
            const priceResponse = await MarketContract.methods.OGNftList(indexId).call();
            console.log(priceResponse);
            setPrice(web3.utils.fromWei(Number(priceResponse.price),"ether"));
            console.log(price);
            // const tokenId = Number(response.OGTokenId);

          const response = await OGNFTContract.methods.tokenURI(Number(priceResponse.OGTokenId)).call();          
          const metadataResponse = await axios.get(response);
          setTokenData(metadataResponse.data);
        //   console.log(metadataResponse.data);
        } catch (error) {
          console.error(error);
        }
    };
    
    useEffect(() => {
        getOGTokenURI();
    }, []);
    
    
    
    

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box className="flex flex-col justify-center items-center border rounded-md mb-10 ">
        {tokenData && <div>
                <Box>
                    <Image src={tokenData.image} className="w-[256px] rounded-t-md " />
                </Box>
                    <Box className="bg-gray-100 w-full px-4 py-1">
                        <Box className="flex justify-between">
                            <div>{tokenData.name}</div>
                            <Text className="cursor-default text-sm font-semibold text-blue-500 rounded-lg">
                                Inprogress
                            </Text>
                        </Box>
                            <div className="bg-red-100">{tokenData.description}</div>   {/*수정한 부분-조성윤*/}
                            <div className="bg-red-100">{tokenData.attributes.map((v,i) => {return<div key={i}>{v.trait_type} {v.value}</div>})}</div>
                        <Text className="text-blue-400 text-sm mt-1">Each Piece</Text>
                        <Text className="text-blue-500 font-semibold mt-1">{price/20} ETH</Text>
                    </Box>
                <Box className="bg-gray-100 w-full flex justify-center py-2">
                    <Button
                        colorScheme="blue"
                        className="font-bold text-white  px-4 py-2 rounded-md "
                        onClick={onOpen}
                        >
                        Funding
                    </Button>
                </Box>
                <FundingModal isOpen={isOpen} onClose={onClose} indexId={indexId} account={account} tokenData={tokenData} price={price}/>
            </div>}
            </Box>
    );
};

export default FundingNftCard;
