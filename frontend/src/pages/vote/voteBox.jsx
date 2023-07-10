import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { MarketContract, MarketContractAddress, OGNFTContract } from "../../lib/web3.config";
import axios from "axios";

const VoteBox = ({ account }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

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
  const [OGTokenId, setOGTokenIds] = useState([]);
  const [votePermissionList, setVotePermissionList] = useState([]);
  const [dataID, setDataID] = useState([]); // TOKEN ID
  const [dataURI, setDataURI] = useState([]); // URI
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
      
        const tempArray = []
        for (let i = 1; i < marketNftTokenId.length+1; i++) {
          const buyerList = await MarketContract.methods.OGListForSale_buyerList(i).call(); // list index로 for문
          console.log("buyer ", buyerList); 
          if(buyerList.length === 20) { // buyerLength 가 20인 것만 추출 
            tempArray.push(buyerList); // buyerList == []
            console.log('tempArr', tempArray);         
            for (let j = 0; j < tempArray.length; j++) {
              const getRealBuyer = tempArray[j] //수정할 부분 
              console.log('getRealBuyer',getRealBuyer);
              for (let k = 0; k < getRealBuyer.length; k++) {
                if(getRealBuyer[k].toLowerCase() === account.toLowerCase()) {
                  setVotePermissionList((prev) => [...prev, getRealBuyer]);
                  // const uri = await OGNFTContract.methods.tokenURI().call(); //해당 토큰 ID가
                  const a = await MarketContract.methods.OGNftList(i).call()
                  const uri = await OGNFTContract.methods.tokenURI(a.OGTokenId).call();
                  console.log(uri);
                  // const uri2 = await axios.get(uri);
                  // console.log(uri2);
                  // setDataURI((prev) => [...prev, uri2]);
                };
              }
              // console.log('getRealBuyer', getRealBuyer);
              
            };
          };
        };
      console.log(tempArray);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {getMyNftTokenIds_OG()}, []);
  useEffect(() => {console.log(votePermissionList)},[votePermissionList]);



  return (
    <div
      className={`lg:max-w-[800px] max-w-[460px] flex justify-center items-center mb-4 ${
        isSubmitted ? "bg-gray-400" : "bg-gray-200"
      } pb-12 pl-6`}
    >
      <div className="m-2">
        <img src="img/pieceNft.png" alt="pieceNft" className="w-10 h-10" />
      </div>
      <div className="m-2 p-1 text-center">
        <div>Offer price</div>
        <div className="text-blue-500">1.2ETH</div>
      </div>
      <div className="m-2 p-1 text-center">
        <div>Duration</div>
        <div>0618~0619</div>
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
          <ModalBody>Are you sure you want to submit your vote?</ModalBody>
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
  );
};

export default VoteBox;
