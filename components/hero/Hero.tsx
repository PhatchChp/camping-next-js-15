"use client";
import { LandmarkCardProps } from "@/utils/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import OtherInfo from "./OtherInfo";
import Image from "next/image";

const Hero = ({ landmarks }: { landmarks: LandmarkCardProps[] }) => {
    return (
        <div>
            <Swiper
                navigation={true}
                autoplay={{
                    delay: 3000,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Navigation, Autoplay, Pagination]}
                className="mySwiper"
            >
                {landmarks.map((landmark) => (
                    <SwiperSlide key={landmark.image} className="group">
                        <div className="relative rounded-md overflow-hidden group-hover:brightness-50 transition-all duration-300">
                            <Image
                                className="w-full h-[600px] object-cover brightness-75"
                                src={landmark.image}
                                alt={landmark.image}
                                width={600}
                                height={600}
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 z-50">
                            <div className="col-span-4 mb-4 flex h-full flex-1 justify-end px-5 md:mb-4 md:justify-end md:px-10">
                                <OtherInfo landmark={landmark} />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
export default Hero;
