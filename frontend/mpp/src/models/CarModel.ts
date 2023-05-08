import { CarsOnPurchase } from "./CarsOnPurchase";
import { User } from "./User";

export class CarModel {
    id: number = -1;
    model: string = '';
    manufacturer: string = '';
    manufacture_year: number = 0;
    price: number = 0;
    fuel_consumption: number = 0;
    carsOnPurchaseList: CarsOnPurchase[] = [];
    user: User = new User();
}