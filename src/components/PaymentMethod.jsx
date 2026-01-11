import React from "react";
import { assets } from "../assets/assets";
import { toast } from "sonner";
import {
  CreditCard,
  Truck,
  Landmark,
  Copy,
  CheckCircle2,
  Info,
  QrCode,
} from "lucide-react";

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  // Helper to copy account number
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Đã sao chép số tài khoản!");
  };

  const methods = [
    {
      value: "COD",
      label: "Thanh toán khi nhận hàng (COD)",
      icon: Truck,
      description: "Thanh toán tiền mặt cho shipper.",
    },
    {
      value: "TRANSFER",
      label: "Chuyển khoản ngân hàng",
      icon: Landmark,
      description: "Quét mã QR hoặc chuyển khoản thủ công.",
    },
    {
      value: "MOMO",
      label: "Momo",
      icon: Landmark,
      description: "Thanh toán qua ví điện tử Momo.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {/* Header */}
      <h3 className="text-lg font-bold text-[#4e342e] flex items-center gap-2 mb-4">
        <CreditCard size={20} />
        Phương thức thanh toán
      </h3>

      {/* Main Container */}
      <div className="bg-white border border-[#e0d6d2] p-6 sm:p-8 shadow-sm">
        {/* 1. Selection Buttons (Modern Radio Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {methods.map((m) => {
            const Icon = m.icon;
            const isSelected = paymentMethod === m.value;

            return (
              <button
                key={m.value}
                onClick={() => setPaymentMethod(m.value)}
                className={`relative flex flex-col items-start p-4 border transition-all duration-200 text-left group
                  ${
                    isSelected
                      ? "border-[#4e342e] bg-[#fff8f0]"
                      : "border-gray-200 hover:border-[#a1887f] hover:bg-gray-50"
                  }
                `}
              >
                {/* Check Icon */}
                {isSelected && (
                  <div className="absolute top-3 right-3 text-[#4e342e]">
                    <CheckCircle2
                      size={18}
                      fill="currentColor"
                      className="text-white"
                    />
                  </div>
                )}

                <div
                  className={`p-2 rounded-full mb-2 ${
                    isSelected
                      ? "bg-[#4e342e] text-white"
                      : "bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-[#4e342e]"
                  }`}
                >
                  <Icon size={20} />
                </div>

                <span
                  className={`font-bold text-sm mb-1 ${
                    isSelected ? "text-[#4e342e]" : "text-gray-700"
                  }`}
                >
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. Content Sections */}
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          {/* === COD CONTENT === */}
          {paymentMethod === "COD" && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded text-sm text-[#4e342e] flex items-start gap-3">
              <Truck
                size={20}
                className="flex-shrink-0 mt-0.5 text-[#4e342e]"
              />
              <div>
                <span className="font-bold block mb-1">
                  Thanh toán khi nhận hàng
                </span>
                <p>
                  Bạn sẽ thanh toán tiền mặt cho shipper khi nhận được hàng. Vui
                  lòng kiểm tra kỹ gói hàng trước khi thanh toán.
                </p>
              </div>
            </div>
          )}

          {/* === BANK TRANSFER CONTENT (Vertical Layout) === */}
          {paymentMethod === "TRANSFER" && (
            <div className="space-y-6">
              {/* QR Code Section */}
              <div className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded">
                <div className="bg-white p-2 border border-gray-200 shadow-sm mb-3">
                  <img
                    src={assets.qr}
                    alt="QR Code"
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <QrCode size={14} /> Quét mã để tự động nhập thông tin
                </p>
              </div>

              {/* Account Details (Vertical List) */}
              <div className="space-y-4 text-sm text-[#4e342e]">
                <div className="border border-[#e0d6d2] p-5 rounded bg-[#fffcfb] space-y-3 shadow-sm">
                  <div className="flex justify-between items-center border-b border-dashed border-[#e0d6d2] pb-2">
                    <span className="text-gray-500">Ngân hàng</span>
                    <span className="font-bold">Vietcombank</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-dashed border-[#e0d6d2] pb-2">
                    <span className="text-gray-500">Chủ tài khoản</span>
                    <span className="font-bold uppercase">
                      CÔNG TY TNHH VELVET ROAST
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-b border-dashed border-[#e0d6d2] pb-2">
                    <span className="text-gray-500">Số tài khoản</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-lg text-[#4e342e]">
                        0123 4567 890
                      </span>
                      <button
                        onClick={() => handleCopy("01234567890")}
                        className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-[#4e342e] transition-colors"
                        title="Sao chép"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Chi nhánh</span>
                    <span className="font-medium">Hà Nội</span>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 text-blue-800 text-sm p-4 rounded border border-blue-100 space-y-2">
                  <p className="flex items-start gap-2">
                    <Info size={16} className="mt-0.5 flex-shrink-0" />
                    <span>
                      <span className="font-semibold">
                        Nội dung chuyển khoản:
                      </span>{" "}
                      Thanh toan don hang
                    </span>
                  </p>
                  <p className="text-xs opacity-90 pl-6">
                    Sau khi chuyển khoản thành công, quý khách vui lòng giữ lại
                    biên lai/ảnh chụp màn hình để đối chiếu khi cần thiết.
                  </p>
                </div>

                <p className="text-xs text-gray-500 italic text-center">
                  Lưu ý: Đơn hàng sẽ được xác nhận sau khi bộ phận kế toán kiểm
                  tra và duyệt thanh toán (5-10 phút).
                </p>
              </div>
            </div>
          )}

          {/* Momo Content */}
          {paymentMethod === "MOMO" && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded text-sm text-[#4e342e] flex items-start gap-3">
              <Truck
                size={20}
                className="flex-shrink-0 mt-0.5 text-[#4e342e]"
              />
              <div>
                <span className="font-bold block mb-1">
                  Thanh toán với Momo
                </span>
                <p>
                  Bạn sẽ được chuyển hướng đến ứng dụng Momo để hoàn tất thanh
                  toán một cách nhanh chóng và an toàn.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
