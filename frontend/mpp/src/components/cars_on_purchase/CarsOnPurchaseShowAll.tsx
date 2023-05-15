import { EndPoints } from '../../Endpoints';
import { CarsOnPurchaseTableColumns } from './CarsOnPurchaseTableColumns';
import { ShowAll } from '../CRUD/ShowAll';

export const CarsOnPurchaseShowAll = () => {
    let table_columns = CarsOnPurchaseTableColumns()
    
    return <ShowAll table_endpoint={EndPoints.CARSONPURCHASE_TABLE} has_actions={true} table_columns={table_columns} description={"Car Order"} 
    has_statistic={false}></ShowAll>
}