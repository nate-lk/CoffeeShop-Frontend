import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/layout/Title";
import ProductCard from "../components/ProductCard";
import { Filter, ChevronDown, SlidersHorizontal } from "lucide-react"; // Import icons

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
      {/* Top Header & Sort Options */}
      <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Title text1="TẤT CẢ " text2="SẢN PHẨM" />
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="sm:hidden flex items-center gap-2 text-sm text-gray-600 border px-3 py-1.5 rounded-full"
          >
            <Filter size={16} /> Lọc
          </button>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Limit Selector */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <span>Hiển thị:</span>
            <select
              className="border-none bg-gray-100 rounded px-2 py-1 focus:ring-0 cursor-pointer font-medium text-gray-700"
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

          {/* Sort Selector */}
          <div className="relative w-full sm:w-48">
            <select
              className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white text-gray-700 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="relevant">Sắp xếp: Liên quan</option>
              <option value="low-high">Giá: Thấp - Cao</option>
              <option value="high-low">Giá: Cao - Thấp</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-3 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- LEFT SIDEBAR (FILTER) --- */}
        <div
          className={`lg:w-64 flex-shrink-0 transition-all duration-300 ${
            showFilter ? "block" : "hidden"
          } lg:block`}
        >
          <div className="sticky top-24 space-y-6">
            {/* Categories */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-gray-800 font-semibold text-sm uppercase tracking-wide">
                <SlidersHorizontal size={16} />
                <span>Danh mục</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {categories
                  .filter((cat) => cat.productCount > 0)
                  .map((cat) => (
                    <label
                      key={cat._id}
                      className="group flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 transition duration-150 ease-in-out cursor-pointer"
                          type="checkbox"
                          value={cat.name}
                          onChange={toggleCategory}
                        />
                        <span className="text-gray-600 group-hover:text-gray-900 text-sm font-medium transition-colors">
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded-full group-hover:bg-white group-hover:shadow-sm transition-all">
                        {cat.productCount}
                      </span>
                    </label>
                  ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <p className="mb-4 text-gray-800 font-semibold text-sm uppercase tracking-wide">
                Khoảng giá (Ngàn VND)
              </p>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="0"
                    value={minPrice ? minPrice / 1000 : ""}
                    onChange={handleMin}
                    className="w-full pl-3 pr-2 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-center"
                  />
                </div>
                <span className="text-gray-400 font-light">-</span>
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Max"
                    value={maxPrice ? maxPrice / 1000 : ""}
                    onChange={handleMax}
                    className="w-full pl-3 pr-2 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE (GRID) --- */}
        <div className="flex-1">
          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-3">
            {filterProducts.map((item) => (
              <a
                key={item._id}
                href={`/product/${item._id}`}
                className="group block"
              >
                <div className="h-full transition-transform duration-300 hover:-translate-y-1">
                  <ProductCard product={item} />
                </div>
              </a>
            ))}
          </div>

          {/* Empty State (Optional visual improvement) */}
          {filterProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <p>Không tìm thấy sản phẩm nào.</p>
            </div>
          )}

          {/* Pagination */}
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
      </div>
    </div>
  );
};

export default Collection;
