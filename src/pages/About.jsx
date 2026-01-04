import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6 sm:px-12 lg:px-20">
      
      {/* Container for centering and max-width */}
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section - Centered */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Câu chuyện về <span className="text-amber-700">Velvet Roast</span>
          </h1>
          <div className="w-24 h-1 bg-amber-700 mx-auto rounded-full"></div>
        </div>

        {/* Content Grid: Image on Left, Text on Right (Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Section */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-amber-200 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <img
              src={assets.shop_inside}
              alt="Không gian Velvet Roast"
              className="relative w-full h-[500px] object-cover rounded-2xl shadow-xl transform transition duration-500 hover:scale-[1.01]"
            />
          </div>

          {/* Text Content Section */}
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              <span className="font-bold text-amber-800 text-xl">Velvet Roast</span> được 
              thành lập với niềm đam mê bất tận dành cho hạt cà phê Việt Nam – nơi hội tụ 
              tinh hoa của đất trời, khí hậu và bàn tay con người. Từ những nông trại nhỏ 
              trên cao nguyên, chúng tôi chọn lựa thủ công từng hạt cà phê tốt nhất.
            </p>

            <p>
              Cái tên <strong className="text-gray-900">Velvet Roast</strong> tượng trưng 
              cho sự mượt mà và tinh khiết như nhung. Mỗi mẻ rang đều được thực hiện với 
              sự tỉ mỉ, kết hợp giữa kỹ thuật hiện đại và nghệ thuật thủ công, nhằm giữ 
              trọn hương vị nguyên bản.
            </p>

            <div className="bg-white p-6 rounded-xl border-l-4 border-amber-700 shadow-sm italic text-gray-700">
              "Chúng tôi tin rằng giá trị thật của cà phê nằm ở hành trình – từ đất đỏ 
              bazan đến ly cà phê buổi sáng, từ sự chăm chút của người nông dân đến nụ 
              cười của bạn."
            </div>

            <p>
              Với Velvet Roast, mỗi tách cà phê không chỉ là một thức uống, mà là một 
              câu chuyện – câu chuyện về niềm đam mê, sự kiên định và tình yêu dành 
              cho hương vị thuần khiết của cuộc sống.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;