import { Box, Text, Image } from "@chakra-ui/react";
import logo from "../images/8ball.png";

function SideInfo() {
    return (
        <Box className="fixed center hidden xl:inline-block ml-10 mr-20 mt-40">
            <Image src={logo} boxSize={300} />
            <Text className="-mt-14 ml-6 font-mono font-extrabold">
                진짜 조각 투자, 오직 8ball에서!
            </Text>
            <Text className="mt-2 ml-6 font-mono font-semibold text-sm">
                8ball에서는 조각낸 NFT로 지분을 발행합니다.
            </Text>
        </Box>
    );
}

export default SideInfo;
