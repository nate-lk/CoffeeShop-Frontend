import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "./Title";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 20));
  }, [products]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth : clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative my-10">
      {/* Header */}
      <div className="text-center text-3xl py-8">
        <Title text1="BÁN CHẠY " text2="NHẤT" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700">
          Thử để cảm nhận sự khác biệt — những hạt cà phê được yêu thích nhất
          tại Velvet Roast.
        </p>
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 z-10 hover:bg-gray-100 rounded-full"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 z-10 hover:bg-gray-100 rounded-full"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Product Scroll Section */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-8 scroll-smooth py-4"
      >
        {bestSeller.map((item) => (
          <Link
            key={item._id}
            to={`/product/${item._id}`}
            className="snap-start flex-shrink-0"
          >
            {/* FIX HERE: 
                1. Set a fixed width (w-48 sm:w-56) so the card knows how big to be in the carousel.
                2. Removed 'border', 'shadow', 'bg-white' from this div because ProductCard already handles that.
            */}
            <div className="w-48 sm:w-56 h-full">
              <ProductCard product={item} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
