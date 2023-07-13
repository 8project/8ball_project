import { useEffect, useState } from "react";
import {
    Button,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
} from "@chakra-ui/react";
import { MarketContract, MarketContractAddress, OGNFTContract } from "../../lib/web3.config";
import axios from "axios";
import VoteNftCard from "./voteNftCard";
import Web3 from "web3";
import { LuVote } from "react-icons/lu";

const web3 = new Web3(window.ethereum);
const VoteBox = ({ account }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [OGTokenId, setOGTokenIds] = useState([]);
    const [dataID, setDataID] = useState([]); // TOKEN ID
    const [dataURI, setDataURI] = useState([]); // URI
    const [bestOffer, setBestOffer] = useState();

    const handleOptionClick = (option) => {
        if (!isSubmitted) {
            setSelectedOption(option);
        }
    };

    const handleSubmit = () => {
        if (selectedOption) {
            setIsConfirmationOpen(true);
        }
    };

    const handleConfirmation = (confirmed) => {
        setIsConfirmationOpen(false);
        if (confirmed) {
            setIsSubmitted(true);
            console.log("Submitted option:", selectedOption);
        }
    };

    console.log(dataURI);
    //===================================================================================

    //Funding이 완료된 index의 ogTokenId를 불러오기
    //address[]에서 account와 일치하는 tokenId 가져오기
    //

    const getMyNftTokenIds_OG = async () => {
        try {
            const response = await OGNFTContract.methods
                .getMyNftTokenId_OG(MarketContractAddress)
                .call();
            const marketNftTokenId = response.map((v) => {
                return Number(v);
            });
            setOGTokenIds(marketNftTokenId); //[1,2,3,4,5]
            console.log(marketNftTokenId);

            for (let i = 1; i <= marketNftTokenId.length; i++) {
                const checkOutPieceOwnerRes = await MarketContract.methods
                    .CheckOutPieceOwner(i, account)
                    .call();
                const checkOwner = checkOutPieceOwnerRes;

                if (checkOwner === true) {
                    const tokenUriData = await OGNFTContract.methods.tokenURI(i).call();
                    const getBestOffer = await MarketContract.methods.currentPolls(i).call();
                    const toEther = web3.utils.fromWei(getBestOffer.bestOfferPrice, "ether");
                    setBestOffer(toEther);
                    const uri = await axios.get(tokenUriData);
                    console.log(uri);
                    setDataURI((prev) => [...prev, uri]);
                    console.log(dataURI);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMyNftTokenIds_OG();
    }, []);

    return (
        <Box>
            {dataURI ? (
                <Box className=" bg-gray-500 lg:max-w-[800px] max-w-[460px] border rounded-md p-2">
                    <div>
                        {dataURI?.map((v, i) => {
                            return (
                                <VoteNftCard
                                    key={i}
                                    value={v}
                                    bestOffer={bestOffer}
                                    selectedOption={selectedOption}
                                    isSubmitted={isSubmitted}
                                    handleSubmit={handleSubmit}
                                    handleOptionClick={handleOptionClick}
                                    isConfirmationOpen={isConfirmationOpen}
                                    handleConfirmation={handleConfirmation}
                                    account={account}
                                    OGTokenId={OGTokenId}
                                />
                            );
                        })}
                    </div>
                </Box>
            ) : (
                <Box className="flex flex-col justify-center items-center">
                    <LuVote size={200} className=" text-red-600" />
                    <Text className="font-[Tenada] text-lg">
                        현재 진행중인 <sapn className="text-xl text-red-500">투표</sapn>가 없습니다.
                    </Text>
                </Box>
            )}
        </Box>
    );
    // );
};

export default VoteBox;
