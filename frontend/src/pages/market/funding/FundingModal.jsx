import {
  Box,
  Text,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { MarketContract } from "../../../lib/web3.config";
import Web3 from "web3";
// function OGListForSale_buyerList(uint _index) public view returns(address[] memory) {
//     return OGNftList[_index].buyer;
// }
const web3 = new Web3(window.ethereum);

const FundingModal = ({
  isOpen,
  onClose,
  tokenData,
  account,
  price,
  indexId,
  buyerArray,
}) => {
  const [buyer, setBuyer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onClickBatchFunding = async (e) => {
    e.preventDefault();
    try {
      const fundingPrice = web3.utils.toWei(price /*/20*/, "ether");
      setIsLoading(true);
      const response = await MarketContract.methods
        .OGBatchFunding(indexId)
        .send({ from: account, value: fundingPrice })
        .on("transactionHash", (hash) => {
          // 트랜잭션을 보내고 로딩 발현.
          console.log("Transaction hash:", hash);
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          // Transaction confirmed, handle receipt
          console.log("Confirmation number:", confirmationNumber);
          console.log("Receipt:", receipt);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const onClickFunding = async (e) => {
    e.preventDefault();
    try {
      const fundingPrice = web3.utils.toWei(price / 20, "ether");
      setIsLoading(true);
      const response = await MarketContract.methods
        .OGFunding(indexId)
        .send({ from: account, value: fundingPrice })
        .on("transactionHash", (hash) => {
          // 트랜잭션을 보내고 로딩 state 보여줌.
          console.log("Transaction hash:", hash);
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          // 거래를 확인하고 다시 setIsLoading false.
          console.log("Confirmation number:", confirmationNumber);
          console.log("Receipt:", receipt);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const getFundingBuyerList = async () => {
    try {
      const buyerArray = await MarketContract.methods
        .OGListForSale_buyerList(indexId)
        .call();
      // console.log(BuyerArray);
      setBuyer(buyerArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFundingBuyerList();
  }, []);

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="flex justify-center bg-gray-100 rounded-t-md">
            <Image src={tokenData.image} />
          </ModalHeader>
          <ModalCloseButton />
          {tokenData && (
            <ModalBody>
              <Text className="font-semibold">{tokenData.name}</Text>
              <Text className="text-blue-400 text-sm mt-1">
                Total piece: {price}
              </Text>
              <Text className="text-blue-500 font-semibold mt-1">
                Per piece: {price / 20} ETH
              </Text>
              {buyer.length ? (
                <Box className="mt-4 text-sm font-semibold">
                  <Box className="flex justify-between">
                    <Text>Funding rate</Text>
                    <Text>{buyer.length * 5} / 100 %</Text>
                  </Box>
                  <Slider
                    aria-label="slider-ex-1"
                    defaultValue={buyer.length * 5}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>
              ) : buyer.length === 0 ? (
                <Box className="mt-4 text-sm font-semibold">
                  <Box className="flex justify-between">
                    <Text>Funding rate</Text>
                    <Text>0 / 100 %</Text>
                  </Box>
                  <Slider aria-label="slider-ex-1" defaultValue={0}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>
              ) : (
                <Button
                  isLoading
                  loadingText="Loading"
                  colorScheme="blue"
                  variant="outline"
                >
                  Loading
                </Button>
              )}
              <Box className="flex flex-col justify-center items-center text-xs mt-4">
                <Text>* 조각 NFT는 랜덤으로 지급됩니다.</Text>
                <Text>* 조각 NFT당 5%의 지분율을 갖게 됩니다.</Text>
                <Box className="mt-2">
                  {buyer.length ? (
                    <Box className="flex flex-col justify-center items-center mt-2 border rounded-lg px-4 py-2">
                      <Text className="text-lg font-semibold mb-2">
                        Funding History
                      </Text>

                      <Box className="grid grid-cols-4 gap-2 mt-1">
                        {buyer.map((v, i) => {
                          return (
                            <Box
                              key={i}
                              className="flex justify-around text-xs"
                            >
                              <Box className="font-bold">{i + 1}</Box> :
                              <Box className="text-gray-600">
                                {v.substring(0, 4)}...{v.slice(-4)}
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  ) : buyer.length === 0 ? (
                    <Text className="text-lg font-semibold mb-2">
                      No History
                    </Text>
                  ) : (
                    <Button
                      isLoading
                      loadingText="Loading"
                      colorScheme="blue"
                      variant="outline"
                    >
                      Loading
                    </Button>
                  )}
                </Box>
              </Box>
            </ModalBody>
          )}

          <ModalFooter>
            <Button
              onClick={onClickBatchFunding}
              colorScheme="blue"
              mr={2}
              isLoading={isLoading}
              loadingText="Funding..."
              spinner={<Spinner size="sm" />}
            >
              Funding now
            </Button>
            <Button
              onClick={onClickFunding}
              colorScheme="blue"
              mr={2}
              isLoading={isLoading}
              loadingText="Funding..."
              spinner={<Spinner size="sm" />}
            >
              테스트용조각하나만 민팅됨
            </Button>
            <Button colorScheme="teal" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default FundingModal;
