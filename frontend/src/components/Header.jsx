import { Box, Image, Text } from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa";
import { ethers } from "ethers";
import { useState } from "react";
import { MdOutlineWallet } from "react-icons/md";

const Header = ({ account, setAccount }) => {
    const [balance, setBalance] = useState();
    const onClickAccount = async () => {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            setAccount(accounts[0]);
            const _balance = await window.ethereum.request({
                method: "eth_getBalance",
                params: [accounts[0].toString(), "latest"],
            });

            setBalance(ethers.formatEther(_balance));
        } catch (error) {
            console.error(error);
        }
    };
    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Box className="fixed top-0 lg:min-w-[800px] lg:max-w-[800px] min-w-[460px] max-w-[460px] bg-white z-50 border-b">
            <Box className="flex justify-between  text-black  py-2 px-6">
                <Box>
                    {/* <Image src={logo} boxSize="50px" /> */}

                    <Box
                        onClick={scrollToTop}
                        className="font-[Tenada] font-extrabold text-3xl mt-2 cursor-pointer"
                    >
                        8BALL
                    </Box>
                </Box>
                {account ? (
                    <div className="m-2 px-2 text-sm font-semibold font-mono flex items-center bg-black text-white rounded-md">
                        <MdOutlineWallet />
                        <div className="ml-2">{account.substring(0, 4)}</div>
                        <div className="h-4 border-l border-gray-300 mx-2"></div>
                        <div>{balance && balance.substring(0, 6)} Eth</div>
                    </div>
                ) : (
                    <button className="flex hover:text-gray-400" onClick={onClickAccount}>
                        <FaWallet className="mt-4 mr-2" />
                        <Text className="mt-4 text-sm font-semibold font-mono">connect</Text>
                    </button>
                )}
            </Box>
        </Box>
    );
};

export default Header;
