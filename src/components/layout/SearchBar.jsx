import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const { search, setSearch } = useContext(ShopContext);

  return (
    <div className="py-4 bg-white border-b border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-1">
      <div className="relative w-full max-w-lg mx-auto px-4 sm:px-0">
        
        {/* Search Icon (Absolute Left) */}
        <div className="absolute left-7 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search size={18} />
        </div>

        {/* Input Field */}
        <input
          className="w-full pl-11 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all duration-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
        />

        {/* Clear Button (Absolute Right - Only shows if text exists) */}
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-7 sm:right-4 top-1/2 -translate-y-1/2 p-1 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 hover:text-gray-800 transition-colors"
            title="Xóa tìm kiếm"
          >
            <X size={12} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;