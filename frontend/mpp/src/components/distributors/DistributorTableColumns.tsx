import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { UserColumn } from '../CRUD/ShowAllUserColumn';

export const DistributorTableColumns = () => {
    let table_columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 180,
          renderCell: (params) => (
            <Link to={EndPoints.frontendFind(EndPoints.DISTRIBUTOR_TABLE, params.id.valueOf().toString())}>{params.value}</Link>
          )
        },
        { field: 'cooperationStartDate', headerName: 'Cooperation Start Date', type: 'Date', width: 200 },
        { field: 'country', headerName: 'Country', width: 160},
        { field: 'contactEmail', headerName: 'Contact Email', width: 160},
        { field: 'category', headerName: 'Category', width: 160},
        { field: 'shipmentCount', headerName: 'Shipment Count', type: 'number', width: 160 }
      ];

      table_columns.unshift(UserColumn());

    return table_columns;
}