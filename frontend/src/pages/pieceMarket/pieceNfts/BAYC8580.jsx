import {
    Box,
    Text,
    Image,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

const BAYC8580 = ({ num }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
            <Box className="cursor-pointer ">
                <Image
                    onClick={onOpen}
                    src={`https://olive-specific-newt-363.mypinata.cloud/ipfs/QmNhjo67mp3LZKFracSt7w6DxNTLp3guyyBJJZVe92uCZx/${num}.jpg`}
                />
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="flex justify-center bg-gray-100 rounded-t-md">
                        <Image
                            className="w-[256px] rounded-md"
                            src={`https://olive-specific-newt-363.mypinata.cloud/ipfs/QmNhjo67mp3LZKFracSt7w6DxNTLp3guyyBJJZVe92uCZx/${num}.jpg`}
                        />
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text className="font-semibold">BAYC #8580 #{num}</Text>
                        <Text className="text-blue-400 text-sm mt-1">Piece Number: {num}</Text>
                        <Text className="text-blue-500 font-semibold mt-1">Price: 0.05 ETH</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={2}>
                            Buy now
                        </Button>
                        <Button colorScheme="gray" onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default BAYC8580;
