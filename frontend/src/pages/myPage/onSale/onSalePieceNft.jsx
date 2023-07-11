import { Box, Text, Image, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  OGNFTContract,
  MarketContractAddress,
  MarketContract,
} from "../../../lib/web3.config";
import Web3 from "web3";
import axios from "axios";

const OnSalePieceNft = ({ account }) => {
  const [isCancelConfirmationOpen, setCancelConfirmationOpen] = useState(false);

  const [dataID, setDataID] = useState([]); // TOKEN ID
  const [dataURI, setDataURI] = useState([]); // URI

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

  const getOnSaleNftMetadata = async () => {
    try {
      const response = await OGNFTContract.methods
        .getMyNftTokenId_OG(MarketContractAddress)
        .call(); //nft 정보 불러오기
      console.log(response);
      const marketNftListArr = response.map((v) => {
        return Number(v);
      }); // 판매 등록된 NFT 목록을 가져옴
      // console.log(marketNftListArr);
      for (let index = 1; index <= marketNftListArr.length; index++) {
        const getSaleList = await MarketContract.methods
          .OGNftList(index)
          .call(); //등록된 nft 목록의 정보를 가져옴

        // console.log( 'index' , index );
        // console.log( 'seller' , getSaleList.seller  ) ;
        // console.log( 'account' , account ) ;

        const add = getSaleList.seller.toLowerCase();

        if (add === account) {
          //해야될거 가져온 배열의 address들중에서 account와 같은 것만 추출.
          // console.log( 'push!' ) ;
          setDataID((prev) => [...prev, getSaleList.OGTokenId]);
          const uri = await OGNFTContract.methods
            .tokenURI(getSaleList.OGTokenId)
            .call();
          const uri2 = await axios.get(uri);
          setDataURI((prev) => [...prev, uri2]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOnSaleNftMetadata();
  }, []);
  useEffect(() => {
    console.log("data", dataURI);
  }, [dataURI]);

  return (
    <div>
      {dataURI?.map((v, i) => {
        return (
          <div>
            <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]" key={i}>
              <Text>On Sale</Text>
              <Box className="flex flex-col justify-center items-center border rounded-md mb-10 ">
                <Image src={v.data.image} w={"256px"} />
                <Box className="bg-gray-100 w-full px-4 py-1">
                  <Text>{v.data.name}</Text>
                  <div>{v.data.description}</div>
                  {/* <div>{v.data.attributes.map((traits,key) => {return<div key={key}>{traits.trait_type} {traits.value}</div>})}</div> */}
                  <Button
                    colorScheme="blue"
                    onClick={handleCancel}
                    className="justify-center text-center w-full py-4"
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    className="justify-center mt-1 text-center w-full py-4"
                  >
                    Withdraw Fundraise
                  </Button>
                </Box>
              </Box>
            </Box>
          </div>
        );
      })}
      ;
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
    </div>
  );
};

export default OnSalePieceNft;
