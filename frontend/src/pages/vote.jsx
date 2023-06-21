import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
function Vote() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  return (
    <Box className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
      votePage
      <div className="mt-[82px] mb-[72px] lg:max-w-[800px] max-w-[460px]">
        <div className=" bg-gray-300 lg:max-w-[600px] max-w-[400px] border rounded-md ">
          <div className="lg:max-w-[600px] max-w-[400px] flex justify-center items-center mb-4">
            <div className="m-2">
              <div>img</div>
            </div>
            <div className="m-2 text-center">
              <div>Offer price</div>
              <div>1.2ETH</div>
            </div>
            <div className="m-2 text-center">
              <div>Duration</div>
              <div>0618~0619</div>
            </div>
            <div className="mt-6 ml-4">
              <div>Vote</div>
              <div>
                <div className="flex items-center">
                  <button
                    className={`option-button ${
                      selectedOption === "up" ? "selected" : ""
                    }`}
                    onClick={() => handleOptionClick("up")}
                  ></button>
                  <div className="ml-2">Up</div>
                </div>
                <div className="flex items-center">
                  <button
                    className={`option-button ${
                      selectedOption === "down" ? "selected" : ""
                    }`}
                    onClick={() => handleOptionClick("down")}
                  ></button>
                  <div className="ml-2">Down</div>
                </div>
              </div>
            </div>
            <div className="self-end ml-2">
              <button className="text-white bg-blue-500 m-1 p-1 rounded-md">
                submit
              </button>
            </div>
          </div>

          <div className="box">Box 2</div>
          <div className="box">Box 3</div>
          <div className="box">Box 4</div>
        </div>
      </div>
    </Box>
  );
}
export default Vote;
