import { Loader2, Pencil, Save, ShoppingCart, X } from "lucide-react";
import { Product } from "../../types/product";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useCartStore } from "../../store/store";
import toast from "react-hot-toast";
import { useCheckout } from "../../hooks/useCheckout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserType } from "../../types/user";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { axiosInstance } from "../../lib/axios";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useNavigate } from "react-router";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const { data: authUser } = useQuery<UserType>({ queryKey: ["authUser"] });
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Product>(product);
  const { mutate: checkout } = useCheckout();

  const { mutate: updateProduct, isPending } = useMutation({
    mutationFn: async (updatedProduct: Product) => {
      const response = await axiosInstance.put(`/product/${product.product_id}`, updatedProduct);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsEditing(false);
      toast.success("Product updated successfully!");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to update product");
    },
  });

  const cartItems = [
    {
      product_id: product.product_id,
      quantity: 1,
    },
  ];

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`Product has been added to your cart.`);
  };

  const handleCheckout = () => {
    checkout(cartItems, {
      onSuccess: () => {
        toast.success("Your payment has been processed successfully.");
      },
    });
  };

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleChange =
    (field: keyof Product) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSave = () => {
    if (JSON.stringify(formData) === JSON.stringify(product)) {
      toast("No changes to save");
      setIsEditing(false);
      return;
    }
    updateProduct(formData);
    navigate(0);
  };

  const handleCancel = () => {
    setFormData(product);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        {isEditing ? (
          <Input
            value={formData.name}
            onChange={handleChange("name")}
            className="text-3xl font-bold"
          />
        ) : (
          <h1 className="text-3xl font-bold">{product.name}</h1>
        )}
        {isEditing ? (
          <Input
            type="number"
            value={formData.price}
            onChange={handleChange("price")}
            className="mt-4 text-3xl font-bold w-40"
            step="0.01"
          />
        ) : (
          <p className="mt-4 text-3xl font-bold">${product.price}</p>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Description:</CardTitle>
          <CardDescription>Detailed information about the product</CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={formData.description || ""}
              onChange={handleChange("description")}
              className="min-h-[120px]"
            />
          ) : (
            <p className="leading-relaxed text-muted-foreground">{product.description}</p>
          )}
        </CardContent>
      </Card>

      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Image URL</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={formData.image_url || ""}
              onChange={handleChange("image_url")}
              placeholder="Enter image URL"
            />
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        {authUser?.role === "admin" ? (
          isEditing ? (
            <>
              <Button size="lg" className="flex-1" onClick={handleSave} disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 size-5 animate-spin" />
                ) : (
                  <Save className="mr-2 size-5" />
                )}
                Save Changes
              </Button>
              <Button size="lg" variant="outline" onClick={handleCancel}>
                <X className="mr-2 size-5" />
                Cancel
              </Button>
            </>
          ) : (
            <Button size="lg" className="flex-1" onClick={() => setIsEditing(true)}>
              <Pencil className="mr-2 size-5" />
              Edit Product
            </Button>
          )
        ) : (
          <>
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 size-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" onClick={handleCheckout}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Buy Now"
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
