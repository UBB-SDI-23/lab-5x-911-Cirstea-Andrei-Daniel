import { EndPoints } from '../../Endpoints';
import { ShipmentTableColumns } from './ShipmentTableColumns';
import { ShowAll } from '../CRUD/ShowAll';

export const ShipmentShowAll = () => {
    let table_columns = ShipmentTableColumns()
    
    return <ShowAll table_endpoint={EndPoints.SHIPMENT_TABLE} has_actions={true} table_columns={table_columns} description={"Shipment"} 
    has_statistic={false}></ShowAll>
}