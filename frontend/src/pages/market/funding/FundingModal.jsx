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
} from "@chakra-ui/react";
import { useState } from "react";
import { MarketContract } from "../../../lib/web3.config";
import Web3 from "web3";


const web3 = new Web3(window.ethereum);

const FundingModal = ({ isOpen, onClose, tokenData, account, price }) => {
    const [count, setCount] = useState(60);

    const onClickFunding = async(e) => {
        e.preventDefault();
        try {
            const fundingPrice =web3.utils.toWei((price/20),"ether");
            console.log(tokenData.edition);
            console.log(account);
            console.log(fundingPrice);
            const response = await MarketContract.methods.OGFunding(tokenData.edition).send({from : account, value : fundingPrice});  
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

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
                            <Text className="font-semibold">
                                {tokenData.name}
                            </Text>
                            <Text className="text-blue-400 text-sm mt-1">Total piece: {price}</Text>
                            <Text className="text-blue-500 font-semibold mt-1">
                                Per piece: {price / 20} ETH
                            </Text>
                            <Box className="mt-4 text-sm font-semibold">
                                <Box className="flex justify-between">
                                    <Text>Funding rate</Text>
                                    <Text>{count}%</Text>
                                </Box>
                                <Slider aria-label="slider-ex-1" defaultValue={count}>
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb />
                                </Slider>
                            </Box>
                            <Box className="flex flex-col justify-center items-center text-xs mt-4">
                                <Text>* 조각 NFT는 랜덤으로 지급됩니다.</Text>
                                <Text>* 조각 NFT당 5%의 지분율을 갖게 됩니다.</Text>
                            </Box>
                        </ModalBody>
                    )}

                    <ModalFooter>
                        <Button onClick={onClickFunding}colorScheme="blue" mr={2}>
                            Funding now
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
