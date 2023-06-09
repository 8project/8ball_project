import React from "react";
import { Box, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import punk from "../../images/punk.png";
import h662 from "../../images/h662.png";
import bayc from "../../images/bayc.png";

const MainSlider = () => {
    const settings = {
        arrows: false,
        autoplay: true,
        dots: true, // 슬라이드 밑에 점 보이게
        infinite: true, // 무한으로 반복
        speed: 500, // 넘어가는 속도
        slidesToShow: 1, // 1장씩 보이게
        slidesToScroll: 1, // 1장씩 뒤로 넘어가게
        centerMode: true,
        centerPadding: "0px", // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
    };
    return (
        <Box className="lg:w-max[800px] w-max-[460px] text-center">
            <Slider {...settings}>
                <Image src={h662} className="lg:h-[400px] h-[200px]" />
                <Image src={punk} className="lg:h-[400px] h-[200px]" />
                <Image src={bayc} className="object-cover lg:h-[400px] h-[200px]" />
            </Slider>
        </Box>
    );
};

export default MainSlider;
