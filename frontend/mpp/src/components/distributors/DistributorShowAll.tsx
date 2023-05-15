import { EndPoints } from '../../Endpoints';
import { DistributorTableColumns } from './DistributorTableColumns';
import { ShowAll } from '../CRUD/ShowAll';

export const DistributorShowAll = () => {
    let table_columns = DistributorTableColumns()
    
    return <ShowAll table_endpoint={EndPoints.DISTRIBUTOR_TABLE} has_actions={true} table_columns={table_columns} description={"Distributor"} 
    has_statistic={true}></ShowAll>
}