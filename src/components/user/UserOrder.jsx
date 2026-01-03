import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { orderApi } from "../../../api/order-api";
import { Eye, Calendar, Package, ChevronLeft, ChevronRight, ListFilter } from "lucide-react";

const UserOrders = () => {
  const { token, statusFilter, setStatusFilter } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // --- 1. RESET FILTERS ON MOUNT ---
  // Ensures you see all orders when first visiting the page
  useEffect(() => {
    setStatusFilter({
      PAID: false,
      PENDING_PAYMENT: false,
      CANCELLED: false,
      PROCESSING: false,
      FAILED: false,
      REFUNDED: false,
    });
  }, [setStatusFilter]);

  // --- CONFIGURATION ---
  const statusConfig = {
    PAID: { label: "Đã thanh toán", activeClass: "bg-green-100 text-green-800 border-green-300 ring-2 ring-green-500/20" },
    PENDING_PAYMENT: { label: "Chờ thanh toán", activeClass: "bg-amber-100 text-amber-800 border-amber-300 ring-2 ring-amber-500/20" },
    CANCELLED: { label: "Đã hủy", activeClass: "bg-red-100 text-red-800 border-red-300 ring-2 ring-red-500/20" },
    PROCESSING: { label: "Đang xử lý", activeClass: "bg-blue-100 text-blue-800 border-blue-300 ring-2 ring-blue-500/20" },
    FAILED: { label: "Thất bại", activeClass: "bg-gray-200 text-gray-800 border-gray-400 ring-2 ring-gray-500/20" },
    REFUNDED: { label: "Đã hoàn tiền", activeClass: "bg-purple-100 text-purple-800 border-purple-300 ring-2 ring-purple-500/20" },
  };

  // --- LOGIC ---
  const toggleStatus = (status) => {
    setStatusFilter((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  // Check if ANY filter is currently active
  const isAnyFilterActive = Object.values(statusFilter).some((isActive) => isActive);

  // IF any button is active -> Show only those. 
  // IF no buttons active -> Show ALL.
  const filteredOrders = isAnyFilterActive
    ? orders.filter((o) => statusFilter[o.status])
    : orders;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const maxRetries = 3;
      const timeoutMs = 5000;

      const withTimeout = (promise, ms) =>
        Promise.race([
          promise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), ms)
          ),
        ]);

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const res = await withTimeout(
            orderApi.getUserOrders(page, limit),
            timeoutMs
          );

          if (res.data && res.data.orders) {
            setOrders(res.data.orders);
            setTotalPages(res.data.totalPages);
          }
          setLoading(false);
          return;
        } catch (err) {
          if (attempt === maxRetries) {
            console.log("Fetch orders failed:", err.message);
            setLoading(false);
          } else {
            await new Promise((r) => setTimeout(r, 300));
          }
        }
      }
    };

    if (token) fetchOrders();
  }, [token, page, limit]);

  const formatCurrency = (value) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-gray-800">Lịch sử đơn hàng</h2>
           <p className="text-gray-500 text-sm mt-1">
             {isAnyFilterActive 
                ? `Đang hiển thị ${filteredOrders.length} đơn hàng theo bộ lọc.`
                : "Hiển thị tất cả đơn hàng của bạn."}
           </p>
        </div>
      </div>

      {/* Filters (Scrollable Tabs) */}
      <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex items-center gap-3 min-w-max">
          <div className="flex items-center gap-2 px-3 py-1.5 text-gray-500 text-sm font-bold uppercase tracking-wide">
             <ListFilter size={16} /> Bộ lọc:
          </div>
          
          {Object.keys(statusConfig).map((status) => {
            const isActive = statusFilter[status];
            const config = statusConfig[status];

            return (
              <button
                key={status}
                onClick={() => toggleStatus(status)}
                className={`
                  relative px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all duration-200 border
                  ${isActive 
                    ? `${config.activeClass} shadow-sm z-10 scale-105` 
                    : "bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-600"
                  }
                `}
              >
                {config.label}
                {isActive && (
                   <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-current rounded-full border-2 border-white"></span>
                )}
              </button>
            );
          })}

          {isAnyFilterActive && (
            <button 
              onClick={() => setStatusFilter({})}
              className="text-xs text-red-500 hover:text-red-700 font-medium underline ml-2 transition-colors"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {loading ? (
            // Skeleton Loader
            [1,2,3].map(i => (
                <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse"></div>
            ))
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
             // For the badge inside the card, we want it styled regardless of filter state
             const config = statusConfig[order.status] || statusConfig.FAILED;
             // Strip the "ring" classes for the badge to keep it cleaner inside the card
             const badgeColor = config.activeClass.split(" ring")[0]; 

             return (
              <div
                key={order.orderId}
                className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-200 overflow-hidden"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex flex-col gap-1">
                     <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-900 text-lg">#{order.orderId.slice(0, 8).toUpperCase()}...</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${badgeColor}`}>
                           {config.label}
                        </span>
                     </div>
                     <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <Calendar size={14} />
                        {formatDate(order.createdAt)}
                     </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                     <button 
                        onClick={() => navigate(`/orders/${order.orderId}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-700 hover:border-amber-200 transition-colors shadow-sm"
                     >
                        <Eye size={16} />
                        Xem chi tiết
                     </button>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-4 sm:p-5">
                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      
                      {/* Product Preview */}
                      <div className="flex-1">
                         <div className="flex items-center gap-4">
                            {/* Thumbnails (Max 3) */}
                            <div className="flex -space-x-3">
                               {order.items.slice(0, 3).map((item, idx) => (
                                  <div key={idx} className="w-12 h-12 rounded-lg border-2 border-white bg-gray-100 overflow-hidden relative shadow-sm">
                                     <img src={item.image?.[0]} alt="" className="w-full h-full object-cover" />
                                  </div>
                               ))}
                               {order.items.length > 3 && (
                                  <div className="w-12 h-12 rounded-lg border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shadow-sm relative z-10">
                                     +{order.items.length - 3}
                                  </div>
                               )}
                            </div>
                            
                            {/* Text Summary */}
                            <div className="flex flex-col">
                               <span className="text-sm font-medium text-gray-900 line-clamp-1">
                                  {order.items[0].name} {order.items.length > 1 && `& ${order.items.length - 1} sản phẩm khác`}
                               </span>
                               <span className="text-xs text-gray-500">
                                  Tổng số lượng: {order.items.reduce((acc, item) => acc + item.quantity, 0)}
                               </span>
                            </div>
                         </div>
                      </div>

                      {/* Total Price */}
                      <div className="text-right sm:text-right border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0 mt-3 sm:mt-0">
                         <span className="text-xs text-gray-500 block mb-1">Tổng tiền</span>
                         <span className="text-xl font-bold text-amber-700">
                            {formatCurrency(order.total)}
                         </span>
                      </div>
                   </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm mb-4">
                <Package size={32} />
             </div>
             <p className="text-gray-900 font-medium text-lg">
                {isAnyFilterActive ? "Không tìm thấy đơn hàng phù hợp" : "Bạn chưa có đơn hàng nào"}
             </p>
             <p className="text-gray-500 text-sm mt-1 text-center max-w-xs">
                {isAnyFilterActive 
                  ? "Hãy thử bỏ chọn bộ lọc để xem tất cả đơn hàng."
                  : "Hãy dạo quanh cửa hàng và chọn những món đồ ưng ý nhé!"}
             </p>
          </div>
        )}
      </div>

      {/* Footer / Pagination */}
      {orders.length > 0 && (
          <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 hidden sm:inline">Hiển thị</span>
                <select
                  className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2"
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-500 hidden sm:inline">đơn / trang</span>
            </div>

            <div className="flex items-center gap-2">
               <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
               >
                  <ChevronLeft size={18} />
               </button>
               <span className="text-sm font-medium text-gray-700 px-2">
                  Trang {page} / {totalPages}
               </span>
               <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
               >
                  <ChevronRight size={18} />
               </button>
            </div>
          </div>
      )}
    </div>
  );
};

export default UserOrders;