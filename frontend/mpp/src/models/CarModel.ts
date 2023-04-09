import { CarsOnPurchase } from "./CarsOnPurchase";

export class CarModel {
    id: number = -1;
    model: string = '';
    manufacturer: string = '';
    price: number = 0;
    fuel_consumption: number = 0;
    purchases: CarsOnPurchase[] = [];
}