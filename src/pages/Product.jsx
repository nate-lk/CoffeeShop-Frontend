import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/layout/RelatedProducts";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import { productApi } from "../../api/product-api";
import { 
  Star, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Package 
} from "lucide-react";

const Product = () => {
  const { productId } = useParams();

  // contexts
  const { currency } = useContext(ShopContext);
  const { getQuantityByProductId, cartAdd } = useContext(CartContext);

  // states
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("detail");

  // Load product data
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      const res = await productApi.getOneProduct(productId);
      const item = res.data.product;

      if (item) {
        setProductData(item);
        setImage(Array.isArray(item.image) ? item.image[0] : item.image || "");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!productData?._id) return;
    await cartAdd(productData._id, quantity);
  };

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value, 10);

    // Reject invalid or NaN input
    if (Number.isNaN(value) || value < 1) {
      setQuantity(1);
      return;
    }

    // Enforce stock limit
    if (productData?.stock && value > productData.stock) {
      setQuantity(productData.stock);
      toast.warn("Số lượng vượt quá tồn kho");
      return;
    }

    setQuantity(value);
  };

  if (!productData) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 transition-opacity duration-500">
      
      {/* --- Main Product Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left: Image Gallery */}
        <div className="flex flex-col gap-6">
          {/* Main Image Container */}
          <div className="w-full aspect-square sm:aspect-[4/3] lg:aspect-square bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center p-6 shadow-sm border border-gray-100">
            <img
              src={image}
              alt={productData.name}
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide justify-start sm:justify-center">
            {productData.image?.map((item, index) => (
              <button
                key={index}
                onClick={() => setImage(item)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  image === item 
                    ? "border-amber-700 ring-2 ring-amber-700/20" 
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={item}
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          {/* Breadcrumb / Category Tag */}
          <span className="text-sm text-amber-700 font-semibold tracking-wide uppercase mb-2">
             {productData.subCategory || "Sản phẩm"}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {productData.name}
          </h1>

          {/* Rating Placeholder (Optional visual) */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-amber-400">
               {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <span className="text-sm text-gray-500 font-medium">(120 đánh giá)</span>
          </div>

          {/* Price & Stock */}
          <div className="flex items-end gap-4 mb-8">
            <p className="text-4xl font-bold text-gray-900">
              {productData.price.toLocaleString()}
              <span className="text-2xl text-gray-500 font-medium ml-1">{currency}</span>
            </p>
            {productData.packageType && (
                 <span className="mb-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-semibold uppercase tracking-wider">
                    {productData.packageType}
                 </span>
            )}
          </div>

          {/* Short Description */}
          <p className="text-gray-600 leading-relaxed mb-8 text-lg">
            {productData.description}
          </p>

          {/* Controls: Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-8 pb-8 border-b border-gray-100">
            
            {/* Quantity */}
            <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">Số lượng:</span>
                <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 p-1">
                    <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-600 shadow-sm hover:text-amber-700 transition-colors"
                    >
                        <Minus size={18} />
                    </button>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-12 text-center bg-transparent border-none focus:ring-0 text-gray-900 font-semibold text-lg [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <button
                        onClick={() => setQuantity((q) => Math.min(productData.stock || 99, q + 1))}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-600 shadow-sm hover:text-amber-700 transition-colors"
                    >
                        <Plus size={18} />
                    </button>
                </div>
                <span className="text-xs text-gray-500 pl-2">
                    {productData.stock} có sẵn
                </span>
            </div>

            {/* Add Button */}
            <div className="flex-1 pt-7 sm:pt-0">
                <button
                    onClick={handleAddToCart}
                    className="w-full h-[52px] bg-[#3e2723] hover:bg-[#5d4037] text-white rounded-full font-semibold text-lg flex items-center justify-center gap-3 shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-all"
                >
                    <ShoppingBag size={20} />
                    THÊM VÀO GIỎ
                </button>
                {getQuantityByProductId(productId) > 0 && (
                     <p className="text-center text-amber-700 text-sm font-medium mt-3">
                        Đã có {getQuantityByProductId(productId)} trong giỏ hàng
                     </p>
                )}
            </div>
          </div>

          {/* Policy / Features */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                  <ShieldCheck className="text-amber-700" size={24} />
                  <span>Chính sách đổi trả 30 ngày</span>
              </div>
              <div className="flex items-center gap-3">
                  <Truck className="text-amber-700" size={24} />
                  <span>Miễn phí vận chuyển nội thành</span>
              </div>
              <div className="flex items-center gap-3">
                  <Package className="text-amber-700" size={24} />
                  <span>Đóng gói tiêu chuẩn xuất khẩu</span>
              </div>
          </div>
        </div>
      </div>

      {/* --- Description & Details Tabs --- */}
      <div className="mt-24">
        <div className="flex justify-center border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            <button
              onClick={() => setTab("detail")}
              className={`pb-4 text-lg font-medium transition-all relative ${
                tab === "detail"
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Mô tả chi tiết
              {tab === "detail" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></span>
              )}
            </button>

            <button
              onClick={() => setTab("packageDetail")}
              className={`pb-4 text-lg font-medium transition-all relative ${
                tab === "packageDetail"
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Hình thức đóng gói
              {tab === "packageDetail" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></span>
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto px-4 text-gray-600 leading-loose text-lg whitespace-pre-line animate-in fade-in slide-in-from-bottom-4 duration-500">
            {tab === "detail" ? (
                <p>{productData.longDescription || "Không có mô tả chi tiết."}</p>
            ) : (
                <p>{productData.packageDetail || "Không có thông tin đóng gói."}</p>
            )}
        </div>
      </div>

      {/* --- Related Products --- */}
      <div className="mt-24 border-t pt-16">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;