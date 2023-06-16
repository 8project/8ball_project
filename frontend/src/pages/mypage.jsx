import { Box } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlinePuzzle } from "react-icons/hi";
import { SlPicture } from "react-icons/sl";
import { CiShop } from "react-icons/ci";
import { Link } from "react-router-dom";
function MyPage({ account }) {
  return (
    <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px] w-[100%]">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box className="mt-[82px]  text-center ">
          <Box fontWeight="bold" color="gray.400" className="pb-5">
            UserWallet
          </Box>
          <Box className="font-extrabold font-mono">
            {account.substring(0, 4)}...{account.slice(-4)}
          </Box>
        </Box>
      </Box>
      <Box className="font-extrabold font-mono">
        <Box
          borderTop="1px solid gray"
          width="100%"
          maxW={["460px", "460px", "460px", "800px"]}
          mx="auto"
        ></Box>
        <Box className="pt-6 border-b border-gray-400 flex justify-between items-center">
          <Box className="flex pb-2 ml-6 items-center">
            <SlPicture />
            <Box className="pl-2">My NFT</Box>
          </Box>
          <Link to="/mypage/myNft">
            <IoIosArrowForward />
          </Link>
        </Box>
        <Box className="pt-6 border-b border-gray-400 flex justify-between items-center">
          <Box className="flex pb-2 ml-6 items-center">
            <HiOutlinePuzzle />
            <Box className="pl-2">My Piece NFT</Box>
          </Box>
          <Link to="/mypage/myPieceNft">
            <IoIosArrowForward />
          </Link>
        </Box>
        <Box className="pt-6 border-b border-gray-400 flex justify-between items-center">
          <Box className="flex pb-2 ml-6 items-center">
            <CiShop />
            <Box className="pl-1">In Progress</Box>
          </Box>
          <Link to="/mypage/inProgress">
            <IoIosArrowForward />
          </Link>
        </Box>
        <Box className="pt-6 border-b border-gray-400 flex justify-between items-center">
          <Box className="flex pb-2 ml-6 items-center">
            <CiShop />
            <Box className="pl-1">On Sale</Box>
          </Box>
          <Link to="/mypage/onSale">
            <IoIosArrowForward />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default MyPage;
