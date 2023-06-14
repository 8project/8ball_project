import { Box } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
function MyPage({ account }) {
  return (
    <Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px] text-center">
          <Box fontWeight="bold" color="gray.400" className="pb-5">
            UserWallet
          </Box>
          <Box>
            {account.substring(0, 4)}...{account.slice(-4)}
          </Box>
        </Box>
        <Box borderBottom="1px solid gray" width="800px"></Box>
      </Box>
      <div>
        <div className="border-b border-gray-400 flex justify-between items-center">
          <Box className="pb-2">My NFT</Box>
          <IoIosArrowForward />
        </div>
        <div className="border-b border-gray-400 flex justify-between items-center">
          <Box className="pb-2">My Piece NFT</Box>
          <IoIosArrowForward />
        </div>
        <div className="border-b border-gray-400 flex justify-between items-center">
          <Box className="pb-2">In Progress</Box>
          <IoIosArrowForward />
        </div>
        <div className="border-b border-gray-400 flex justify-between items-center">
          <Box className="pb-2">On Sale</Box>
          <IoIosArrowForward />
        </div>
      </div>
    </Box>
  );
}

export default MyPage;
