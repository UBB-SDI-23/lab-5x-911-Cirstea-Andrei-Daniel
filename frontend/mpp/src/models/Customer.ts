import { Purchase } from "./Purchase";
import { User } from "./User";

export class Customer {
    id : number = -1;
    firstName : string = "";
    lastName : string = "";
    telephone_number : string = "";
    email_address : string = "";
    priority : string = "";
    purchases : Purchase[] = [];
    user: User = new User();
}