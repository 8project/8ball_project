import { useEffect, useState } from "react";
import {
    Box,
    Card,
    Stack,
    CardBody,
    Heading,
    Button,
    Image,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    RadioGroup,
    HStack,
    Radio,
    FormHelperText,
} from "@chakra-ui/react";
import { MarketContract } from "../../lib/web3.config";

const VoteNftCard = ({
    v,
    i,
    bestOffer,
    selectedOption,
    isSubmitted,
    handleOptionClick,
    handleSubmit,
    handleConfirmation,
    isConfirmationOpen,
    account,
    OGTokenId
}) => {
    const [voted, setVoted] = useState();
    const [inputValue, setInputValue] = useState();
    console.log(voted);
    
    // const [downVoted, setDownVoted] = useState(false);
    /*
  const [bools, setBools] =useState(true);

  const onClickButton = () => {
    setBools(true);
  }
  const onClickButton2 = () => {
    setBools(false);
  }

   <form onSubmit={onSubmitStartVote}>
          <div className="flex bg-purple-300">
            <div>true</div>
            <div className="ml-2 ">false</div>
          </div>

          <div className="bg-purple-300">
            <input type="text" value={voteIndex} onChange={(e) => setVoteIndex(e.target.value)}></input>

            <input onClick={onClickButton} type="checkbox"></input>
            <input onClick={onClickButton2} type="checkbox"></input>
            <button>  : 투표하기</button>
          </div>
        </form>

        
  */
    // const handleUpVote = () => {
    //   if (!isSubmitted) {
    //     setVoted(true);
    //     setDownVoted(false);
    //     handleOptionClick("up");
    //     console.log(upVoted);
    //   }
    // };

    // const handleDownVote = () => {
    //   if (!isSubmitted) {
    //     setUpVoted(false);
    //     setDownVoted(true);
    //     handleOptionClick("down");
    //     console.log(downVoted);
    //   }
    // };
    console.log(voted);

    const onSubmitVote = async (e) => {
      e.preventDefault();
      try {
        const response = await MarketContract.methods.startVote(OGTokenId ,voted).send({ from: account });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
      
    return (
        <Box>
            <Card className="lg:max-w-[800px] max-w-[460px] flex justify-center items-center mb-4 bg-gray-200 pb-12 pl-10 pr-10">
                <Stack direction="row" spacing={4} className="flex">
                    <Box className="m-2">
                        <Text>{v.data.name}</Text>
                        <Image src={v.data.image} alt="pieceNft" className="w-20 h-20" />
                        <div> Avalival Ticket : </div>
                    </Box>
                    <Box className="m-2 p-1 text-center">
                        <Box className="text-blue-500">Offer Price</Box>
                        <Box className="text-xl font-bold">{bestOffer} ETH</Box>
                    </Box>
                    <Box className="m-2 p-1 text-center">
                        <Box className="text-blue-500">Duration</Box>
                        <Box className="text-xl font-bold">0618~0619</Box>
                    </Box>
                    <Box className="m-2 p-1 text-center">
                        <Box className="text-blue-500">Vote</Box>
                        <Box>
                            <form
                                onSubmit={
                                    voted === "up" || voted === "down"
                                        ? onSubmitVote
                                        : (e) => {
                                              e.preventDefault();
                                              alert("check vote");
                                          }
                                }
                            >
                                <Box className="flex items-center mt-2">
                                    <input
                                        type="checkbox"
                                        value={voted}
                                        onClick={() => {
                                            setVoted(true);
                                        }}
                                        disabled={isSubmitted}
                                    ></input>
                                    <Box className="ml-2 text-sm font-bold">Up</Box>
                                </Box>
                                <Box className="flex items-center mt-2">
                                    <input
                                        type="checkbox"
                                        value={voted}
                                        onClick={() => {
                                            setVoted(false);
                                        }}
                                        disabled={isSubmitted}
                                    ></input>
                                    <Box className="ml-2 text-sm font-bold">Down</Box>
                                </Box>

                                <Box className="self-end ">
                                    <Button
                                        type="submit"
                                        onSubmit={onSubmitVote}
                                        className={`text-white m-1 p-1 rounded-md ${
                                            isSubmitted ? "disabled" : "bg-blue-500"
                                        }`}
                                        disabled={isSubmitted}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Stack>
                {isSubmitted && <Box className="self-end ml-2"></Box>}
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
            </Card>
        </Box>
    );
};

export default VoteNftCard;
