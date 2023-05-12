import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { UserColumn } from '../CRUD/ShowAllUserColumn';

export const CarsOnPurchaseTableColumns = () => {
    let table_columns: GridColDef[] = [
      { field: 'count', headerName: 'Count', type: 'number', width: 160,
            renderCell: (params) => (
              <Link to={EndPoints.CARSONPURCHASE_TABLE + '/' + parseInt(params.id.valueOf().toString())}>{params.value}</Link>
            )
        },
        {
          field: 'priority',
          headerName: 'Priority',
          type: 'number',
          width: 160,
        },
        { field: 'carModel', headerName: 'Car Model', width: 130, 
            renderCell: (params) => (         
            <div>{params.row.carModel?.model}</div>
          ) 
        },
        { field: 'purchase', headerName: 'Purchase Date', width: 150,
          renderCell: (params) => (
            <div>{new Date(params.row.purchase?.date).toLocaleString("en-GB", { month: "2-digit", day: "2-digit", year: "numeric" })}</div>
          ) 
        },
      ];

      table_columns.unshift(UserColumn());

    return table_columns;
}