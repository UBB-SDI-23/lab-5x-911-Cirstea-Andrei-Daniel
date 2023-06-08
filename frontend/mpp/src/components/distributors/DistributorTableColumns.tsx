import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { UserColumn } from '../CRUD/ShowAllUserColumn';

export const DistributorTableColumns = () => {
    let table_columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', flex: 1, headerAlign: 'center', align: 'center',
          renderCell: (params) => (
            <Link to={EndPoints.frontendFind(EndPoints.DISTRIBUTOR_TABLE, params.id.valueOf().toString())}>{params.value}</Link>
          )
        },
        { field: 'cooperationStartDate', headerName: 'Cooperation Start Date', type: 'Date', flex: 1, headerAlign: 'center', align: 'center',
        renderCell: (params) => (
            <div>{new Date(params.value).toLocaleString()}</div>
        ) 
        },
        { field: 'country', headerName: 'Country', flex: 1, headerAlign: 'center', align: 'center',},
        { field: 'contactEmail', headerName: 'Contact Email', flex: 1, headerAlign: 'center', align: 'center',},
        { field: 'category', headerName: 'Category', flex: 1, headerAlign: 'center', align: 'center', },
        { field: 'shipmentCount', headerName: 'Shipment Count', type: 'number', flex: 1, headerAlign: 'center', align: 'center', }
      ];

      table_columns.unshift(UserColumn());

    return table_columns;
}