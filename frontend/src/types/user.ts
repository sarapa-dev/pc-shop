export interface UserType {
    email: string;
    password: string;
    username: string;
    full_name: string;
    balance: number | null;
    role: "admin" | "customer";
    user_id: number;
}

// enum Role {
//     customer,
//     admin
// }