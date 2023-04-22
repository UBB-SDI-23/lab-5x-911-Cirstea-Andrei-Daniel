export interface PurchaseDTO {
    id: number;
    date: Date;
    payMethod: string;
    status: string;
    customerID: number;
    cars_purchased_count: number;
}