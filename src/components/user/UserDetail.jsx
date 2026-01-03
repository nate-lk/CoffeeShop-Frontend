import { useState, useEffect, useContext } from "react";
import UserAddModal from "./UserAddModal";
import UserEditModal from "./UserEditModal";
import { toast } from "sonner";
import { ShopContext } from "../../context/ShopContext";
import Swal from "sweetalert2";
import { userDetailApi } from "../../../api/user-api";
import { MapPin, Plus, Edit2, Trash2, Star, CheckCircle, X } from "lucide-react";

const UserDetail = ({ asModal = false, showModal, setShowModal }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userDetail, setUserDetail] = useState([]);
  const [editDetail, setEditDetail] = useState(null);
  const { token, setLoading, reloadAddress, setReloadAddress } = useContext(ShopContext);

  useEffect(() => {
    const fetchUserDetail = async () => {
      // ... existing timeout logic kept intact ...
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
            userDetailApi.getAllAddress(),
            timeoutMs
          );
          setUserDetail(res.data);
          return;
        } catch (err) {
          if (attempt === maxRetries) {
            console.log("Fetch user detail failed:", err.message);
          } else {
            await new Promise((r) => setTimeout(r, 300));
          }
        } finally {
          if (attempt === maxRetries) setLoading(false);
        }
      }
    };

    if (token) fetchUserDetail();
  }, [token, reloadAddress]);

  const handleDelete = async (e, itemId) => {
    e.preventDefault();
    const confirm = await Swal.fire({
      title: "Xóa địa chỉ?",
      text: "Bạn có chắc muốn xóa địa chỉ này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      width: "350px",
      customClass: { title: "text-lg font-bold", popup: "rounded-xl p-6" },
    });

    if (!confirm.isConfirmed) return;

    setLoading(true);
    try {
      const res = await userDetailApi.deleteAddress(itemId);
      if (!res.data.success) throw new Error("Không thể xóa địa chỉ");
      setUserDetail(res.data);
      toast.success("Đã xóa địa chỉ thành công");
      setShowAddModal(false);
      setReloadAddress((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi xóa địa chỉ.");
    } finally {
      setLoading(false);
    }
  };

  const handleDefault = async (e, itemId) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await userDetailApi.setDefaultAddress(itemId);
      if (!res.data.success) throw new Error("Không thể đặt địa chỉ mặc định");
      setUserDetail(res.data);
      setShowAddModal(false);
      setReloadAddress((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi đặt địa chỉ mặc định.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (e, item) => {
    e.preventDefault();
    setEditDetail(item);
    setShowEditModal(true);
  };

  const content = (
    <div className="w-full">
      {/* Header */}
      {!asModal && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
             Sổ địa chỉ
          </h2>
          <button
            className="flex items-center gap-2 bg-[#3e2723] hover:bg-[#5d4037] text-white text-sm px-4 py-2.5 rounded-lg shadow-sm transition-colors"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={18} />
            Thêm địa chỉ mới
          </button>
        </div>
      )}

      {/* As Modal Header Adjustment */}
      {asModal && (
         <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold text-gray-800">Chọn địa chỉ</h2>
             <button
                className="text-amber-700 text-sm font-semibold hover:underline flex items-center gap-1"
                onClick={() => setShowAddModal(true)}
              >
                <Plus size={16} /> Thêm mới
             </button>
         </div>
      )}

      {/* Address Grid */}
      {userDetail?.data?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {[...userDetail.data]
            .sort((a, b) => (b.isDefault === true) - (a.isDefault === true))
            .map((item) => (
              <div
                key={item._id}
                className={`group relative p-5 rounded-xl border transition-all duration-200 ${
                  item.isDefault
                    ? "border-amber-200 bg-amber-50/50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-amber-200 hover:shadow-sm"
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  
                  {/* Left Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-bold text-gray-900 text-lg truncate">
                        {item.receiverName}
                      </p>
                      {item.isDefault && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wider border border-amber-200">
                           <CheckCircle size={10} /> Mặc định
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 font-medium">
                      {item.phone}
                    </p>
                    
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.addressLine1}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {item.ward}, {item.city}
                    </p>
                  </div>

                  {/* Right Actions */}
                  <div className="flex flex-col gap-2">
                    {!item.isDefault && (
                      <button
                        onClick={(e) => handleDefault(e, item._id)}
                        className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Đặt làm mặc định"
                      >
                        <Star size={18} />
                      </button>
                    )}
                    
                    <button
                      onClick={(e) =>
                        handleEdit(e, {
                          id: item._id,
                          receiverName: item.receiverName,
                          phone: item.phone,
                          addressLine1: item.addressLine1,
                          ward: item.ward,
                          city: item.city,
                          isDefault: item.isDefault,
                        })
                      }
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit2 size={18} />
                    </button>

                    <button
                      onClick={(e) => handleDelete(e, item._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
           <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-3">
              <MapPin size={24} />
           </div>
           <p className="text-gray-500 font-medium">Bạn chưa có địa chỉ nào.</p>
           <button 
             onClick={() => setShowAddModal(true)}
             className="mt-3 text-amber-700 hover:underline text-sm font-semibold"
           >
             Thêm địa chỉ ngay
           </button>
        </div>
      )}

      {/* Modals */}
      <UserAddModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        setUserDetail={setUserDetail}
      />
      <UserEditModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        setUserDetail={setUserDetail}
        editDetail={editDetail}
      />
    </div>
  );

  if (!asModal) return content;

  return (
    showModal && (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        onClick={() => setShowModal(false)}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
             <h3 className="font-bold text-lg text-gray-800">Quản lý địa chỉ</h3>
             <button 
               onClick={() => setShowModal(false)}
               className="p-1 rounded-full hover:bg-gray-200 transition-colors"
             >
               <X size={20} className="text-gray-500" />
             </button>
          </div>
          
          {/* Modal Body */}
          <div className="p-4 sm:p-6 overflow-y-auto">
             {content}
          </div>
          
          {/* Modal Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
             <button
              className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              onClick={() => setShowModal(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserDetail;