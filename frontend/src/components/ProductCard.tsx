import { Link } from "react-router";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Product } from "../types/product";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useCartStore } from "../store/store";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { UserType } from "../types/user";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { data: authUser } = useQuery<UserType>({ queryKey: ["authUser"] });
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`Product has been added to your cart.`);
  };

  return (
    <Card className="group overflow-hidden shadow-md">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image_url || "/placeholder.webp"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <p className="mt-2 text-lg font-bold">${product.price}</p>
        {/* <p className="text-sm text-muted-foreground">
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </p> */}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full gap-2">
          <Button variant="outline" className="w-full" asChild>
            <Link to={`/products/${product.product_id}`}>View Details</Link>
          </Button>
          {authUser?.role === "admin" ? (
            <></>
          ) : (
            <Button
              className="flex-none"
              onClick={handleAddToCart}
              // disabled={product.stock === 0}
              // title={product.stock === 0 ? "Out of stock" : "Add to cart"}
            >
              <ShoppingCart className="size-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
