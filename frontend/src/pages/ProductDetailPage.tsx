import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router";

import { AlertCircle, ArrowLeft } from "lucide-react";
import { Product } from "../types/product";
import { axiosInstance } from "../lib/axios";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { LoadingProduct } from "../components/loaders/LoadingProduct";
import { ProductGallery } from "../components/product/ProductGallery";
import { ProductInfo } from "../components/product/ProductInfo";
import { ProductReviews } from "../components/product/ProductReviews";

const ProductDetailPage = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await axiosInstance.get<Product>(`product/${productId}`);
      return res.data;
    },
  });

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load product details. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading || !product) {
    return <LoadingProduct />;
  }

  return (
    <div className="container mx-auto">
      <Link to="/products" className="mb-2 inline-flex">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="size-4" />
          Back to Products
        </Button>
      </Link>
      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery imageUrl={product.image_url} name={product.name} />
        <ProductInfo product={product} />
      </div>
      <div className="mt-16">
        <ProductReviews productId={productId} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
