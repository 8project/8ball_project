import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

const TopBtn = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    console.log(window.scrollY);
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <Box className="fixed bottom-20 right-5">
        <Box
          id="top"
          onClick={scrollToTop}
          type="button"
          className=" rounded-full bg-black py-3 px-3 text-white font-[Tenada] cursor-pointer hover:bg-gray-600"
        >
          {" "}
          Top
        </Box>
      </Box>
    )
  );
};
export default TopBtn;
