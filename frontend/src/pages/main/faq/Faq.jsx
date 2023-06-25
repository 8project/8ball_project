import { Box, Text, Button } from "@chakra-ui/react";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { useState } from "react";
import NftFaq from "./nftFaq";
import InvestFaq from "./investFaq";
import VoteFaq from "./voteFaq";

const Faq = () => {
  const [show, setShow] = useState(false);
  const [faqMenu, setFaqMenu] = useState("nft");

  return (
    <Box className="flex flex-col justify-center items-center mt-40 mb-20">
      <Box className="flex mb-2 gap-1">
        <Text className="font-bold lg:text-[22px]">FAQ</Text>
        <RiQuestionAnswerLine className="mt-2 lg:text-[22px]" />
      </Box>
      <Box className="flex justify-center gap-4  mb-2 rounded-md">
        <Box
          className={`px-2 py-1 cursor-pointer font-semibold ${
            faqMenu === "nft" ? "bg-gray-200" : "bg-none"
          }`}
          onClick={() => {
            setFaqMenu("nft");
          }}
        >
          NFT
        </Box>
        <Box
          className={`px-2 py-1 cursor-pointer font-semibold ${
            faqMenu === "invest" ? "bg-gray-200" : "bg-none"
          }`}
          onClick={() => {
            setFaqMenu("invest");
          }}
        >
          INVEST
        </Box>
        <Box
          className={`px-2 py-1 cursor-pointer font-semibold ${
            faqMenu === "vote" ? "bg-gray-200" : "bg-none"
          }`}
          onClick={() => {
            setFaqMenu("vote");
          }}
        >
          VOTE
        </Box>
      </Box>
      <Box className={`${faqMenu === "nft" ? "inline-block" : " hidden"}`}>
        <NftFaq />
      </Box>
      <Box className={`${faqMenu === "invest" ? "inline-block" : " hidden"}`}>
        <InvestFaq />
      </Box>
      <Box className={`${faqMenu === "vote" ? "inline-block" : " hidden"}`}>
        <VoteFaq />
      </Box>
    </Box>
  );
};

export default Faq;
