import { Box, Text } from "@chakra-ui/react";
import { OGNFTContract } from "../../../lib/web3.config";
import { useEffect, useState } from "react";
import MyNftCard from "./myNftCard";

const MyNft = ({ account }) => {
  const [OGTokenIds, setOGTokenIds] = useState([]);

  const getMyNftTokenIds_OG = async () => {
    try {
      const response = await OGNFTContract.methods.getMyNftTokenId_OG(account).call();

      const userTokenIdArray = response.map((v) => {
        return Number(v);
      });
      setOGTokenIds(userTokenIdArray);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(OGTokenIds);
  useEffect(() => {
    getMyNftTokenIds_OG();
  }, []);

  return (
    <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
      <Text>My NFT</Text>
      {OGTokenIds?.map((t, i) => {
        return <MyNftCard key={i} tokenId={t} account={account} />;
      })}
    </Box>
  );
};

export default MyNft;
