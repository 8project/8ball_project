import { Box, Text, Collapse } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";

const NftFaq = () => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);

    const Toggle1 = () => setIsOpen1(!isOpen1);
    const Toggle2 = () => setIsOpen2(!isOpen2);
    const Toggle3 = () => setIsOpen3(!isOpen3);
    const Toggle4 = () => setIsOpen4(!isOpen4);

    return (
        <Box>
            <Box className="lg:max-w-[600px] max-w-[400px] border rounded-md ">
                <Box
                    onClick={Toggle1}
                    className="flex justify-between lg:max-w-[600px] max-w-[400px] hover:cursor-pointer border-b"
                >
                    <Text className="ml-4 my-1 text-sm">NFT란 무엇인가요?</Text>
                    <Box className="mr-4 mt-2 ">
                        {isOpen1 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                    </Box>
                </Box>
                <Collapse in={isOpen1} animateOpacity>
                    <Box className="bg-gray-50">
                        <Text className="lg:min-w-[600px] min-w-[400px]  text-xs  px-4 py-2">
                            NFT(Non-Fungible Token)은 대체 불가능한 토큰으로 원본을 함부로 바꾸거나,
                            복제할 수 없도록 블록체인 기술 안에서 원본을 인증받을 수 있으며 거래가
                            가능한 가상 자산이자, 특정 대상에 대한 인증서 기능을 할 수 있습니다.
                        </Text>
                    </Box>
                </Collapse>
                <Box
                    onClick={Toggle2}
                    className="flex justify-between lg:min-w-[600px] min-w-[400px] hover:cursor-pointer border-b"
                >
                    <Text className="ml-4 my-1 text-sm">조각 NFT가 무엇인가요?</Text>
                    <Box className="mr-4 mt-2 ">
                        {isOpen2 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                    </Box>
                </Box>
                <Collapse in={isOpen2} animateOpacity>
                    <Box className="bg-gray-50">
                        <Text className="lg:min-w-[600px] min-w-[400px]  text-xs  px-4 py-2">
                            8ball에서는 원본 NFT를 20등분 하여 진짜 조각 NFT를 발행합니다. 원본
                            NFT는 Offer가 되기 전까지 8ball에 보관됩니다.
                        </Text>
                    </Box>
                </Collapse>
                <Box
                    onClick={Toggle3}
                    className="flex justify-between lg:min-w-[600px] min-w-[400px] hover:cursor-pointer border-b"
                >
                    <Text className="ml-4 my-1 text-sm">조각 NFT는 어떻게 구매하나요?</Text>
                    <Box className="mr-4 mt-2 ">
                        {isOpen3 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                    </Box>
                </Box>
                <Collapse in={isOpen3} animateOpacity>
                    <Box className="bg-gray-50">
                        <Text className="lg:min-w-[600px] min-w-[400px]  text-xs  px-4 py-2">
                            8ball의 Fuding, Offer 페이지에서 원본 NFT, 조각 NFT 모두 구매
                            가능합니다.
                        </Text>
                    </Box>
                </Collapse>
                <Box
                    onClick={Toggle4}
                    className="flex justify-between lg:min-w-[600px] min-w-[400px] hover:cursor-pointer"
                >
                    <Text className="ml-4 my-1 text-sm">조각 NFT를 다른곳에서 팔 수 있나요?</Text>
                    <Box className="mr-4 mt-2 ">
                        {isOpen4 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                    </Box>
                </Box>
                <Collapse in={isOpen4} animateOpacity>
                    <Box className="bg-gray-50">
                        <Text className="lg:min-w-[600px] min-w-[400px]  text-xs  px-4 py-2">
                            조각 NFT는 8ball Market 안에서만 거래 가능합니다. 투표를 통해 원본 NFT가
                            판매 될 경우 조각 NFT를 통해 5%의 지분율 만큼 판매대금을 받게 되며, 판매
                            대금 지급 시 조각 NFT는 소멸됩니다.
                        </Text>
                    </Box>
                </Collapse>
            </Box>
        </Box>
    );
};
export default NftFaq;
