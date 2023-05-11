import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { UserColumn } from '../CRUD/ShowAllUserColumn';

export const CarsOnPurchaseTableColumns = () => {
    let table_columns: GridColDef[] = [
        { field: 'carModel', headerName: 'Car Model', width: 130, 
            renderCell: (params) => (         
            <Link to={EndPoints.CARSONPURCHASE_TABLE + '/' + parseInt(params.id.valueOf().toString())}>{params.row.carModel?.model}</Link>
          ) 
        },
        { field: 'purchase', headerName: 'Purchase', width: 130,
          renderCell: (params) => (
            <Link to={EndPoints.CARSONPURCHASE_TABLE + '/' + parseInt(params.id.valueOf().toString())}>{params.row.purchase?.name}</Link>
          ) 
        },
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
      ];

      table_columns.unshift(UserColumn());

    return table_columns;
}