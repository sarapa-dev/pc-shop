import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useCartStore } from "../../store/store";
import { useCheckout } from "../../hooks/useCheckout";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export const CartSummary = () => {
    const { items } = useCartStore();
    const totalItems = useCartStore((state) => state.totalItems());
    const totalPrice = useCartStore((state) => state.totalPrice());

    const { mutate: checkout, isPending } = useCheckout();
    const cartItems = items.map((item) => ({
        product_id: item.product.product_id,
        quantity: item.quantity,
    }));

    const handleCheckout = () => {
        checkout(cartItems, {
            onSuccess: () => {
                toast.success("Your payment has been processed successfully.");
            },
        });
    };

    return (
        <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Items ({totalItems})</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
            </div>
            <Button
                className="w-full mt-6"
                onClick={handleCheckout}
                disabled={items.length === 0 || isPending}
            >
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Processing...
                    </>
                ) : (
                    "Checkout"
                )}
            </Button>
        </Card>
    );
};
