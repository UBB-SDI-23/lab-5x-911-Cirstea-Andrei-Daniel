import { EndPoints } from '../../Endpoints';
import { PurchaseTableColumns } from './PurchaseTableColumns';
import { ShowAll } from '../CRUD/ShowAll';

export const PurchaseShowAll = () => {
    let table_columns = PurchaseTableColumns()
    
    return <ShowAll table_endpoint={EndPoints.PURCHASE_TABLE} has_actions={true} table_columns={table_columns} description={"Purchases"} 
    has_statistic={false} has_filter={true}></ShowAll>
}