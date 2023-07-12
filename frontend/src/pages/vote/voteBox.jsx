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
import { LuVote } from "react-icons/lu";
import VoteNftCard from "./voteNftCard";

const VoteBox = ({ account }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [OGTokenId, setOGTokenIds] = useState([]);
    const [votePermissionList, setVotePermissionList] = useState([]);
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

    //===================================================================================

    //Funding이 완료된 index의 ogTokenId를 불러오기
    //address[]에서 account와 일치하는 tokenId 가져오기
    //

    const getMyNftTokenIds_OG = async () => {
        try {
            /*
      1   2   3   4  <-index
      4   8   5   7  <-tokenid
      39  02  a9  39 <- address [] buyerList
      02  
      39
      .
      .
      . 
      
        arr = [1,2,3,4]
      for (let index = 0; index < array.length; index++) {
        const arr2=arr[i]
      }
      */
            const response = await OGNFTContract.methods
                .getMyNftTokenId_OG(MarketContractAddress)
                .call();
            const marketNftTokenId = response.map((v) => {
                return Number(v);
            });
            setOGTokenIds(marketNftTokenId); //tokenId 가져옴
            console.log(marketNftTokenId);

            const tempArray = [];
            for (let i = 1; i < marketNftTokenId.length + 1; i++) {
                const buyerList = await MarketContract.methods.OGListForSale_buyerList(i).call(); // list index로 for문
                console.log("buyer ", buyerList);
                if (buyerList.length !== 20) {
                    // buyerLength 가 20인 것만 추출
                    tempArray.push(buyerList); // buyerList == []
                    console.log("tempArr", tempArray);
                    for (let j = 0; j < tempArray.length; j++) {
                        const getRealBuyer = tempArray[j]; //수정할 부분
                        console.log("getRealBuyer", getRealBuyer);
                        for (let k = 0; k < getRealBuyer.length; k++) {
                            if (getRealBuyer[k].toLowerCase() !== account.toLowerCase()) {
                                setVotePermissionList((prev) => [...prev, getRealBuyer]);
                                // const uri = await OGNFTContract.methods.tokenURI().call(); //해당 토큰 ID가
                                const a = await MarketContract.methods.OGNftList(i).call();
                                const res = await MarketContract.methods.currentPolls(i).call();
                                const changeToNum = Number(res.bestOfferPrice);
                                setBestOffer(changeToNum);
                                const uri = await OGNFTContract.methods
                                    .tokenURI(a.OGTokenId)
                                    .call();
                                // console.log(uri);
                                const uri2 = await axios.get(uri);
                                // console.log(uri2);
                                setDataURI((prev) => [...prev, uri2]);
                            }
                        }
                    }
                }
            }
            console.log(tempArray);
        } catch (error) {
            console.log(error);
        }
    };
    const voting = async (e) => {
        e.preventDefault();
        const voteRes = await MarketContract.methods.startVote().send({ from: account });
        console.log(voteRes);
    };

    useEffect(() => {
        getMyNftTokenIds_OG();
    }, []);
    // useEffect(() => {
    //     console.log(votePermissionList);
    // }, [votePermissionList]);
    // useEffect(() => {
    //     console.log(dataURI);
    // }, [dataURI]);

    return (
        <Box>
            {/* {dataURI ? ( */}
            {/* dataURI > 0 ? ( */}
            <Box className=" bg-gray-500 lg:max-w-[800px] max-w-[460px] border rounded-md p-2">
                <div>
                    {dataURI?.map((v, i) => {
                        return (
                            <VoteNftCard
                                v={v}
                                i={v}
                                bestOffer={bestOffer}
                                selectedOption={selectedOption}
                                isSubmitted={isSubmitted}
                                handleSubmit={handleSubmit}
                                handleOptionClick={handleOptionClick}
                                isConfirmationOpen={isConfirmationOpen}
                                handleConfirmation={handleConfirmation}
                            />
                        );
                    })}
                </div>
            </Box>

            {/* : (
                    <Box className="flex flex-col justify-center items-center">
                        <LuVote size={256} className=" text-red-600" />
                        <Text className="font-[Tenada] text-lg">
                            현재 진행중인 <sapn className="text-xl text-red-500">투표</sapn>가
                            없습니다.
                        </Text>
                    </Box>
                )
            ) : (
                <Button isLoading loadingText="Loading" colorScheme="blue" variant="outline">
                    Loading
                </Button>
            )} */}
        </Box>
    );
    // );
};

export default VoteBox;
