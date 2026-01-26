import React from "react";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-[#f8f3ef] text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Điều Khoản & Điều Kiện Sử Dụng</h1>

      <p className="mb-6">
        Chào mừng bạn đến với Velvet Roast. Khi truy cập và mua sắm tại website của chúng tôi, 
        bạn đồng ý tuân thủ các điều khoản và điều kiện dưới đây. Vui lòng đọc kỹ trước khi 
        thực hiện giao dịch.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Thông tin sản phẩm & Giá cả</h2>
      <p className="mb-4">
        Chúng tôi cam kết cung cấp thông tin chi tiết, hình ảnh và giá cả của các sản phẩm cà phê 
        và dụng cụ pha chế chính xác nhất. Tuy nhiên, màu sắc thực tế của sản phẩm có thể chênh lệch 
        nhỏ do màn hình hiển thị. Giá sản phẩm có thể thay đổi tùy theo chương trình khuyến mãi 
        mà không cần báo trước.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. Quy định đặt hàng</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Bạn cần cung cấp thông tin chính xác về địa chỉ và số điện thoại khi đặt hàng.</li>
        <li>Velvet Roast có quyền từ chối hoặc hủy đơn hàng trong trường hợp hết hàng, lỗi giá hoặc phát hiện dấu hiệu gian lận.</li>
        <li>Đơn hàng được coi là thành công khi bạn nhận được email hoặc tin nhắn xác nhận từ hệ thống.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Thanh toán</h2>
      <p className="mb-4">
        Chúng tôi hỗ trợ nhiều phương thức thanh toán bao gồm: Thẻ tín dụng/ghi nợ, ví điện tử (Momo, ZaloPay), 
        và thanh toán khi nhận hàng (COD). Mọi giao dịch trực tuyến đều được bảo mật qua cổng thanh toán an toàn.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Vận chuyển & Giao nhận</h2>
      <p className="mb-4">
        Thời gian giao hàng dự kiến từ 2-5 ngày làm việc tùy thuộc vào địa lý. 
        Chúng tôi sẽ nỗ lực giao hàng sớm nhất có thể, nhưng không chịu trách nhiệm cho các sự chậm trễ 
        do đơn vị vận chuyển hoặc các yếu tố bất khả kháng (thiên tai, dịch bệnh).
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Chính sách đổi trả</h2>
      <p className="mb-4">
        Khách hàng có quyền yêu cầu đổi trả sản phẩm trong vòng <strong>07 ngày</strong> kể từ khi nhận hàng nếu:
      </p>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Sản phẩm bị lỗi do nhà sản xuất hoặc hư hỏng trong quá trình vận chuyển.</li>
        <li>Sản phẩm giao không đúng với đơn đặt hàng.</li>
        <li>Sản phẩm phải còn nguyên bao bì, tem mác và chưa qua sử dụng.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">6. Quyền sở hữu trí tuệ</h2>
      <p className="mb-4">
        Mọi nội dung trên website bao gồm logo, hình ảnh, bài viết và thiết kế đều thuộc quyền sở hữu 
        của Velvet Roast. Nghiêm cấm sao chép, chỉnh sửa hoặc sử dụng cho mục đích thương mại 
        mà không có sự đồng ý bằng văn bản.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">7. Điều khoản chung</h2>
      <p className="mb-4">
        Chúng tôi có quyền chỉnh sửa các điều khoản này bất cứ lúc nào để phù hợp với hoạt động kinh doanh 
        và pháp luật hiện hành. Việc bạn tiếp tục sử dụng website sau khi có thay đổi đồng nghĩa với việc 
        bạn chấp nhận các điều khoản mới.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">8. Liên hệ</h2>
      <p>
        Mọi thắc mắc về điều khoản sử dụng, vui lòng liên hệ với chúng tôi qua email:{" "}
        <span className="font-medium text-amber-700">support@velvetroast.vn</span>.
      </p>
    </div>
  );
};

export default Terms;