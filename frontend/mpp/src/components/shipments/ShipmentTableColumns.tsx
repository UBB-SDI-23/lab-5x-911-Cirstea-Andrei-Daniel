import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { UserColumn } from '../CRUD/ShowAllUserColumn';

export const ShipmentTableColumns = () => {
    let table_columns: GridColDef[] = [
        { field: 'expectedArrival', headerName: 'Expected Arrival', type: 'Date', flex: 1, headerAlign: 'center', align: 'center',
            renderCell: (params) => (
            <Link to={EndPoints.frontendFind(EndPoints.SHIPMENT_TABLE, params.id.valueOf().toString())}>{new Date(params.value).toLocaleString()}</Link>
          ) 
        },
        { field: 'arrival', headerName: 'Arrival', type: 'Date', flex: 1, headerAlign: 'center', align: 'center',
          renderCell: (params) => (
            <Link to={EndPoints.frontendFind(EndPoints.SHIPMENT_TABLE, params.id.valueOf().toString())}>{new Date(params.value).toLocaleString()}</Link>
          ) 
        },
        { field: 'totalPrice', headerName: 'Total Price', type: "number", flex: 1, headerAlign: 'center', align: 'center', },
      ];

      table_columns.unshift(UserColumn());

    return table_columns;
}