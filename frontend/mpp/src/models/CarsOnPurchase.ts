import { CarModel } from "./CarModel";
import { Purchase } from "./Purchase";

export interface CarsOnPurchase {
    id: number;
    count: number;
    priority: number;
    car_model: CarModel;
    purchase: Purchase;
}