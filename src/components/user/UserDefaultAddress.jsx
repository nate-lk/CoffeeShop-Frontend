import { useState, useEffect, useContext } from "react";
import { MapPin, Pencil, Plus, Navigation } from "lucide-react";
import { ShopContext } from "../../context/ShopContext";
import UserDetail from "./UserDetail";
import { userDetailApi } from "../../../api/user-api";

const UserDetailAddress = () => {
  const {
    token,
    setLoading,
    loading, // Assuming loading is available in context, if not, use local state
    reloadAddress,
    setDefaultAddress,
    defaultAddress,
  } = useContext(ShopContext);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    const fetchDefaultAddress = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const res = await userDetailApi.getAllAddress();
        if (res.data.success && res.data.data.length > 0) {
          const def = res.data.data.find((a) => a.isDefault);
          setDefaultAddress(def || null);
        } else {
          setDefaultAddress(null);
        }
      } catch (err) {
        console.error("Error fetching default address:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultAddress();
  }, [token, reloadAddress]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <MapPin className="text-amber-600" size={20} />
          Địa chỉ nhận hàng
        </h3>
        {defaultAddress && (
          <button 
            onClick={() => setShowDetailModal(true)}
            className="text-sm font-medium text-amber-700 hover:text-amber-800 hover:underline transition-all"
          >
            Quản lý sổ địa chỉ
          </button>
        )}
      </div>

      {loading ? (
        // Loading Skeleton
        <div className="h-24 bg-gray-100 rounded-2xl animate-pulse w-full"></div>
      ) : defaultAddress ? (
        // Modern Address Card
        <div className="group relative bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Address Info */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-bold text-gray-900 text-lg">
                  {defaultAddress.receiverName}
                </span>
                <span className="hidden sm:block text-gray-300">|</span>
                <span className="font-medium text-gray-700">
                  {defaultAddress.phone}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 uppercase tracking-wide">
                  Mặc định
                </span>
              </div>
              
              <div className="flex items-start gap-2 text-gray-500 text-sm">
                <Navigation size={14} className="mt-1 flex-shrink-0" />
                <p className="leading-relaxed">
                  {defaultAddress.addressLine1}, {defaultAddress.ward}, {defaultAddress.city}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setShowDetailModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-white hover:text-amber-700 border border-transparent hover:border-amber-200 rounded-xl transition-all"
            >
              <Pencil size={14} />
              Thay đổi
            </button>
          </div>
        </div>
      ) : (
        // Empty State (Dashed Border)
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/50 hover:bg-white hover:border-amber-300 transition-all text-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-gray-400">
             <MapPin size={24} />
          </div>
          <p className="text-gray-900 font-medium">Bạn chưa thiết lập địa chỉ mặc định</p>
          <p className="text-gray-500 text-sm mb-4">Thêm địa chỉ để tiến hành thanh toán nhanh hơn.</p>
          <button
            onClick={() => setShowDetailModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#3e2723] hover:bg-[#5d4037] text-white font-bold rounded-xl shadow-lg shadow-amber-900/10 active:scale-[0.98] transition-all"
          >
            <Plus size={18} />
            Thêm địa chỉ mới
          </button>
        </div>
      )}

      {/* Full User Detail Modal */}
      <UserDetail
        asModal={true}
        showModal={showDetailModal}
        setShowModal={setShowDetailModal}
      />
    </div>
  );
};

export default UserDetailAddress;