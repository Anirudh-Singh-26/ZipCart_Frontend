import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simulate backend delay handling
    if (products && products.length > 0) {
      setIsLoading(false);
    } else {
      // allow some time for backend startup
      const timer = setTimeout(() => setIsLoading(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [products]);

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>

      {isLoading ? (
        <div className="my-10 text-center text-gray-500 text-lg">
          Products are loading, please wait...
        </div>
      ) : products.filter((product) => product.inStock).length === 0 ? (
        <div className="my-10 text-center text-gray-500 text-lg">
          No products available right now.
        </div>
      ) : (
        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-center">
          {products
            .filter((product) => product.inStock)
            .slice(0, 5)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};

export default BestSeller;
