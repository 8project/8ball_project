import { Box, Text } from "@chakra-ui/react";

const MainContents = () => {
  return (
    <Box className="mt-20">
      <Box
        w="100%"
        h="200px"
        bgGradient="linear(to-t, gray.300, white)"
        className="flex flex-col justify-center items-center"
      >
        <Text
          bgGradient="linear(to-r, blue.800, blue.200)"
          bgClip="text"
          fontSize="xl"
          fontWeight="extrabold"
        >
          지금까지 이런 조각 투자는 없었다.
        </Text>
      </Box>
    </Box>
  );
};

export default MainContents;
