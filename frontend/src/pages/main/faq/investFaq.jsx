import { Box, Text, Collapse } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";

const InvestFaq = () => {
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
                    <Text className="ml-4 my-1 text-sm">조각 투자는 어떻게 하나요?</Text>
                    <Box className="mr-4 mt-2 ">
                        {isOpen1 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                    </Box>
                </Box>
                <Collapse in={isOpen1} animateOpacity>
                    <Box className="bg-gray-50">
                        <Text className="lg:min-w-[600px] min-w-[400px]  text-xs px-4 py-2">
                            Fundgin Market을 통해 조각 NFT를 펀딩 할 수 있으며, 모집인원이 채워지면
                            조각 NFT를 발행합니다. 지금 받은 조각 NFT는 Piece Market을 통해 유저간
                            거래 가능합니다. Offer를 받을 경우 투표를 통해 원본 NFT에 대한
                            판매결정을 하게 되며, 원본 NFT가 판매 되면 조각 NFT를 반납하고 판매
                            대금을 지급 받습니다.
                        </Text>
                    </Box>
                </Collapse>
                <Box
                    onClick={Toggle2}
                    className="flex justify-between lg:min-w-[600px] min-w-[400px] hover:cursor-pointer border-b"
                >
                    <Text className="ml-4 my-1 text-sm">수익은 어떻게 얻나요?</Text>
                    <Box className="mr-4 mt-2 ">
                        {isOpen2 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                    </Box>
                </Box>
                <Collapse in={isOpen2} animateOpacity>
                    <Box className="bg-gray-50">
                        <Text className="lg:min-w-[600px] min-w-[400px] lg:text-md text-xs px-4 py-2">
                            원본 NFT에 대해 Offer를 받을 경우 투표를 통해 판매결정을 하며, 원본
                            NFT가 판매되면 조각 NFT 당 5%의 지분율로 수익금을 지급합니다.
                        </Text>
                    </Box>
                </Collapse>
                <Box
                    onClick={Toggle3}
                    className="flex justify-between lg:min-w-[600px] min-w-[400px] hover:cursor-pointer border-b"
                >
                    <Text className="ml-4 my-1 text-sm">조각 NFT를 팔 수 있나요?</Text>
                    <Box className="mr-4 mt-2 ">
                        {isOpen3 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                    </Box>
                </Box>
                <Collapse in={isOpen3} animateOpacity>
                    <Box className="bg-gray-50">
                        <Text className="lg:min-w-[600px] min-w-[400px] text-xs  px-4 py-2">
                            8ball의 PieceMarket을 통해서 유저간 조각 NFT 거래가 가능합니다. 단, 조각
                            NFT는 모두 똑같이 5%의 지분율을 증명하며, 유저간 거래 시 발생하는 조각
                            NFT의 가격의 상관없이 수익금은 지분율에 따라 지급합니다.
                        </Text>
                    </Box>
                </Collapse>
                <Box
                    onClick={Toggle4}
                    className="flex justify-between lg:min-w-[600px] min-w-[400px] hover:cursor-pointer"
                >
                    <Text className="ml-4 my-1 text-sm">
                        조각난 NFT가 아닌 완전한 NFT를 살 수 있나요?
                    </Text>
                    <Box className="mr-4 mt-2 ">
                        {isOpen4 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                    </Box>
                </Box>
                <Collapse in={isOpen4} animateOpacity>
                    <Box className="bg-gray-50">
                        <Text className="lg:min-w-[600px] min-w-[400px] text-xs px-4 py-2">
                            원본 NFT에 대해 Offer를 하면 조각 NFT를 소유한 투자자들이 투표를 합니다.
                            이후 판매 결정이 되면 온전한 NFT를 소유 할 수 있습니다.
                        </Text>
                    </Box>
                </Collapse>
            </Box>
        </Box>
    );
};
export default InvestFaq;
