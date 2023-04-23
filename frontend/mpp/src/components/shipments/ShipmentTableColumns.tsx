import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';

export const ShipmentTableColumns = () => {
    let table_columns: GridColDef[] = [
        { field: 'expected_arrival', headerName: 'Expected Arrival', type: 'Date', width: 130, 
            renderCell: (params) => (
            <Link to={EndPoints.PURCHASE_TABLE + '/' + parseInt(params.id.valueOf().toString())}>{params.value}</Link>
          ) 
        },
        { field: 'arrival', headerName: 'Arrival', type: 'Date', width: 130,
          renderCell: (params) => (
            <Link to={EndPoints.PURCHASE_TABLE + '/' + parseInt(params.id.valueOf().toString())}>{params.value}</Link>
          ) 
        },
        { field: 'totalPrice', headerName: 'Status', type: "number", width: 160},
      ];

    return table_columns;
}