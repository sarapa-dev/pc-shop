import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { X } from "lucide-react";
import { useCartStore } from "../../store/store";
import { Product } from "../../types/product";

interface CartItemProps {
  item: {
    product: Product;
    quantity: number;
  };
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <Card className="p-4 mb-4">
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24">
          <img
            src={item.product.image_url || "/placeholder.webp"}
            alt={item.product.name}
            className="object-cover rounded-md"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-medium">{item.product.name}</h3>
          <p className="text-muted-foreground">${item.product.price}</p>

          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(item.product.product_id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </Button>
            <Input value={item.quantity} readOnly className="w-12 text-center" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(item.product.product_id, item.quantity + 1)}
            >
              +
            </Button>
          </div>
        </div>

        <Button variant="ghost" size="sm" onClick={() => removeItem(item.product.product_id)}>
          <X className="size-4" />
        </Button>
      </div>
    </Card>
  );
};
