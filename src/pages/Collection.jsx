import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/layout/Title";
import ProductCard from "../components/ProductCard";
import {
  Filter,
  ChevronDown,
  SlidersHorizontal,
  ChevronUp,
  Check,
} from "lucide-react"; // Import icons

const Collection = () => {
  const {
    categories,
    products,
    search,
    totalPages,
    setPage,
    setLimit,
    page,
    limit,
  } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setcategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const isCategorySelected = (catName) => category.includes(catName);
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setcategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilters = () => {
    let productsCopy = products.slice();

    if (search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Price filter
    if (minPrice !== "") {
      productsCopy = productsCopy.filter(
        (item) => item.price >= Number(minPrice)
      );
    }
    if (maxPrice !== "") {
      productsCopy = productsCopy.filter(
        (item) => item.price <= Number(maxPrice)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProducts = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilters();
        break;
    }
  };

  const handleMin = (e) => {
    const v = e.target.value.replace(/\D/g, ""); // remove non-digits
    setMinPrice(v ? parseInt(v, 10) * 1000 : "");
  };

  const handleMax = (e) => {
    const v = e.target.value.replace(/\D/g, "");
    setMaxPrice(v ? parseInt(v, 10) * 1000 : "");
  };

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  useEffect(() => {
    applyFilters();
  }, [category, subCategory, search, products, minPrice, maxPrice]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      {/* 1. HEADER TITLE */}
      {/* <div className="text-center mb-10">
        <span className="text-amber-700 font-medium tracking-widest text-sm uppercase">
          Tất cả sản phẩm
        </span>
        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          Các Sản Phẩm Mới Nhất
        </h2>
        <div className="w-16 h-1 bg-amber-700 mx-auto mt-4 rounded-full"></div>
      </div> */}

      {/* 2. MODERN TOP FILTER SECTION */}
      {/* 1. MOBILE TOGGLE BUTTON (Hidden on Desktop) */}
      <div className="sm:hidden mb-4">
        <button
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          className="w-full flex items-center justify-between bg-white border border-gray-200 px-4 py-3 rounded-xl shadow-sm text-gray-700 font-medium active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-amber-700" />
            <span>Danh mục sản phẩm</span>
            {/* Optional: Show count if filters are selected */}
            {category.length > 0 && (
              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full ml-1">
                {category.length}
              </span>
            )}
          </div>
          {isCategoriesOpen ? (
            <ChevronUp size={20} className="text-gray-400" />
          ) : (
            <ChevronDown size={20} className="text-gray-400" />
          )}
        </button>
      </div>

      {/* 2. CATEGORY LIST CONTAINER */}
      <div
        className={`
          transition-all duration-300 ease-in-out overflow-hidden
          ${/* Mobile Logic: Use max-height for animation */ ""}
          ${
            isCategoriesOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          } 
          
          ${/* Desktop Logic: Always show, reset max-height/opacity */ ""}
          sm:max-h-none sm:opacity-100 sm:block
        `}
      >
        <div className="flex flex-wrap justify-center sm:justify-center items-center gap-3 py-1 sm:py-0">
          {categories
            .filter((cat) => cat.productCount > 0)
            .map((cat) => {
              const isSelected = isCategorySelected(cat.name);
              return (
                <button
                  key={cat._id}
                  onClick={() =>
                    toggleCategory({ target: { value: cat.name } })
                  }
                  className={`
                    group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-medium border transition-all duration-200
                    ${
                      isSelected
                        ? "bg-[#3e2723] text-white border-[#3e2723] shadow-md shadow-amber-900/20"
                        : "bg-white text-gray-600 border-gray-200 hover:border-amber-700 hover:text-amber-800"
                    }
                  `}
                >
                  {cat.name}
                  {isSelected && <Check size={14} />}
                  <span
                    className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-amber-50 group-hover:text-amber-700"
                    }`}
                  >
                    {cat.productCount}
                  </span>
                </button>
              );
            })}
        </div>
      </div>

      {/* B. TOOLBAR (Price Toggle & Sort) */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-t border-b border-gray-100 py-4 gap-4">
        {/* Left: Filter Toggles */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => setShowPriceFilter(!showPriceFilter)}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              showPriceFilter || minPrice > 0 || maxPrice > 0
                ? "text-amber-700"
                : "text-gray-600 hover:text-black"
            }`}
          >
            <SlidersHorizontal size={18} />
            Bộ lọc giá
          </button>

          {/* Show active filter count or clear button if needed */}
          {(minPrice > 0 || maxPrice > 0) && (
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
              Đang lọc giá
            </span>
          )}
        </div>

        {/* Right: Sort & Limit */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          {/* Limit Selector */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Hiển thị:</span>
            <select
              className="bg-transparent border-none font-medium text-gray-900 focus:ring-0 cursor-pointer p-0"
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              className="appearance-none bg-transparent pl-0 pr-8 py-1 text-sm font-medium text-gray-900 focus:outline-none cursor-pointer border-none focus:ring-0 text-right"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="relevant">Liên quan nhất</option>
              <option value="low-high">Giá: Thấp - Cao</option>
              <option value="high-low">Giá: Cao - Thấp</option>
            </select>
            <ChevronDown
              className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>
      </div>

      {/* C. EXPANDABLE PRICE PANEL */}
      {/* We hide this by default to keep the UI clean */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          showPriceFilter ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-2">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Khoảng giá (Ngàn VND)
          </p>
          <div className="flex items-center gap-4 max-w-md">
            <div className="relative flex-1">
              <input
                type="number"
                placeholder="0"
                value={minPrice ? minPrice / 1000 : ""}
                onChange={handleMin}
                className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                k
              </span>
            </div>
            <span className="text-gray-400">-</span>
            <div className="relative flex-1">
              <input
                type="number"
                placeholder="Tối đa"
                value={maxPrice ? maxPrice / 1000 : ""}
                onChange={handleMax}
                className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                k
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PRODUCT GRID (Full Width) */}
      {filterProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào.</p>
          <button
            onClick={() => {
              /* clear filters logic */
            }}
            className="mt-4 text-amber-700 font-medium hover:underline"
          >
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-10">
          {filterProducts.map((item) => (
            <div key={item._id} className="group">
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      )}

      {/* 4. PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2 bg-white p-2 rounded-full border border-gray-100 shadow-sm">
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;

              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`

                        w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200

                        ${
                          page === pageNum
                            ? "bg-amber-900 text-white shadow-md scale-105"
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                        }

                      `}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;
