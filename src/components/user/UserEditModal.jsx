import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { ShopContext } from "../../context/ShopContext";
import { userDetailApi } from "../../../api/user-api";
import { X, User, Phone, MapPin, Check } from "lucide-react";

const UserEditModal = ({
  showEditModal,
  setShowEditModal,
  setUserDetail,
  editDetail,
}) => {
  const { setLoading, setReloadAddress } = useContext(ShopContext);

  const [newAddress, setNewAddress] = useState({
    receiverName: "",
    phone: "",
    addressLine1: "",
    ward: "",
    city: "",
    isDefault: false,
  });

  // ✅ Populate modal fields when editDetail changes
  useEffect(() => {
    if (editDetail) {
      setNewAddress({
        receiverName: editDetail.receiverName || "",
        phone: editDetail.phone || "",
        addressLine1: editDetail.addressLine1 || "",
        ward: editDetail.ward || "",
        city: editDetail.city || "",
        isDefault: editDetail.isDefault || false,
      });
    }
  }, [editDetail]);

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await userDetailApi.updateAddress(editDetail.id, newAddress);

      if (!res.data.success) throw new Error("Chỉnh sửa không thành công");
      toast.success("Đã cập nhật địa chỉ");
      setUserDetail(res.data);
      setReloadAddress((prev) => prev + 1);
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi chỉnh sửa địa chỉ.");
    } finally {
      setLoading(false);
    }
  };

  if (!showEditModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200 p-4"
      onClick={() => setShowEditModal(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-xl font-bold text-gray-800">Chỉnh sửa địa chỉ</h3>
          <button
            onClick={() => setShowEditModal(false)}
            className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Name & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  <User size={14} className="text-gray-400" /> Tên người nhận <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="receiverName"
                  value={newAddress.receiverName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  <Phone size={14} className="text-gray-400" /> Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={newAddress.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
                  required
                />
              </div>
            </div>

            {/* Address Line 1 */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <MapPin size={14} className="text-gray-400" /> Địa chỉ cụ thể <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="addressLine1"
                value={newAddress.addressLine1}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
                required
              />
            </div>

            {/* City & Ward Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Tỉnh/Thành phố <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Phường/Xã <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ward"
                  value={newAddress.ward}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
                  required
                />
              </div>
            </div>

            {/* Default Checkbox */}
            <div className="pt-2">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={newAddress.isDefault || false}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, isDefault: e.target.checked })
                  }
                  className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500 cursor-pointer accent-amber-700"
                />
                <span className="text-sm font-medium text-gray-700 select-none">
                  Đặt làm địa chỉ mặc định
                </span>
              </label>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-colors"
                onClick={() => setShowEditModal(false)}
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-[#3e2723] hover:bg-[#5d4037] text-white font-bold rounded-xl shadow-lg shadow-amber-900/10 active:scale-[0.98] transition-all"
              >
                <Check size={18} />
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;