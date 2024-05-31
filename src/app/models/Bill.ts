import Product from "./Product";
import User from "./User";

export default interface Bill {
    id: number;
    user: User;
    concept: string;
    invoiceNumber: string;
    createdAt: Date;
    expirationDate: Date;
    total: number;
    paymentMethod: string;
    paymentStatus: string;
    discount: string;
    products: Product[];
}