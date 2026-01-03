import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { User, Mail, Calendar, ShieldCheck, Camera } from "lucide-react";

const UserProfile = () => {
  const { user } = useContext(UserContext);

  // Helper to get initials from name (e.g., "John Doe" -> "J")
  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Hồ sơ cá nhân</h2>
        <p className="text-gray-500 text-sm mt-1">
          Quản lý thông tin định danh và hiển thị của bạn.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Top Banner (Gradient) */}
        <div className="relative h-32 bg-gradient-to-r from-[#3e2723] to-[#6d4c41]">
           <div className="absolute -bottom-12 left-8">
              <div className="relative">
                {/* Avatar Circle */}
                <div className="w-24 h-24 rounded-full border-4 border-white bg-amber-100 flex items-center justify-center text-4xl font-bold text-amber-800 shadow-md">
                  {getInitials(user?.name)}
                </div>
                {/* Decorative Camera Icon (Visual only) */}
                <div className="absolute bottom-0 right-0 p-1.5 bg-gray-900 text-white rounded-full border-2 border-white shadow-sm">
                  <Camera size={14} />
                </div>
              </div>
           </div>
        </div>

        {/* Profile Content */}
        <div className="pt-16 pb-8 px-8">
          
          {/* Name & Badge */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {user?.name || "Người dùng"}
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 mt-2 border border-green-100">
              <ShieldCheck size={14} /> Tài khoản đã xác thực
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Email Field */}
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-amber-200 transition-colors group">
               <div className="flex items-center gap-3 mb-2">
                 <div className="p-2 bg-white rounded-lg text-gray-400 shadow-sm group-hover:text-amber-600 transition-colors">
                    <Mail size={18} />
                 </div>
                 <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Email đăng ký</span>
               </div>
               <p className="text-gray-900 font-medium pl-[50px]">
                 {user?.email || "Chưa cập nhật"}
               </p>
            </div>

            {/* Date Field */}
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-amber-200 transition-colors group">
               <div className="flex items-center gap-3 mb-2">
                 <div className="p-2 bg-white rounded-lg text-gray-400 shadow-sm group-hover:text-amber-600 transition-colors">
                    <Calendar size={18} />
                 </div>
                 <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Ngày tham gia</span>
               </div>
               <p className="text-gray-900 font-medium pl-[50px]">
                 {user?.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString("vi-VN", {
                        year: 'numeric', month: 'long', day: 'numeric'
                      }) 
                    : "N/A"}
               </p>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;