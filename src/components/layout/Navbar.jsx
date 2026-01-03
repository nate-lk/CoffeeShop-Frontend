import { useContext, useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { token, setToken } = useContext(ShopContext);
  const { user } = useContext(UserContext);
  const { cartCountTotal } = useContext(CartContext);
  const location = useLocation();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "TRANG CHỦ", path: "/" },
    { name: "CỬA HÀNG", path: "/shop" },
    { name: "GIỚI THIỆU", path: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#3e2723]/90 backdrop-blur-md shadow-lg py-3"
          : "bg-[#3e2723] py-4"
      } text-white`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* --- LEFT SECTION: LOGO --- */}
        <Link to="/" className="flex items-center gap-3 group">
          {/* <img
            src={assets.logo}
            alt="Logo"
            className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
          /> */}
          <img
            src={assets.company}
            alt="Company"
            className="h-12 object-contain hidden sm:block brightness-0 invert" 
          />
        </Link>

        {/* --- CENTER SECTION: DESKTOP NAV --- */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative text-sm font-medium tracking-wide hover:text-amber-300 transition-colors duration-200 ${
                  isActive ? "text-amber-400" : "text-gray-200"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-amber-400 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </ul>

        {/* --- RIGHT SECTION: ACTIONS --- */}
        <div className="flex items-center gap-4">
          
          {/* USER PROFILE */}
          <Link
            to={!token ? "/login" : "/user"}
            className="hidden sm:flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-full transition-all"
          >
            <div className="bg-amber-100/10 p-1.5 rounded-full">
               <FiUser className="w-5 h-5 text-amber-100" />
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[10px] text-gray-300 uppercase tracking-wider">
                {!token ? "Tài khoản" : "Xin chào,"}
              </span>
              <span className="text-sm font-semibold truncate max-w-[100px]">
                {!token
                  ? "Đăng nhập"
                  : user?.name || user?.email?.split("@")[0] || "User"}
              </span>
            </div>
          </Link>

          {/* CART ICON */}
          <Link to="/cart" className="relative group">
            <div className="p-2 hover:bg-white/10 rounded-full transition-all">
              <FiShoppingCart className="w-6 h-6 group-hover:text-amber-300 transition-colors" />
            </div>
            {cartCountTotal > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center bg-amber-500 text-white text-[10px] rounded-full font-bold shadow-md ring-2 ring-[#3e2723]">
                {cartCountTotal}
              </span>
            )}
          </Link>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-200 hover:text-white"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#3e2723] border-t border-white/10 shadow-xl transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-4 gap-4">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-lg font-medium p-2 rounded-lg ${
                  isActive ? "bg-white/10 text-amber-400" : "text-gray-200"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          
          {/* Mobile User Action */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
             <Link to={!token ? "/login" : "/user"} className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-full">
                  <FiUser className="w-5 h-5" />
                </div>
                <span>{!token ? "Đăng nhập / Đăng ký" : "Hồ sơ của tôi"}</span>
             </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;