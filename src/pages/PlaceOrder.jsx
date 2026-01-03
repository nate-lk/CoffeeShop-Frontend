import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { orderApi } from "../../api/order-api";
import { CheckCircle, Calendar, CreditCard, Package, ArrowRight, Home, Loader2 } from "lucide-react";

const PlaceOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(ShopContext);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await orderApi.getOneOrder(orderId);
        setOrder(res.data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId, token]);

  if (loading)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-amber-800 gap-3">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p className="font-medium">Đang tải đơn hàng...</p>
      </div>
    );

  if (!order)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500">
           <Package size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Không tìm thấy đơn hàng</h2>
        <Link to="/" className="text-amber-700 hover:underline">Quay về trang chủ</Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* --- SUCCESS HEADER --- */}
        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full text-green-600 mb-6 shadow-sm ring-8 ring-green-50">
            <CheckCircle size={40} strokeWidth={3} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Đặt hàng thành công!
          </h1>
          <p className="text-gray-500 text-lg">
            Cảm ơn bạn đã mua sắm tại Velvet Roast.
          </p>
        </div>

        {/* --- MAIN ORDER CARD --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Order Meta Data Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8 bg-amber-50/30 border-b border-gray-100">
            {/* ID */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Mã đơn hàng</span>
              <span className="text-lg font-bold text-gray-900">#{order.orderId}</span>
            </div>
            
            {/* Status */}
            <div className="flex flex-col gap-1">
               <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Trạng thái</span>
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit">
                  {order.status}
               </span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-gray-400">
                 <Calendar size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Ngày đặt</span>
                <span className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString("vi-VN")}</span>
              </div>
            </div>

            {/* Payment */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-gray-400">
                 <CreditCard size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Thanh toán</span>
                <span className="font-medium text-gray-900">{order.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Sản phẩm đã đặt</h3>
            <div className="space-y-6">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-start sm:items-center gap-4 group"
                >
                  {/* Image */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden flex-shrink-0">
                    <img
                      src={item.image?.[0]}
                      alt={item.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-base truncate pr-4">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {item.brand} • {item.category}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5 sm:hidden">
                       x{item.quantity}
                    </p>
                  </div>

                  {/* Price & Qty (Desktop) */}
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {(item.price * item.quantity).toLocaleString()}₫
                    </p>
                    <p className="text-sm text-gray-500 hidden sm:block">
                      Số lượng: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Divider */}
            <div className="my-8 border-t border-gray-100 border-dashed"></div>

            {/* Total Section */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-600">Tổng thanh toán</span>
              <span className="text-2xl font-bold text-amber-700">
                {order.total.toLocaleString()}₫
              </span>
            </div>
          </div>
        </div>

        {/* --- ACTIONS --- */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all w-full sm:w-auto"
          >
            <Home size={18} />
            Về trang chủ
          </Link>
          
          <Link
            to="/shop"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-[#3e2723] hover:bg-[#5d4037] text-white font-bold rounded-xl shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-all w-full sm:w-auto"
          >
            Tiếp tục mua sắm
            <ArrowRight size={18} />
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default PlaceOrder;