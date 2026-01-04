import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react"; // Assuming you have lucide-react installed

const HeroModernSplit = () => {
  const YOUTUBE_VIDEO_ID = "lGmb-eAyaeE";

  return (
    <div className="relative w-full overflow-hidden bg-[#faf9f6]">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center min-h-[600px] py-12 lg:py-0 relative z-10">
        {/* Left Section - Text */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start lg:pr-12 mt-10 lg:mt-0">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-[2px] w-8 bg-amber-700"></span>
            <p className="font-semibold text-sm tracking-widest text-amber-800 uppercase">
              Velvet Roast
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
            Đậm Hương Vị <br />
            <span className="text-amber-700">Đầy Cảm Xúc</span>
          </h1>

          <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-xl leading-relaxed">
            Khám phá những sản phẩm cà phê mới nhất của{" "}
            <span className="font-semibold text-gray-800">Velvet Roast</span>.
            Nơi sự tinh tế hội tụ trong từng tách cà phê buổi sáng của bạn.
          </p>

          <Link
            to="/shop"
            className="group bg-[#3e2723] text-white font-medium px-8 py-4 rounded-full hover:bg-amber-800 transition-all duration-300 flex items-center gap-2"
          >
            Mua Ngay
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Right Section - Video */}
        <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative">
          {/* 1. Find this Inner Container 
      2. Make sure it has 'overflow-hidden' and your desired rounded classes.
  */}
          <div
            className="w-full h-full overflow-hidden lg:rounded-[3rem] shadow-2xl shadow-amber-900/20"
            /* 3. ADD THIS STYLE PROP HERE. This is the magic fix. */
            style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
          >
            <iframe
              className="w-full h-full object-cover pointer-events-none scale-[1.35]" // Scale up to hide youtube UI
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1&autoplay=1&mute=1&controls=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}&showinfo=0`}
              title="Velvet Roast Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* Overlay */}
            <div className="absolute inset-0 bg-amber-900/10 mix-blend-multiply pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroModernSplit;
