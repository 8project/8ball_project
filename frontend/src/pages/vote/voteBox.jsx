import { useState } from "react";
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

const VoteBox = () => {
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
