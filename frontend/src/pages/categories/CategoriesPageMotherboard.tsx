import { useQuery } from "@tanstack/react-query";
import { Product } from "../../types/product";
import { axiosInstance } from "../../lib/axios";
import { LoadingCard } from "../../components/loaders/LoadingCard";
import ProductCard from "../../components/product/ProductCard";

const CategoriesPageMotherboard = () => {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products-motherboard"],
    queryFn: async () => {
      const res = await axiosInstance.get<Product[]>("/product/category/motherboard");
      return res.data;
    },
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-3xl font-bold">All Motherboards</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <LoadingCard key={i} />)
          : products?.map((product) => <ProductCard key={product.product_id} product={product} />)}
      </div>
    </div>
  );
};

export default CategoriesPageMotherboard;
