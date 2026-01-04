import React from "react";
import Hero from "../components/layout/Hero";
import LatestCollection from "../components/layout/LatestCollection";
import BestSeller from "../components/layout/BestSeller";
import Policy from "../components/layout/Policy";
import { Link } from "react-router-dom";
import { ArrowRight, Coffee } from "lucide-react"; // Make sure to import icons

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 pb-10 pt-2">
        <Hero />
      </section>

      {/* 2. LATEST COLLECTION - The "Fresh" Section
         Background: Light warm gray/cream to distinguish from Hero
         Padding: ample vertical space (py-16)
      */}
      <section className="bg-[#faf9f6] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Optional: Add a subtle header if LatestCollection doesn't have a strong one */}
          <div className="text-center mb-10">
            <span className="text-amber-700 font-medium tracking-widest text-sm uppercase">
              Mới ra mắt
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              Các Sản Phẩm Mới Nhất
            </h2>
            <div className="w-16 h-1 bg-amber-700 mx-auto mt-4 rounded-full"></div>
          </div>

          <LatestCollection />
        </div>
      </section>

      {/* 3. VISUAL BREAK / MINI-BANNER
         This breaks the monotony between two carousels.
      */}
      <section className="bg-[#3e2723] py-16 text-white text-center px-4 relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-500 opacity-10 rounded-full translate-x-1/4 translate-y-1/4"></div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <Coffee size={40} className="mx-auto text-amber-500 mb-4" />
          <h2 className="text-2xl md:text-4xl font-bold">
            "Cà phê không chỉ là thức uống, nó là di sản."
          </h2>
          <p className="text-gray-300">
            Trải nghiệm sự tinh tế từ những hạt cà phê được chọn lọc kỹ lưỡng
            nhất vùng cao nguyên.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 mt-6 text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            Đọc câu chuyện của chúng tôi <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* 4. BEST SELLERS - The "Proof" Section
         Background: Pure White to make product images pop
      */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-700 font-medium tracking-widest text-sm uppercase">
              Được yêu thích nhất
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              Sản Phẩm Bán Chạy
            </h2>
            <div className="w-16 h-1 bg-amber-700 mx-auto mt-4 rounded-full"></div>
          </div>
          <BestSeller />
        </div>
      </section>

      {/* 5. POLICY SECTION
         Background: Soft gray or keeping it clean at the bottom
      */}
      <section className="border-t border-gray-100 bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Policy />
        </div>
      </section>
    </div>
  );
};

export default Home;
