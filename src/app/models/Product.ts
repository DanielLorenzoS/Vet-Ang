export default interface Product {
    id: number;
    name: string;
    description?: string;
    entryDate?: Date;
    expirationDate?: Date;
    price: number;
    category?: string;
    brand?: string;
    provider?: string;
    quantity: number;
    available: boolean;
    type?: string;
    batchNumber?: string;
    serialNumber?: string;
    notes?: string;
    barcode?: string;
    qrCode?: string;
}
