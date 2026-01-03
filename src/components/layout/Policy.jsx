import React from "react";
import { Truck, ShieldCheck, Headset, ArrowRightLeft } from "lucide-react";

const Policy = () => {
  const policies = [
    {
      icon: ArrowRightLeft,
      title: "Đổi trả dễ dàng",
      desc: "Đổi trả miễn phí trong vòng 7 ngày",
    },
    {
      icon: ShieldCheck,
      title: "Chất lượng đảm bảo",
      desc: "Cam kết sản phẩm chính hãng 100%",
    },
    {
      icon: Headset,
      title: "Hỗ trợ 24/7",
      desc: "Đội ngũ tư vấn tận tâm, chuyên nghiệp",
    },
    {
      icon: Truck,
      title: "Giao hàng nhanh",
      desc: "Vận chuyển hỏa tốc, miễn phí đơn >500k",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        
        {/* Optional Section Title - helps with spacing */}
        {/* <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Tại sao chọn Velvet Roast?</h2>
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center p-8 rounded-2xl border border-gray-100 bg-white hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 mb-6 group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300">
                <policy.icon size={32} strokeWidth={1.5} />
              </div>

              {/* Text Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-800 transition-colors">
                {policy.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                {policy.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Policy;