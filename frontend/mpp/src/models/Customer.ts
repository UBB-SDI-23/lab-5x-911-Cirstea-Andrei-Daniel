import { Purchase } from "./Purchase";

export interface Customer {
    id : number;
    first_name : string;
    last_name : string;
    telephone_number : string;
    email_address : string;
    priority : string;
    purchases : Purchase[];
}