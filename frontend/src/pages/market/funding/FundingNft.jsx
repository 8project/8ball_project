import { Box, Text, Image, Button, useDisclosure } from "@chakra-ui/react";
import FundingModal from "./FundingModal";
import { useState, useEffect } from "react";
import ABI from "../../../lib/OGNftABI.json";
import MarketABI from "../../../lib/MarketABI.json";
import PieceMarketABI from "../../../lib/PieceMarketABI.json";
import Web3 from "web3";
import axios from "axios";

const FundingNft = ({ num }) => {
    const web3 = new Web3(window.ethereum);
    const OGNFTContractAddress = "0xe28433CFe04E125401bd827026BB3a55e8c63Cfd";
    const MarketContractAddress = "0x05f086663c3f7E2C23C13ADA90cf6D8A9EE98B6c";
    const PieceMarketContractAddress = "0x05f086663c3f7E2C23C13ADA90cf6D8A9EE98B6c";

    const OGNFTContract = new web3.eth.Contract(ABI, OGNFTContractAddress);
    const MarketContract = new web3.eth.Contract(MarketABI, MarketContractAddress);
    const PieceMarketContract = new web3.eth.Contract(PieceMarketABI, PieceMarketContractAddress);
    const PINATA_URL =
        "https://harlequin-melted-loon-875.mypinata.cloud/ipfs/QmeLaCLNm647Sv5TotdEcSvP9qXhhXmZe22jjRTgT471X2";

    const [nft, setNft] = useState();

    const getNftMetadata = async () => {
        try {
            const response = await axios.get(`${PINATA_URL}/${num}.json`);

            setNft({
                name: response.data.name,
                description: response.data.description,
                image: response.data.image,
                attributes: response.data.attributes,
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getNftMetadata();
    }, []);

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box className="flex flex-col justify-center items-center border rounded-md mb-10 ">
            <Box>
                <Image src={nft?.image} className="w-[256px] rounded-t-md " />
            </Box>

            {nft && (
                <Box className="bg-gray-100 w-full px-4 py-1">
                    <Box className="flex justify-between">
                        <Text>
                            {nft.name} #{num}
                        </Text>
                        <Text className="cursor-default text-sm font-semibold text-blue-500 rounded-lg">
                            Inprogress
                        </Text>
                    </Box>
                    <Text className="text-blue-400 text-sm mt-1">1 piece</Text>
                    <Text className="text-blue-500 font-semibold mt-1">0.05 ETH</Text>
                </Box>
            )}
            <Box className="bg-gray-100 w-full flex justify-center py-2">
                <Button
                    colorScheme="blue"
                    className="font-bold text-white  px-4 py-2 rounded-md "
                    onClick={onOpen}
                >
                    Funding
                </Button>
            </Box>
            <FundingModal isOpen={isOpen} onClose={onClose} nft={nft} num={num} />
        </Box>
    );
};

export default FundingNft;
