import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { userApi } from "../../api/user-api";

const ResetPassword = () => {
  const { token } = useParams(); // To capture the token from the URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      // Replace with your actual backend URL
      const response = await userApi.resetPassword(password, token);
      const data = response.data;

      if (data.success) {
        setMessage("Mật khẩu đã được cập nhật thành công!");
        setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
      } else {
        setError(data.message || "Liên kết không hợp lệ hoặc đã hết hạn.");
      }
    } catch (err) {
      setError("Lỗi kết nối. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden p-8 sm:p-10">
          {/* Header Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-amber-50 rounded-full">
              <ShieldCheck className="text-amber-700" size={32} />
            </div>
          </div>

          {/* Header Text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Đặt lại mật khẩu
            </h1>
            <p className="text-gray-500 text-sm">
              Vui lòng nhập mật khẩu mới để hoàn tất việc khôi phục tài khoản.
            </p>
          </div>

          {/* Alerts */}
          {message && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3">
              <CheckCircle className="text-green-600 shrink-0" size={20} />
              <p className="text-sm text-green-700">
                {message} Đang chuyển hướng...
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="text-red-600 shrink-0" size={20} />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Mật khẩu mới
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-600 transition-colors"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Xác nhận mật khẩu
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-600 transition-colors"
                  size={20}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl text-gray-900 focus:outline-none focus:bg-white transition-all
                    ${
                      confirmPassword && password !== confirmPassword
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                        : "border-gray-200 focus:border-amber-500 focus:ring-amber-500/10"
                    }
                  `}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !password || password !== confirmPassword}
              className={`w-full bg-[#3e2723] hover:bg-[#5d4037] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4
                ${
                  isLoading || !password || password !== confirmPassword
                    ? "opacity-70 cursor-not-allowed grayscale-[0.5]"
                    : ""
                }
              `}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Đang cập nhật...
                </>
              ) : (
                "Cập nhật mật khẩu"
              )}
            </button>
          </form>

          {/* Security Note */}
          <p className="mt-8 text-center text-xs text-gray-400 px-4">
            Đảm bảo mật khẩu của bạn có ít nhất 8 ký tự bao gồm chữ cái và chữ
            số để bảo mật tốt nhất.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
