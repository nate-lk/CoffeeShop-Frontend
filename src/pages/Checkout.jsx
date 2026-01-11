import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ShopContext } from "../context/ShopContext";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";
import {
  PackageCheck,
  ShoppingCart,
  CreditCard,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import UserDefaultAddress from "../components/user/UserDefaultAddress";
import PaymentMethod from "../components/PaymentMethod";
import { orderApi } from "../../api/order-api";

const Checkout = () => {
  const navigate = useNavigate();
  const { token, setLoading, defaultAddress } = useContext(ShopContext);
  const { cartItems, totalAmount, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleOrderPlacement = async () => {
    try {
      setLoading(true);
      if (!token) return toast.error("Bạn cần đăng nhập để đặt hàng.");

      if (!defaultAddress) {
        Swal.fire({
          icon: "warning",
          title: "Bạn chưa thêm địa chỉ mặc định",
          confirmButtonColor: "#3e2723",
          width: "350px",
          customClass: {
            title: "text-lg font-bold",
            popup: "rounded-xl p-4",
          },
        });
        return;
      }

      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        defaultAddress,
      };

      let res;

      switch (paymentMethod) {
        case "COD":
          res = await orderApi.createOrderCOD(orderPayload);
          break;
        case "TRANSFER":
          res = await orderApi.createOrderTransfer(orderPayload);
          break;
        case "STRIPE":
          res = await orderApi.createOrderStripe(orderPayload);
          break;
        case "MOMO":
          res = await orderApi.createOrderMomo(orderPayload);
          break;

        default:
          return toast.error("Phương thức thanh toán không hợp lệ.");
      }

      if (!res.data.success) {
        return toast.error(res.data.message || "Đặt hàng thất bại.");
      }

      if (paymentMethod === "COD" || paymentMethod === "TRANSFER") {
        toast.success("Đặt hàng thành công!");
        clearCart();
        return navigate(`/place-order/${res.data.orderId}`);
      }

      if (paymentMethod === "STRIPE") {
        toast.info("Tạo đơn hàng thanh toán với STRIPE");
        return navigate(`/stripe`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <div className="bg-gray-50 p-6 rounded-full mb-4">
          <ShoppingCart className="w-12 h-12" />
        </div>
        <p className="text-lg font-medium text-gray-600">
          Giỏ hàng của bạn đang trống.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-4 text-amber-700 font-semibold hover:underline"
        >
          Quay lại cửa hàng
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* PAGE HEADER */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <PackageCheck className="w-8 h-8 text-amber-700" />
              Xác nhận đơn hàng
            </h1>
            <p className="text-gray-500 mt-1">
              Kiểm tra thông tin và hoàn tất đơn hàng của bạn.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <button
              onClick={() => navigate("/cart")}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">Quay lại</span>
            </button>

            <button
              onClick={handleOrderPlacement}
              className="flex-1 lg:flex-none px-8 py-3 bg-[#3e2723] hover:bg-[#5d4037] text-white rounded-xl font-bold shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <CreditCard size={18} />
              ĐẶT HÀNG NGAY
            </button>
          </div>
        </div>

        {/* MAIN LAYOUT Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN (2/3 width) */}
          <div className="lg:col-span-1 space-y-8">
            {/* 1. ADDRESS SECTION */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">
                  1
                </span>
                Địa chỉ nhận hàng
              </h2>
              <UserDefaultAddress />
            </div>

            {/* 2. CART ITEMS SECTION */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">
                  2
                </span>
                Sản phẩm trong đơn ({cartItems.length})
              </h2>

              <div className="divide-y divide-gray-50">
                {cartItems.map((item) => (
                  <div
                    key={item.cartId}
                    className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    {/* Image */}
                    <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-base truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Số lượng:{" "}
                        <span className="font-medium text-gray-900">
                          {item.quantity}
                        </span>
                      </p>
                    </div>

                    {/* Price */}
                    <p className="font-bold text-gray-900 whitespace-nowrap">
                      {(item.price * item.quantity).toLocaleString()}₫
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (1/3 width) */}
          <div className="lg:col-span-1 space-y-8">
            {/* 3. PAYMENT METHOD */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">
                  3
                </span>
                Thanh toán
              </h2>
              <PaymentMethod
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </div>

            {/* 4. SUMMARY */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Tổng kết đơn hàng
              </h2>

              <div className="space-y-3 pb-4 border-b border-gray-100 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{totalAmount.toLocaleString()}₫</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span className="text-green-600 font-medium">Miễn phí</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <span className="text-gray-900 font-bold text-lg">
                  Tổng thanh toán
                </span>
                <span className="text-2xl font-bold text-amber-700">
                  {totalAmount.toLocaleString()}₫
                </span>
              </div>

              <div className="mt-6 flex items-start gap-3 bg-amber-50 p-3 rounded-lg">
                <ShieldCheck
                  className="text-amber-700 flex-shrink-0"
                  size={20}
                />
                <p className="text-xs text-amber-800 leading-relaxed">
                  Thông tin thanh toán của bạn được bảo mật tuyệt đối. Chúng tôi
                  cam kết hoàn tiền nếu có lỗi từ hệ thống.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
