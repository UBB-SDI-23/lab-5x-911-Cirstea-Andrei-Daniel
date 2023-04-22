import { Purchase } from "./Purchase";

export class Customer {
    id : number = -1;
    firstName : string = "";
    lastName : string = "";
    telephone_number : string = "";
    email_address : string = "";
    priority : string = "";
    purchases : Purchase[] = [];
}