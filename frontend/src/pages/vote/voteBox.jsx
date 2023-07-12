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
import Web3 from "web3";

const VoteBox = ({ account }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [OGTokenId, setOGTokenIds] = useState([]);
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
      const response = await OGNFTContract.methods.getMyNftTokenId_OG(MarketContractAddress).call();
      const marketNftTokenId = response.map((v) => {return Number(v);});
      setOGTokenIds(marketNftTokenId); //tokenId 가져옴
      console.log(marketNftTokenId);
      for (let i = 1; i <= marketNftTokenId.length; i++) {
        const checkPieceOwnerRes = await MarketContract.methods.CheckOutPieceOwner(i, account).call();
        console.log(checkPieceOwnerRes);
        if(checkPieceOwnerRes === true){
          const getTokenUriRes = await OGNFTContract.methods.tokenURI(i).call();
          const uri = await axios.get(getTokenUriRes);
          const getBestOfferRes = await MarketContract.methods.currentPolls(i).call();
          const changeToNum = Number(getBestOfferRes.bestOfferPrice);
          console.log(changeToNum);
          setBestOffer(changeToNum);
          console.log(getTokenUriRes);
          console.log(uri);
          setDataURI((prev) => [...prev, uri]);
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

    const voting = async (e) => {
        e.preventDefault();
        const voteRes = await MarketContract.methods.startVote().send({ from: account });
        console.log(voteRes);
    };

  // const check = async () => {
  //   try {
  //     const getTokenUriRes = await OGNFTContract.methods.tokenURI(1).call();
  //     console.log(getTokenUriRes);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  
  
  useEffect(() => {
    getMyNftTokenIds_OG();
  }, []);
  // useEffect(() => {
  //   console.log(votePermissionList);
  // }, [votePermissionList]);
  // useEffect(() => {
  //   console.log(dataURI);
  // }, [dataURI]);

  return (
    <Box>
      {/* {dataURI ? (
        dataURI > 0 ? ( */}
      <Box className=" bg-gray-500 lg:max-w-[800px] max-w-[460px] border rounded-md p-2">
        <div>
          {dataURI?.map((v, i) => {
            return (
              <div>
                <div
                  key={i}
                  className={`lg:max-w-[800px] max-w-[460px] flex justify-center items-center mb-4 ${
                    isSubmitted ? "bg-gray-400" : "bg-gray-200"
                  } pb-12 pl-6`}
                >
                  <div className="m-2">
                    <img src={v.data.image} alt="pieceNft" className="w-10 h-10"/>
                  </div>
                  <div className="m-2 p-1 text-center">
                    <div>Offer price</div>
                    <div className="text-blue-500">{bestOffer} ETH</div>
                  </div>
                  <div className="m-2 p-1 text-center">
                    <div className="">Duration</div>
                    <div>0618~0619</div> // {/*기간도 설정해줘야함 */}
                  </div>
                  <div className="mt-6 ml-4">
                    <div>Vote</div>
                    <div>
                      <div className="flex items-center">
                        <button
                          className={`option-button ${
                            selectedOption === "up" ? "selected" : ""
                          }`}
                          onClick={() => handleOptionClick("up")}
                          disabled={isSubmitted}
                        ></button>
                        <div className="ml-2">Up</div>
                      </div>
                      <div className="flex items-center">
                        <button
                          className={`option-button ${
                            selectedOption === "down" ? "selected" : ""
                          }`}
                          onClick={() => handleOptionClick("down")}
                          disabled={isSubmitted}
                        ></button>
                        <div className="ml-2">Down</div>
                      </div>
                    </div>
                  </div>
                  {!isSubmitted && (
                    <div className="self-end ml-2">
                      <button
                        className={`text-white m-1 p-1 rounded-md ${
                          isSubmitted ? "disabled" : "bg-blue-500"
                        }`}
                        onClick={handleSubmit}
                        disabled={isSubmitted}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                  {isSubmitted && <div className="self-end ml-2"></div>}

                  <Modal
                    isOpen={isConfirmationOpen}
                    onClose={() => handleConfirmation(false)}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Confirmation</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        Are you sure you want to submit your vote?
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          colorScheme="green"
                          onClick={() => handleConfirmation(true)}
                        >
                          Confirm
                        </Button>
                        <Button
                          colorScheme="red"
                          ml={3}
                          onClick={() => handleConfirmation(false)}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </div>
              </div>
            );
          })}
        </div>
      </Box>
      {/* ) : (
      <Box className="flex flex-col justify-center items-center mt-60">
        <LuVote size={100} className=" text-red-600" />
        <Text className="font-[Tenada] text-lg">
          현재 진행중인 <sapn className="text-xl text-red-500">투표</sapn>가
          없습니다.
        </Text>
      </Box>
      ) ) : (
      <Button
        isLoading
        loadingText="Loading"
        colorScheme="blue"
        variant="outline"
      >
        Loading
      </Button>
      )} */}
    </Box>
  );
};

export default VoteBox;