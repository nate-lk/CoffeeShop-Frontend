import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#2d1b18] text-white mt-24 border-t-4 border-amber-800">
      
      {/* --- Top Section: Newsletter --- */}
      {/* <div className="bg-[#3e2723] py-12">
        <div className="container mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif font-semibold text-amber-100 mb-2">Đăng ký nhận tin</h3>
            <p className="text-amber-200/80 text-sm">Nhận ưu đãi độc quyền và cập nhật mới nhất từ Velvet Roast.</p>
          </div>
          
          <div className="flex w-full md:w-auto gap-2">
            <input 
              type="email" 
              placeholder="Nhập email của bạn..." 
              className="w-full md:w-80 px-4 py-3 rounded-l-lg bg-white/10 border border-amber-900/30 text-white placeholder-amber-200/50 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
            />
            <button className="bg-amber-700 hover:bg-amber-600 text-white px-6 py-3 rounded-r-lg font-medium transition-colors flex items-center gap-2">
              Gửi <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div> */}

      {/* --- Middle Section: Main Content --- */}
      <div className="container mx-auto px-6 md:px-20 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <img src={assets.company} className="w-32 brightness-0 invert opacity-90" alt="Velvet Roast" />
            <p className="text-amber-100/80 text-sm leading-relaxed">
              Mỗi tách cà phê là một câu chuyện. Sứ mệnh của chúng tôi là mang lại sự ấm áp và kết nối trong từng giọt cà phê rang xay thủ công.
            </p>
            {/* Social Icons */}
            {/* <div className="flex gap-4 pt-2">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-700 hover:text-white transition-all duration-300 text-amber-200">
                  <Icon size={20} />
                </a>
              ))}
            </div> */}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-amber-300 mb-6">Khám Phá</h4>
            <ul className="space-y-3 text-sm text-amber-100/80">
              {[
                { name: "Trang chủ", path: "/" },
                { name: "Cửa hàng", path: "/shop" },
                { name: "Về chúng tôi", path: "/about" },
                // { name: "Blog cà phê", path: "/blog" },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-amber-400 hover:pl-2 transition-all duration-300 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Policy */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-amber-300 mb-6">Chính Sách</h4>
            <ul className="space-y-3 text-sm text-amber-100/80">
              {[
                // { name: "Giao hàng & Vận chuyển", path: "/delivery" },
                { name: "Đổi trả hàng", path: "/policy" },
                { name: "Bảo mật thông tin", path: "/privacy" },
                { name: "Điều khoản sử dụng", path: "/terms" },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-amber-400 hover:pl-2 transition-all duration-300 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-amber-300 mb-6">Liên Hệ</h4>
            <ul className="space-y-4 text-sm text-amber-100/80">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 flex-shrink-0 text-amber-500" size={18} />
                <span>123 Trần Hưng Đạo, Hà Nội</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="flex-shrink-0 text-amber-500" size={18} />
                <span>+84 913 243 253</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="flex-shrink-0 text-amber-500" size={18} />
                <span>velvetroaststore@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* --- Bottom Section: Copyright --- */}
      <div className="border-t border-white/10 bg-[#251614]">
        <div className="container mx-auto px-6 md:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-amber-200/60">
          <p>© 2026 Velvet Roast. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Design by Velvet Roast</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;