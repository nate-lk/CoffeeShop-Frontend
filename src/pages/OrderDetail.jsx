import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { ShopContext } from "../context/ShopContext";
import { orderApi } from "../../api/order-api";
import {
  Eye,
  ArrowLeft,
  Calendar,
  CreditCard,
  MapPin,
  Phone,
  User,
  Package,
  XCircle,
} from "lucide-react";

const OrderDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(location.state?.order);
  const [processing, setProcessing] = useState(false);
  const { token, setLoading } = useContext(ShopContext);

  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderApi.getOneOrder(orderId);

        if (res.data) {
          setOrder(res.data);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">
          Dữ liệu đơn hàng không khả dụng.
        </p>
        <button
          onClick={() => navigate("/user/orders")}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const formatCurrency = (v) =>
    v.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const handleCancelOrder = async () => {
    const confirm = await Swal.fire({
      title: "Hủy đơn hàng?",
      text: "Hành động này không thể hoàn tác.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xác nhận hủy",
      cancelButtonText: "Quay lại",
      width: "350px",
      customClass: { title: "text-lg font-bold", popup: "rounded-xl p-6" },
    });

    if (!confirm.isConfirmed) return;

    setProcessing(true);
    setLoading(true);

    try {
      const res = await orderApi.cancelOrder(orderId);
      setOrder((prev) => ({ ...prev, status: "CANCELLED" }));
      toast.info("Đơn hàng đã được hủy thành công.");
    } catch (err) {
      toast.error("Lỗi khi hủy đơn hàng");
    } finally {
      setProcessing(false);
      setLoading(false);
    }
  };

  const cancellable = !(
    order.status === "PAID" ||
    order.status === "FAILED" ||
    order.status === "CANCELLED" ||
    order.status === "PROCESSING" ||
    order.status === "ABANDONED" ||
    order.status === "REFUNDED" ||
    order.status === "COMPLETED" ||
    order.isPaid
  );

  // Status Badge Helper
  const getStatusStyle = (status) => {
    switch (status) {
      case "PAID":
        return "bg-green-50 text-green-700 ring-1 ring-green-600/20";
      case "PENDING_PAYMENT":
        return "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20";
      case "CANCELLED":
        return "bg-red-50 text-red-700 ring-1 ring-red-600/20";
      case "PROCESSING":
        return "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20";
      case "REFUNDED":
        return "bg-purple-50 text-purple-700 ring-1 ring-purple-600/20";
      default:
        return "bg-gray-100 text-gray-700 ring-1 ring-gray-600/20";
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      PENDING_PAYMENT: "Chờ thanh toán",
      PAID: "Đã thanh toán",
      CANCELLED: "Đã hủy",
      PROCESSING: "Đang xử lý",
      FAILED: "Thất bại",
      REFUNDED: "Đã hoàn tiền",
    };
    return labels[status] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* --- Header --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/user/orders")}
              className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                Đơn hàng #{order.orderId.slice(-6).toUpperCase()}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {getStatusLabel(order.status)}
                </span>
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Đặt ngày {new Date(order.createdAt).toLocaleDateString("vi-VN")}{" "}
                lúc{" "}
                {new Date(order.createdAt).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {cancellable && (
            <button
              onClick={handleCancelOrder}
              disabled={processing}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 hover:border-red-300 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XCircle size={18} />
              {processing ? "Đang xử lý..." : "Hủy đơn hàng"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* --- Info Card 1: Payment & General --- */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <CreditCard size={16} /> Thông tin thanh toán
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Mã đơn đầy đủ</span>
                <span className="font-mono text-gray-900 select-all">
                  {order.orderId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phương thức</span>
                <span className="font-medium text-gray-900">
                  {order.paymentMethod || "—"}
                </span>
              </div>
              {/* <div className="flex justify-between">
                <span className="text-gray-600">Trạng thái thanh toán</span>
                <span
                  className={
                    order.isPaid
                      ? "text-green-600 font-medium"
                      : "text-amber-600 font-medium"
                  }
                >
                  {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                </span>
              </div> */}
            </div>
          </div>

          {/* --- Info Card 2: Delivery --- */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin size={16} /> Địa chỉ nhận hàng
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-900 font-medium">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <User size={16} />
                </div>
                {order.userDetail?.receiverName || "—"}
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <Phone size={16} />
                </div>
                {order.userDetail?.phone || "—"}
              </div>
              <div className="flex items-start gap-3 text-gray-600">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <span className="leading-tight pt-1.5">
                  {order.userDetail
                    ? `${order.userDetail.addressLine1}, ${order.userDetail.ward}, ${order.userDetail.city}`
                    : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Order Items --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <Package size={18} className="text-gray-500" />
            <h3 className="font-bold text-gray-800">
              Sản phẩm ({order.items.length})
            </h3>
          </div>

          <div className="divide-y divide-gray-100">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-gray-50/50 transition-colors"
              >
                {/* Image */}
                <div className="w-20 h-20 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden flex-shrink-0">
                  {item.image && (
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left">
                  <Link
                    to={`/product/${item.productId}`}
                    className="font-bold text-gray-900 text-lg hover:text-amber-700 transition-colors line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                  <p className="text-sm text-gray-500 mt-1 sm:hidden">
                    x{item.quantity}
                  </p>
                </div>

                {/* Price Calculation */}
                <div className="text-right flex flex-col items-center sm:items-end gap-1 min-w-[120px]">
                  <span className="font-bold text-gray-900 text-lg">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                  <span className="text-xs text-gray-500 hidden sm:block">
                    {formatCurrency(item.price)} x {item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* --- Summary Footer --- */}
          <div className="bg-gray-50 p-6 sm:p-8 flex flex-col items-end gap-3 border-t border-gray-100">
            <div className="flex justify-between w-full sm:w-64 text-sm text-gray-600">
              <span>Tạm tính</span>
              <span>{formatCurrency(order.itemsPrice || order.total)}</span>
            </div>
            {order.shippingPrice > 0 && (
              <div className="flex justify-between w-full sm:w-64 text-sm text-gray-600">
                <span>Phí giao hàng</span>
                <span>{formatCurrency(order.shippingPrice)}</span>
              </div>
            )}
            <div className="w-full sm:w-64 border-t border-gray-200 my-1"></div>
            <div className="flex justify-between w-full sm:w-64 items-center">
              <span className="font-bold text-gray-900">Tổng cộng</span>
              <span className="font-bold text-2xl text-amber-700">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
