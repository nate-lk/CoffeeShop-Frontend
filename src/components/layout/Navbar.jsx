import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { Home, Store, Info } from "lucide-react";

const Navbar = () => {
  const baseClass = "flex flex-col items-center gap-1 group";
  const [visible, setVisible] = useState(false);
  const { token } = useContext(ShopContext);
  const { user } = useContext(UserContext);
  const { cartCountTotal } = useContext(CartContext);

  return (
    <div className="flex items-center justify-between py-3 px-4 md:px-8 sticky top-0 z-50 bg-[#3e2723] text-white shadow-lg">
      <Link to="/">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-28 h-auto hidden sm:block"
        />
      </Link>
      {/* mobile menu */}
      <ul className="flex sm:hidden gap-6 text-xl">
        <NavLink to="/" className="p-1 hover:text-amber-300">
          <Home />
        </NavLink>

        <NavLink to="/shop" className="p-1 hover:text-amber-300">
          <Store />
        </NavLink>

        <NavLink to="/about" className="p-1 hover:text-amber-300">
          <Info />
        </NavLink>
      </ul>

      <div className="flex flex-col items-center">
        <img
          src={assets.company}
          alt="Company Name"
          className="hidden sm:block md:h-16 mb-3 object-contain"
        />

        <ul className="hidden sm:flex gap-6 text-base">
          {[
            { name: "TRANG CHỦ", path: "/" },
            { name: "CỬA HÀNG", path: "/shop" },
            { name: "GIỚI THIỆU", path: "/about" },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `${baseClass} ${
                  isActive ? "active" : ""
                } hover:text-amber-200 transition-colors`
              }
            >
              <p>{item.name}</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-amber-400 invisible group-[.active]:visible group-hover:visible transition-all" />
            </NavLink>
          ))}
        </ul>
      </div>

      {/* LOG IN */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 w-auto">
        {" "}
        {/* fixed width for container */}
        {/* Profile top-right */}
        <Link to={!token ? "/login" : "/user"}>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border w-full overflow-hidden">
            <span className="truncate hidden sm:inline">
              {!token
                ? "Đăng nhập"
                : `Xin chào, ${
                    user?.name || user?.email?.split("@")[0] || "user"
                  }`}
            </span>
            <FiUser className="w-6 h-6 flex-shrink-0" />
          </button>
        </Link>
        {/* CART */}
        <Link to={!token ? "/login" : "/cart"}>
          <button className="relative flex items-center justify-center gap-2 p-2 px-4 rounded-full border w-full">
            <span className="hidden sm:inline">Giỏ hàng</span>

            <FiShoppingCart className="w-6 h-6" />
            {token && cartCountTotal > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-amber-600 text-white text-[10px] rounded-full font-semibold">
                {cartCountTotal}
              </span>
            )}
          </button>
        </Link>
        {/* Mobile Menu */}
      </div>
    </div>
  );
};

export default Navbar;
