import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { CartContext } from "../context/CartContext";
import EmptyCart from "../components/layout/EmptyCart";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const {
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    cartItems,
    totalAmount,
    handleQtyChange,
  } = useContext(CartContext);

  const [draftQty, setDraftQty] = useState({});

  useEffect(() => {
    // keep local values aligned when context updates
    setDraftQty(
      cartItems.reduce((acc, item) => {
        acc[item.cartId] = item.quantity;
        return acc;
      }, {})
    );
  }, [cartItems]);

  const handleDraftChange = (cartId, val) => {
    setDraftQty((prev) => ({ ...prev, [cartId]: val }));
  };

  const handleBlur = (cartId) => {
    const value = draftQty[cartId];
    handleQtyChange(cartId, value); // your existing stock check logic
  };

  const handleClearCart = () => {
    Swal.fire({
      title: "Xóa toàn bộ giỏ hàng?",
      text: "Hành động này không thể hoàn tác.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#b71c1c",
      cancelButtonColor: "#6d4c41",
      width: "350px",
      customClass: {
        title: "text-lg font-bold",
        popup: "rounded-xl",
        confirmButton: "rounded-lg",
        cancelButton: "rounded-lg",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        toast.info("Đã xóa toàn bộ giỏ hàng.");
      }
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-amber-900" />
          Giỏ hàng của bạn
        </h1>
        <span className="text-gray-500 font-medium">
          {cartItems.length} sản phẩm
        </span>
      </div>

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col gap-8">
          {/* Cart Items List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {cartItems.map((item) => (
              <div
                key={item.cartId}
                className="group flex flex-col sm:flex-row sm:items-center gap-6 p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors duration-200"
              >
                {/* Image */}
                <Link
                  to={`/product/${item.productId}`}
                  className="flex-shrink-0 mx-auto sm:mx-0"
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <Link
                    to={`/product/${item.productId}`}
                    className="block group-hover:text-amber-700 transition-colors"
                  >
                    <h2 className="font-bold text-gray-800 text-lg leading-tight mb-1">
                      {item.name}
                    </h2>
                  </Link>
                  <p className="text-gray-500 text-sm font-medium">
                    Đơn giá: {item.price.toLocaleString()}₫
                  </p>
                </div>

                {/* Controls Container */}
                <div className="flex flex-row sm:flex-col md:flex-row items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0">
                  {/* Quantity Selector (Modern Pill) */}
                  <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm px-1 py-1">
                    <button
                      onClick={() => decreaseQty(item.cartId)}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={draftQty[item.cartId] ?? item.quantity}
                      onChange={(e) =>
                        handleDraftChange(item.cartId, e.target.value)
                      }
                      onBlur={() => handleBlur(item.cartId)}
                      className="w-10 text-center text-sm font-semibold text-gray-900 bg-transparent border-none p-0 focus:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() => increaseQty(item.cartId)}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Price & Delete */}
                  <div className="flex flex-col items-end gap-1 min-w-[100px]">
                    <p className="font-bold text-gray-900 text-lg">
                      {(item.price * item.quantity).toLocaleString()}₫
                    </p>
                    <button
                      onClick={() => removeItem(item.cartId)}
                      className="text-gray-400 hover:text-red-600 text-sm flex items-center gap-1 transition-colors"
                    >
                      <Trash2 size={14} />
                      <span className="underline decoration-dotted">Xóa</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary / Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <button
                onClick={handleClearCart}
                className="text-gray-500 hover:text-red-600 font-medium text-sm transition-colors flex items-center gap-2"
              >
                <Trash2 size={16} />
                Xóa toàn bộ giỏ hàng
              </button>

              <div className="flex flex-col items-end gap-4 w-full sm:w-auto">
                <div className="flex items-baseline gap-4">
                  <span className="text-gray-500 text-lg">Tổng cộng:</span>
                  <span className="text-3xl font-bold text-amber-900">
                    {totalAmount.toLocaleString()}₫
                  </span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full sm:w-auto bg-[#3e2723] hover:bg-[#5d4037] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  Tiến hành thanh toán
                  {/* ArrowRight is not in your original imports, so I used the one from lucide if available or just remove this icon if it breaks */}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
