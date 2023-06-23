import { Box, Image } from "@chakra-ui/react";

const Test = () => {
    const imgArr = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
    ];
    return (
        <Box className=" grid grid-cols-5 gap-[2px] w-[256px] border-2 border-white  rounded-t-md ">
            {imgArr.map((num) => {
                return (
                    <Image
                        className="w-[256px] "
                        src={`https://olive-specific-newt-363.mypinata.cloud/ipfs/QmPsBmzU2FEpd1aVWR6w6kDYqRaBrUkDAPFN7TvxxXNsqz/20220501000342_0-0${num}.jpg`}
                    />
                );
            })}
        </Box>
    );
};

export default Test;
