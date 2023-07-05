import { useEffect, useState } from "react";
import { Button, Box } from "@chakra-ui/react";

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
            <Box className=" fixed bottom-4 right-4">
                <Button id="top" onClick={scrollToTop} type="button">
                    {" "}
                    Top
                </Button>
            </Box>
        )
    );
};
export default TopBtn;
