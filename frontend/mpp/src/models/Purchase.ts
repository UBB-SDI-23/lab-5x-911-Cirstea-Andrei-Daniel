import { CarsOnPurchase } from "./CarsOnPurchase";

export interface Purchase {
    id: number;
    date: Date;
    payMethod: string;
    status: string;
    customerID: number;
    car_models: CarsOnPurchase[];
}