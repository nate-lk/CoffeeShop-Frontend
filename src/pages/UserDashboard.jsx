import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import UserOrders from "../components/user/UserOrder";
import UserDetail from "../components/user/UserDetail";
import UserProfile from "../components/user/UserProfile";
import UserChangePassword from "../components/user/UserChangePassword";
import Swal from "sweetalert2";
import {
  LogOut,
  MapPin,
  User,
  Receipt,
  Lock,
  ChevronRight,
} from "lucide-react";
import { userApi } from "../../api/user-api";

const UserDashboard = () => {
  // Logic remains exactly the same
  const handleLogout = async () => {
    const confirm = await Swal.fire({
      text: "Bạn có muốn đăng xuất?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Hủy",
      width: "350px", // Slightly wider for better readability
      customClass: {
        popup: "rounded-xl", // Modern rounded corners for alert
      },
    });

    if (!confirm.isConfirmed) return;

    try {
      await userApi.logout();
    } catch (_) {
      // Even if backend fails, still clear state
    }

    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const navItems = [
    { path: "/user/profile", label: "Hồ sơ cá nhân", icon: User },
    { path: "/user/details", label: "Địa chỉ giao hàng", icon: MapPin },
    { path: "/user/orders", label: "Lịch sử đơn hàng", icon: Receipt },
    { path: "/user/password", label: "Đổi mật khẩu", icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Dashboard Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#3e2723] mb-8 tracking-tight">
          Tài khoản của tôi
        </h1>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          {/* --- SIDEBAR --- */}
          <aside className="w-full md:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              {/* Sidebar Header (Optional visual touch) */}
              <div className="p-6 border-b border-gray-100 bg-amber-50/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                    <User size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 font-medium">
                      Xin chào,
                    </span>
                    <span className="font-bold text-gray-800">Thành viên</span>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col p-3 gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? "bg-amber-50 text-amber-900 font-semibold shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Left: Icon + Text */}
                        <div className="flex items-center gap-3">
                          <item.icon
                            size={20}
                            className={
                              isActive
                                ? "text-amber-600"
                                : "text-gray-400 group-hover:text-gray-600"
                            }
                          />
                          <span className="text-sm sm:text-base">
                            {item.label}
                          </span>
                        </div>

                        {/* Right: Small chevron indicator */}
                        <ChevronRight
                          size={16}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400"
                        />
                      </>
                    )}
                  </NavLink>
                ))}

                <div className="my-2 border-t border-gray-100"></div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <LogOut size={20} />
                  <span className="text-sm sm:text-base font-medium">
                    Đăng xuất
                  </span>
                </button>
              </nav>
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[500px] p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Routes>
                <Route path="/" element={<Navigate to="profile" replace />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="details" element={<UserDetail />} />
                <Route path="orders" element={<UserOrders />} />
                <Route path="password" element={<UserChangePassword />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
