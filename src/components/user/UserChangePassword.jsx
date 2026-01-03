import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../../api/user-api";
import { ShopContext } from "../../context/ShopContext";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Lock, KeyRound, Save } from "lucide-react";

const UserChangePassword = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(ShopContext);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Nhập lại mật khẩu không đúng.");
    }

    try {
      const res = await userApi.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Đổi mật khẩu thành công",
          text: "Vui lòng đăng nhập lại.",
          confirmButtonText: "Đăng nhập",
          confirmButtonColor: "#3e2723",
          width: "350px",
          customClass: {
            title: "text-lg font-bold",
            popup: "rounded-xl p-6",
            confirmButton: "rounded-lg px-4 py-2",
          },
        }).then(() => {
          navigate("/login");
        });
        setToken(""); // Clear frontend token
        navigate("/login");
      } else {
        toast.error(res.data.message || "Không thể đổi mật khẩu.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi máy chủ.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <KeyRound className="text-amber-700" size={24} />
          Đổi mật khẩu
        </h2>
        <p className="text-gray-500 mt-1 text-sm">
          Quản lý và bảo vệ tài khoản của bạn bằng mật khẩu mạnh.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Current Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Mật khẩu hiện tại <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-600 transition-colors"
                size={18}
              />
              <input
                type="password"
                name="currentPassword"
                placeholder="••••••••"
                value={form.currentPassword}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
                required
              />
            </div>
          </div>

          <div className="border-t border-gray-100 my-2"></div>

          {/* New Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Mật khẩu mới <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-600 transition-colors"
                size={18}
              />
              <input
                type="password"
                name="newPassword"
                placeholder="Nhập mật khẩu mới"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Nhập lại mật khẩu mới <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-600 transition-colors"
                size={18}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Xác nhận mật khẩu mới"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#3e2723] hover:bg-[#5d4037] text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-amber-900/10 active:scale-[0.98] transition-all"
            >
              <Save size={18} />
              Cập nhật mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserChangePassword;