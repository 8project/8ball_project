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

const VoteNftModal = ({ isConfirmationOpen, handleConfirmation }) => {
    return (
        <Box>
            <Modal isOpen={isConfirmationOpen} onClose={() => handleConfirmation(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirmation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Are you sure you want to submit your vote?</ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" onClick={() => handleConfirmation(true)}>
                            Confirm
                        </Button>
                        <Button colorScheme="red" ml={3} onClick={() => handleConfirmation(false)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default VoteNftModal;
