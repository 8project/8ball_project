import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import Funding from "./funding/Funding";
import Offer from "./offer/Offer";
import { GiReceiveMoney } from "react-icons/gi";
import { FaCartArrowDown } from "react-icons/fa";
import ToTopBtn from "../../components/ToTopBtn";

function Market({ account }) {
  const [show, setShow] = useState(true);

  return (
    <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
      <ToTopBtn />
      <Box className="flex flex-col justify-center items-center">
        <Box className="flex mt-10">
          <Box
            className={`flex justify-center w-[120px] border-2 text-center py-2 px-4 font-mono font-semibold cursor-pointer ${
              show ? "bg-gray-200" : "bg-white"
            }`}
            onClick={() => setShow(true)}
          >
            <GiReceiveMoney className="mr-1" />
            Funding
          </Box>
          <Box
            className={`flex justify-center w-[120px] border-2 text-center py-2 px-4 font-mono font-semibold cursor-pointer ${
              show ? "bg-white" : "bg-gray-200"
            }`}
            onClick={() => setShow(false)}
          >
            <FaCartArrowDown className="mt-1 mr-1" />
            Offer
          </Box>
        </Box>
        <Box className="mt-10">
          {show ? <Funding account={account} /> : <Offer />}
        </Box>
      </Box>
    </Box>
  );
}
export default Market;
