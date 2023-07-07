import { Box } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlinePuzzle } from "react-icons/hi";
import { SlPicture } from "react-icons/sl";
import { CiShop } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdOutlineContentCopy } from "react-icons/md";
import { OGNFTContract } from "../../lib/web3.config";
import { useEffect, useState } from "react";
function MyPage({ account }) {
  const handleCopyAccount = () => {
    navigator.clipboard.writeText(account);
  };

  const [miting, setMinting] = useState();
  const onClickMint = async (e) => {
    e.preventDefault();
    try {
      const response = await OGNFTContract.methods
        .mintNFT(miting)
        .send({ from: account });
      response();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px] w-[100%]">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        className="pb-6"
      >
        <Box className="mt-[82px]  text-center ">
          <Box>
            <form onSubmit={onClickMint}>
              <input
                type="민팅하기"
                value={miting}
                onChange={(e) => setMinting(e.target.value)}
              />
              <input type="submit" value="민팅ㅎㅎㅎ" />
            </form>
          </Box>
          <Box fontWeight="bold" color="gray.400" className="pb-5">
            UserWallet
          </Box>
          <Box className="font-extrabold font-mono flex justify-center items-center ml-6">
            <div className="mr-2">
              {account.substring(0, 4)}...{account.slice(-4)}
            </div>
            <div onClick={handleCopyAccount} style={{ cursor: "pointer" }}>
              <MdOutlineContentCopy />
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MyPage;
