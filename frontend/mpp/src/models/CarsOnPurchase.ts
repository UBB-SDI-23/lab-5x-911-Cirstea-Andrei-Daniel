import { CarModel } from "./CarModel";
import { Purchase } from "./Purchase";

export class CarsOnPurchase {
    id: number = -1;
    count: number = 0;
    priority: number = 0;
    carModel: CarModel = new CarModel();
    purchase: Purchase = new Purchase();
}