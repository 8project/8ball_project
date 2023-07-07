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
import Nfts from "../../../components/Nfts";

const FundingModal = ({ isOpen, onClose, nft, num }) => {
    const [count, setCount] = useState(60);

    return (
        <Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="flex justify-center bg-gray-100 rounded-t-md">
                        <Image src={nft?.image} />
                    </ModalHeader>
                    <ModalCloseButton />
                    {nft && (
                        <ModalBody>
                            <Text className="font-semibold">
                                {nft.name} #{num}
                            </Text>
                            <Text className="text-blue-400 text-sm mt-1">Total piece: 20</Text>
                            <Text className="text-blue-500 font-semibold mt-1">
                                Per piece: 0.05 ETH
                            </Text>
                            <Box className="mt-4 text-sm font-semibold">
                                <Box className="flex justify-between">
                                    <Text>Recruitment rate</Text>
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
                        <Button colorScheme="blue" mr={2}>
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
