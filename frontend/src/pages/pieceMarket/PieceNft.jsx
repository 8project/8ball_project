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

const PieceNft = ({ num }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
            <Box className="cursor-pointer ">
                <Image
                    onClick={onOpen}
                    src={`https://olive-specific-newt-363.mypinata.cloud/ipfs/QmWhCTPeGQRgAzeaQsNLbuvqedTDhUvcSeDeFbxMitQgQA/5895-0${num}.png`}
                />
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="flex justify-center bg-gray-100 rounded-t-md">
                        <Image
                            className="w-[256px] rounded-md"
                            src={`https://olive-specific-newt-363.mypinata.cloud/ipfs/QmWhCTPeGQRgAzeaQsNLbuvqedTDhUvcSeDeFbxMitQgQA/5895-0${num}.png`}
                        />
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text className="font-semibold">Kongz #7332 #{num}</Text>
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

export default PieceNft;
