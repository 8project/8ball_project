const VoteNftModal = () => {
    return(
        <div>
            <Modal
                isOpen={isConfirmationOpen}
                onClose={() => handleConfirmation(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirmation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to submit your vote?
                    </ModalBody>
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
        </div>
    );
}   

export default VoteNftModal;