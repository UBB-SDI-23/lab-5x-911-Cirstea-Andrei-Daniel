import { CarsOnPurchase } from "./CarsOnPurchase";

export class CarModel {
    id: number = -1;
    model: string = '';
    manufacturer: string = '';
    manufacture_year: number = 0;
    price: number = 0;
    fuel_consumption: number = 0;
    carsOnPurchaseList: CarsOnPurchase[] = [];
}