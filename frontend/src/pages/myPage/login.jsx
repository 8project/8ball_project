import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaWallet } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const handleWalletConnect = async () => {
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      localStorage.setItem("isLoggedIn", "true");

      navigate("/mypage");
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      navigate("/mypage");
    }
  }, [navigate]);
  return (
    <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
      <Box className="text-center m-10 ">
        <Box className="font-semibold m-2">Login is required.</Box>
        <Box className=" text-gray-400">
          A wallet connection is required
          <br /> to continue using the service.
        </Box>
        <img src="img/login.png" alt="login" className="mt-6" />
      </Box>
      <Box className=" bg-blue-500 flex justify-center items-center mb-2 rounded-lg text-white">
        <Box className="flex justify-center items-center m-4">
          <FaWallet className="mr-2" />
          <button onClick={handleWalletConnect}>Connect Wallet</button>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
