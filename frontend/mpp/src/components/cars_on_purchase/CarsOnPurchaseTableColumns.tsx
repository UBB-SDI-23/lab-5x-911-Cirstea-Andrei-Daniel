import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';

export const CarsOnPurchaseTableColumns = () => {
    let table_columns: GridColDef[] = [
        // { field: 'carModel', headerName: 'Car Model', width: 130, 
        //     renderCell: (params) => (
        //     <Link to={EndPoints.CARSONPURCHASE_TABLE + '/' + parseInt(params.id.valueOf().toString())}>{params.value.carModel}</Link>
        //   ) 
        // },
        // { field: 'purchase', headerName: 'Purchase', width: 130,
        //   renderCell: (params) => (
        //     <Link to={EndPoints.CARSONPURCHASE_TABLE + '/' + parseInt(params.id.valueOf().toString())}>{params.value.date}</Link>
        //   ) 
        // },
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

    return table_columns;
}