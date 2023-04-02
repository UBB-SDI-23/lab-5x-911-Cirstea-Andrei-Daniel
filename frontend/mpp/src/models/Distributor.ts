import { Shipment } from "./Shipment";


export interface Distributor {
    id: number;
    name: string;
    cooperation_start_date : Date;
    country: string;
    contactEmail : string;
    category : string;
    shipments: Shipment[];
}