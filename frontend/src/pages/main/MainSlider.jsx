import React from "react";
import { Box, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import test1 from "../../images/8ball.png";

const MainSlider = () => {
    const settings = {
        arrows: false,
        dots: true, // 슬라이드 밑에 점 보이게
        infinite: true, // 무한으로 반복
        speed: 500, // 넘어가는 속도
        slidesToShow: 1, // 1장씩 보이게
        slidesToScroll: 1, // 1장씩 뒤로 넘어가게
        centerMode: true,
        centerPadding: "0px", // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
    };
    return (
        <Box className="lg:w-max[800px] w-max-[460px] max-h-[300px] text-center">
            <Slider {...settings}>
                <Box className="flex justify-center bg-red-100 h-[300px]"></Box>
                <Box className="flex justify-center bg-blue-100 h-[300px]"></Box>
                <Box className="flex justify-center bg-green-100 h-[300px]"></Box>
            </Slider>
        </Box>
    );
};

export default MainSlider;