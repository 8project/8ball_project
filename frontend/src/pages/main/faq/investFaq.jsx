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
          <Text className="ml-4 my-1">투자는 어떻게 하나요?</Text>
          <Box className="mr-4 mt-2 ">
            {isOpen1 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
          </Box>
        </Box>
        <Collapse in={isOpen1} animateOpacity>
          <Box className="bg-gray-50">
            <Text className="lg:min-w-[600px] min-w-[400px] lg:text-md text-sm px-4 py-2">
              Answer
            </Text>
          </Box>
        </Collapse>
        <Box
          onClick={Toggle2}
          className="flex justify-between lg:min-w-[600px] min-w-[400px] hover:cursor-pointer border-b"
        >
          <Text className="ml-4 my-1">Question</Text>
          <Box className="mr-4 mt-2 ">
            {isOpen2 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
          </Box>
        </Box>
        <Collapse in={isOpen2} animateOpacity>
          <Box className="bg-gray-50">
            <Text className="lg:min-w-[600px] min-w-[400px] lg:text-md text-sm px-4 py-2">
              Answer
            </Text>
          </Box>
        </Collapse>
        <Box
          onClick={Toggle3}
          className="flex justify-between lg:min-w-[600px] min-w-[400px] hover:cursor-pointer border-b"
        >
          <Text className="ml-4 my-1">Question</Text>
          <Box className="mr-4 mt-2 ">
            {isOpen3 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
          </Box>
        </Box>
        <Collapse in={isOpen3} animateOpacity>
          <Box className="bg-gray-50">
            <Text className="lg:min-w-[600px] min-w-[400px] lg:text-md text-sm px-4 py-2">
              Answer
            </Text>
          </Box>
        </Collapse>
        <Box
          onClick={Toggle4}
          className="flex justify-between lg:min-w-[600px] min-w-[400px] hover:cursor-pointer"
        >
          <Text className="ml-4 my-1">Question</Text>
          <Box className="mr-4 mt-2 ">
            {isOpen4 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
          </Box>
        </Box>
        <Collapse in={isOpen4} animateOpacity>
          <Box className="bg-gray-50">
            <Text className="lg:min-w-[600px] min-w-[400px] lg:text-md text-sm px-4 py-2">
              Answer
            </Text>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};
export default InvestFaq;
