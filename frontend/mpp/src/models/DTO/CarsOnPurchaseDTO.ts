import { CarModel } from "../CarModel";
import { Purchase } from "../Purchase";

export interface CarsOnPurchaseDTO {
    id: number;
    carModel: CarModel;
    purchase: Purchase;
    count: number;
    priority: number;
}