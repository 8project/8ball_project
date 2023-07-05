import { Box, Text, Image, Button } from "@chakra-ui/react";
import { useState } from "react";

const MyNft = () => {
  const [isCancelConfirmationOpen, setCancelConfirmationOpen] = useState(false);

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

  return (
    <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
      <Text>On Sale</Text>
      <Box className="flex flex-col justify-center items-center border rounded-md mb-10 ">
        <Image
          src="https://ipfs.io/ipfs/QmavwZZLUcudbdBidTivN7pQTyyZKdmXXbYv4Z7vPjaBMa"
          w={"256px"}
        />
        <Box className="bg-gray-100 w-full px-4 py-1">
          <Text>Kongz #7332</Text>

          <Button
            colorScheme="blue"
            onClick={handleCancel}
            className="justify-center text-center w-full py-4"
          >
            Cancel
          </Button>
        </Box>
      </Box>

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
    </Box>
  );
};

export default MyNft;
