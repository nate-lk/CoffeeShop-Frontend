import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you use react-router-dom
import {
  Mail,
  ArrowLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react"; // Make sure to install lucide-react if not already
import { userApi } from "../../api/user-api";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      const response = await userApi.forgotPassword(email);
      const data = response.data;

      if (data.success) {
        setMessage(
          "Velvet Roast đã gửi hướng dẫn đặt lại mật khẩu. Vui lòng kiểm tra email của bạn."
        );
        setEmail("");
      } else {
        setError(data.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } catch (err) {
      setError("Lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Quên mật khẩu?
            </h1>
            <p className="text-gray-500 text-sm">
              Nhập địa chỉ email của bạn và chúng tôi sẽ gửi liên kết để đặt lại
              mật khẩu.
            </p>
          </div>

          {/* Success Message Alert */}
          {message && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3">
              <CheckCircle className="text-green-600 shrink-0" size={20} />
              <p className="text-sm text-green-700">{message}</p>
            </div>
          )}

          {/* Error Message Alert */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="text-red-600 shrink-0" size={20} />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Email
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-600 transition-colors"
                  size={20}
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#3e2723] hover:bg-[#5d4037] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2
                ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Đang gửi...
                </>
              ) : (
                "Gửi liên kết"
              )}
            </button>
          </form>

          {/* Footer / Back Link */}
          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-amber-700 transition-colors"
            >
              <ArrowLeft size={16} />
              Quay lại Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
