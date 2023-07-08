import { Box, Text, Image, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { OGNFTContract, MarketContractAddress, MarketContract } from "../../lib/web3.config";
import Web3 from "web3";


const OnSale = ({account}) => {
  const[OGTokenListArray, setOGTokenListArray] = useState();
  const [isCancelConfirmationOpen, setCancelConfirmationOpen] = useState(false);
  const [OGTokenIds, setOGTokenIds] = useState([]);

  const handleCancel = () => {
    setCancelConfirmationOpen(true);
  };

  const handleConfirmCancel = () => {
    // 취소버튼 누를 시 필요한 기능 수행.
    console.log("Cancel confirmed");
    setCancelConfirmationOpen(false);
  };

  const handleCancelCancel = () => {
    setCancelConfirmationOpen(false);
  };




  const getNftMetadata = async () => {
      try {
          const response = await OGNFTContract.methods.getMyNftTokenId_OG(MarketContractAddress).call();

          const marketTokenArray = response.map((v) => {return Number(v)});
          setOGTokenListArray(marketTokenArray);
          // console.log(marketTokenArray);
          let i = marketTokenArray.length+1;
          for(i=0; i<marketTokenArray.length; i++){
            const response2 = await MarketContract.methods.OGNftList(i).call();
            console.log(response2);
          }
      } catch (error) {
          console.error(error);
      }
  };
  console.log(OGTokenListArray);
  useEffect(() => {getNftMetadata()}, []);

  const compareContractAndAccount = async () => {
    const response = await MarketContract.methods.OGNftList().call();
    console.log(response);
  };
 



  return (
    <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
      <Text>On Sale</Text>
      <Box className="flex flex-col justify-center items-center border rounded-md mb-10 ">
        <Image
          src="https://ipfs.io/ipfs/QmavwZZLUcudbdBidTivN7pQTyyZKdmXXbYv4Z7vPjaBMa"
          w={"256px"}
        />
        <Box className="bg-gray-100 w-full px-4 py-1">
          <Text>BAYC #5895</Text>

          <Button
            colorScheme="blue"
            onClick={handleCancel}
            className="justify-center text-center w-full py-4"
          >
            Cancel
          </Button>
        </Box>
        <button onClick={compareContractAndAccount}>dasdasdasdasd</button>
      </Box>

      {isCancelConfirmationOpen && (
        <Box className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Box
            bg="white"
            p={4}
            rounded="md"
            shadow="md"
            maxW="sm"
            mx="auto"
            textAlign="center"
          >
            <Text>Are you sure you want to cancel?</Text>
            <Box mt={4}>
              <Button colorScheme="blue" mr={2} onClick={handleConfirmCancel}>
                Confirm
              </Button>
              <Button colorScheme="teal" onClick={handleCancelCancel}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default OnSale;
