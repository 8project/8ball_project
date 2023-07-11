import React from "react";
import {
    Box,
    Text,
    Image,
    Button,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Accordion,
    Flex,
    Badge,
} from "@chakra-ui/react";
import { MarketContract, OGNFTContract, MarketContractAddress } from "../../lib/web3.config";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiDetail } from "react-icons/bi";
import { CgPlayListRemove } from "react-icons/cg";

const InProgress = ({ account }) => {
    const [currentBuyer, setCurrentBuyer] = useState([]);
    const [OGTokenId, setOGTokenIds] = useState([]);
    const [dataURI, setDataURI] = useState([]); // URI
    //if length !==20인것만 불러오기
    // buyerList 순회해야되고
    // OGNfList
    const getOnSaleNftMetadata = async () => {
        try {
            const response = await OGNFTContract.methods
                .getMyNftTokenId_OG(MarketContractAddress)
                .call(); //nft 정보 불러오기
            console.log(response);
            const marketNftListArr = response.map((v) => {
                return Number(v);
            }); // 판매 등록된 NFT 목록을 가져옴
            setOGTokenIds(marketNftListArr);
            console.log(marketNftListArr);

            const tempArr = [];
            for (let i = 1; i < marketNftListArr.length + 1; i++) {
                const buyerList = await MarketContract.methods.OGListForSale_buyerList(i).call(); // list index로 for문
                // console.log("buyer ", buyerList);
                if (buyerList.length !== 20) {
                    // 정상 : !==, 실험할 때 ===
                    tempArr.push(buyerList);
                    // console.log("tempArr", tempArr);
                    for (let j = 0; j < tempArr.length; j++) {
                        const currentMintedList = tempArr[j];
                        console.log(currentMintedList);
                        for (let k = 0; k < currentMintedList.length; k++) {
                            if (currentMintedList[k].toLowerCase() === account) {
                                //정상 : ===, 실험할때 : !==
                                setCurrentBuyer((prev) => [...prev, currentMintedList]);
                                // console.log(currentMintedList)
                                const a = await MarketContract.methods.OGNftList(i).call();
                                // console.log(a);
                                const uri = await OGNFTContract.methods
                                    .tokenURI(a.OGTokenId)
                                    .call();
                                const uri2 = await axios.get(uri);
                                // console.log(uri2);
                                setDataURI((prev) => [...prev, uri2]);
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getOnSaleNftMetadata();
    }, []);

    console.log(dataURI);

    return (
        <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
            {dataURI?.map((v, i) => {
                return (
                    <Box key={i}>
                        <Box>
                            <Box className="flex flex-col justify-center items-center border rounded-md mb-10 ">
                                <Image src={v.data.image} alt="NFT" w={"256px"} />
                                <Box className="bg-gray-100 w-full px-4 py-2">
                                    <Box className="flex flex-col justify-center items-center">
                                        <Box className="flex flex-col items-start text-start">
                                            <Text>{v.data.name}</Text>
                                        </Box>
                                        <Accordion allowMultiple>
                                            <AccordionItem>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box as="span" flex="1" textAlign="left">
                                                            <Box className="flex">
                                                                <BiDetail className="mt-1 mr-1" />
                                                                Details
                                                            </Box>
                                                        </Box>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>
                                                    <Box className="text-xs" key={i}>
                                                        <Box className="font-bold">
                                                            {v.data.description} #{v.data.edition}:{" "}
                                                        </Box>
                                                        <Box>
                                                            {v.data?.attributes.map((val, i) => (
                                                                <Flex
                                                                    key={i}
                                                                    alignItems="center"
                                                                    mt={1}
                                                                >
                                                                    <Text fontWeight="bold" mr={2}>
                                                                        {val.trait_type}:
                                                                    </Text>
                                                                    <Badge
                                                                        colorScheme="blue"
                                                                        fontSize="xs"
                                                                    >
                                                                        {val.value}
                                                                    </Badge>
                                                                </Flex>
                                                            ))}
                                                        </Box>
                                                    </Box>
                                                </AccordionPanel>
                                            </AccordionItem>
                                        </Accordion>
                                        <Button colorScheme="blue" className="mt-2">
                                            minted
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};

export default InProgress;
