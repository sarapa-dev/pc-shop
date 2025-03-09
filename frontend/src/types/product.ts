export interface Product {
    product_id: number;
    name: string;
    category: 'cpu' | 'motherboard' | 'gpu' | 'ram' | 'storage' | 'power_supply' | 'case' | 'cooling';
    description: string | null;
    price: number;
    image_url: string | null;
}

// export enum product_category {
//     cpu,
//     motherboard,
//     gpu,
//     ram,
//     storage,
//     power_supply,
//     case,
//     cooling,
// }
