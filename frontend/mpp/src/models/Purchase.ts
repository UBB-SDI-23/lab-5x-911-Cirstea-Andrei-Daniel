import { CarsOnPurchase } from "./CarsOnPurchase";
import { Customer } from "./Customer";
import { User } from "./User";

export class Purchase {
    id: number = -1;
    date: Date = new Date();
    payMethod: string = "";
    status: string = "";
    original_customer: Customer = new Customer();
    car_models: CarsOnPurchase[] = [];
    user: User = new User();
}