import { Shipment } from "./Shipment";


export class Distributor {
    id: number = -1;
    name: string = "";
    cooperation_start_date : Date = new Date();
    country: string = "";
    contactEmail : string = "";
    category : string = "";
    shipments: Shipment[] = [];
}