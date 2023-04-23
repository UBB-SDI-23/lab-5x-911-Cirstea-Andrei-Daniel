import { Distributor } from './Distributor';

export class Shipment {
    id: number = -1;
    arrival: Date = new Date();
    expectedArrival: Date = new Date();
    totalPrice: number = 0;
    parent_distributor: Distributor = new Distributor();
}