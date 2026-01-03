import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProductCard = ({ product }) => {
  return (
    <Card className="group w-full h-full flex flex-col overflow-hidden border border-gray-100 bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      
      {/* Image Section */}
      {/* Changed fixed height to aspect-ratio for better responsiveness */}
      <CardHeader className="p-0 bg-gray-50 relative aspect-square sm:aspect-[4/5] overflow-hidden">
        <img
          src={product.image[0]}
          alt={product.name}
          className="object-contain w-full h-full p-4 transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </CardHeader>

      {/* Content Section */}
      <CardContent className="flex flex-col flex-1 p-3 sm:p-4 gap-2">
        {/* Title */}
        <CardTitle className="text-sm sm:text-base font-medium text-gray-700 leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-amber-700 transition-colors">
          {product.name}
        </CardTitle>

        {/* Price */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <p className="text-gray-900 font-bold text-base sm:text-lg tracking-tight">
            {product.price.toLocaleString()}₫
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;