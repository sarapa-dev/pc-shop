import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCartStore } from "../store/store";
import { axiosInstance } from "../lib/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export interface ErrorResponse {
    message?: string;
    errors?: Record<string, string[]>;
}

export const useCheckout = () => {
    const { clearCart } = useCartStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (items: { product_id: number; quantity: number }[]) => {
            const response = await axiosInstance.post("/transactions", { items });
            return response.data;
        },
        onSuccess: () => {
            clearCart();
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            const errorMessage = error.response?.data?.message ||
                error.message ||
                "An unexpected error occurred";

            toast.error(errorMessage);
        },
    });
};