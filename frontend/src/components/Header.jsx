import { Box, Image, Text } from "@chakra-ui/react";
import logo from "../images/logo.png";
import { FaWallet } from "react-icons/fa";

const Header = ({ account, setAccount }) => {
  const onClickAccount = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box className="fixed top-0 lg:min-w-[800px] lg:max-w-[800px] min-w-[460px] max-w-[460px] bg-white z-50">
      <Box className="flex justify-between  text-gray-800  py-4 px-6">
        <Box>
          <Image src={logo} boxSize="50px" />
        </Box>
        <Box className="mt-3 ml-1 mr-1 text-lg font-extrabold font-mono">
          <Text>8Ball NFT Market</Text>
        </Box>
        {account ? (
          <div className="mt-4 text-sm font-semibold font-mono">
            <div>
              {account.substring(0, 4)}...{account.slice(-4)}
            </div>
          </div>
        ) : (
          <button className="flex hover:text-gray-400" onClick={onClickAccount}>
            <FaWallet className="mt-4 mr-2" />
            <Text className="mt-4 text-sm font-semibold font-mono">
              connect
            </Text>
          </button>
        )}
      </Box>
    </Box>
  );
};

export default Header;
