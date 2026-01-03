import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { userApi } from "../../api/user-api";
import { Mail, Lock, ArrowRight, LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await userApi.login(email, password);

      if (response.data.success) {
        setToken(response.data.token);
        setEmail("");
        setPassword("");
        // toast.success("Đăng nhập thành công!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Đã xảy ra lỗi. Vui lòng thử lại.";

      toast.error(errorMessage);
    }
  };

  const onGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      "https://api.velvetroast.store/auth/google/login",
      "GoogleLogin",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  useEffect(() => {
    const messageListener = (event) => {
      if (event.origin !== "https://api.velvetroast.store") {
        return;
      }
      console.log("Received message:", event.data);
      const { token, email } = event.data;
      if (token) {
        setToken(token);
        // toast.success(`Đăng nhập với ${email}`);
        navigate("/");
        window.removeEventListener("message", messageListener);
      }
    };

    window.addEventListener("message", messageListener);
    return () => window.removeEventListener("message", messageListener);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng nhập</h1>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-6">
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

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-gray-700">
                  Mật khẩu
                </label>
                {/* --- ADDED FORGOT PASSWORD LINK HERE --- */}
                <Link 
                  to="/forgot-password" 
                  className="text-sm font-medium text-amber-600 hover:text-amber-800 hover:underline transition-colors"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-600 transition-colors"
                  size={20}
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#3e2723] hover:bg-[#5d4037] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              Đăng nhập
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400 font-medium">
                Đăng nhập với
              </span>
            </div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={onGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition-all"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Google
          </button>

          {/* Footer / Register Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="text-amber-700 font-bold hover:underline inline-flex items-center gap-1"
              >
                Đăng ký ngay <ArrowRight size={14} />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;