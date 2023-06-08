import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { UserColumn } from '../CRUD/ShowAllUserColumn';

export const CarsOnPurchaseTableColumns = () => {
    let table_columns: GridColDef[] = [
      { field: 'count', headerName: 'Count', type: 'number', flex: 1, headerAlign: 'center', align: 'center',
            renderCell: (params) => (
              <Link to={EndPoints.frontendFind(EndPoints.CARSONPURCHASE_TABLE, params.id.valueOf().toString())}>{params.value}</Link>
            )
        },
        {
          field: 'priority',
          headerName: 'Priority',
          type: 'number',
          flex: 1,
          headerAlign: 'center', align: 'center',
        },
        { field: 'carModel', headerName: 'Car Model', flex: 1,  headerAlign: 'center', align: 'center',
            renderCell: (params) => (         
            <div>{params.row.carModel?.model}</div>
          ) 
        },
        { field: 'purchase', headerName: 'Purchase Date', flex: 1, headerAlign: 'center', align: 'center',
          renderCell: (params) => (
            <div>{new Date(params.row.purchase?.date).toLocaleString("en-GB", { month: "2-digit", day: "2-digit", year: "numeric" })}</div>
          ) 
        },
      ];

      table_columns.unshift(UserColumn());

    return table_columns;
}