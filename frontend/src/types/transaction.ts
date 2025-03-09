import { Product } from "./product"


export interface TransactionProduct {
    transaction_id: number
    product_id: number
    quantity: number
    product: Product
}

export interface Transaction {
    transaction_id: number
    user_id: number
    total_price: string
    created_at: string
    transaction_product: TransactionProduct[]
}

