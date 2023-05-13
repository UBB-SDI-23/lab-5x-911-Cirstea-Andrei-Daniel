import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { UserColumn } from '../CRUD/ShowAllUserColumn';

export const ShipmentTableColumns = () => {
    let table_columns: GridColDef[] = [
        { field: 'expectedArrival', headerName: 'Expected Arrival', type: 'Date', width: 130, 
            renderCell: (params) => (
            <Link to={EndPoints.frontendFind(EndPoints.SHIPMENT_TABLE, params.id.valueOf().toString())}>{new Date(params.value).toLocaleString()}</Link>
          ) 
        },
        { field: 'arrival', headerName: 'Arrival', type: 'Date', width: 130,
          renderCell: (params) => (
            <Link to={EndPoints.frontendFind(EndPoints.SHIPMENT_TABLE, params.id.valueOf().toString())}>{new Date(params.value).toLocaleString()}</Link>
          ) 
        },
        { field: 'totalPrice', headerName: 'Status', type: "number", width: 160},
      ];

      table_columns.unshift(UserColumn());

    return table_columns;
}