import { Box, Text, Image, Button, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import Nfts from "../../../components/Nfts";
import FundingModal from "./FundingModal";

const FundingNft = () => {
    const [show, setShow] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box className="flex flex-col justify-center items-center border rounded-md mb-10 ">
            {show ? (
                <Box
                    className=" cursor-pointer"
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    <Image
                        src={"https://ipfs.io/ipfs/QmavwZZLUcudbdBidTivN7pQTyyZKdmXXbYv4Z7vPjaBMa"}
                        className="w-[256px] rounded-t-md "
                    />
                </Box>
            ) : (
                <Box
                    className=" cursor-pointer"
                    onClick={() => {
                        setShow(true);
                    }}
                >
                    <Nfts />
                </Box>
            )}

            <Box className="bg-gray-100 w-full px-4 py-1">
                <Box className="flex justify-between">
                    <Text>BAYC #5895</Text>
                    <Text className="cursor-default text-sm font-semibold text-blue-500 rounded-lg">
                        Inprogress
                    </Text>
                </Box>
                <Text className="text-blue-400 text-sm mt-1">1 piece</Text>
                <Text className="text-blue-500 font-semibold mt-1">0.05 ETH</Text>
            </Box>
            <Box className="bg-gray-100 w-full flex justify-center py-2">
                <Button
                    colorScheme="blue"
                    className="font-bold text-white  px-4 py-2 rounded-md "
                    onClick={onOpen}
                >
                    Funding
                </Button>
            </Box>
            <FundingModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};

export default FundingNft;
