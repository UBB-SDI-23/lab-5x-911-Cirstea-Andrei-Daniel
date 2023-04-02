import { Distributor } from "./Distributor";

export interface Shipment {
    id: number;
    arrival: Date;
    expected_arrival: Date;
    parent_distributor: Distributor;
}