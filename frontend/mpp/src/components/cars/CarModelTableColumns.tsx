import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid'
import { EndPoints } from '../../Endpoints'
import { Link } from 'react-router-dom'
import { UserColumn } from '../CRUD/ShowAllUserColumn';

export const CarModelTableColumns = () => {
    let table_columns: GridColDef[] = [
        { field: 'model', headerName: 'Model', width: 130, 
            renderCell: (params) => (
              <Link to={EndPoints.CAR_TABLE + EndPoints.FIND_PATH + "/" + parseInt(params.id.valueOf().toString())}>{params.value}</Link>
            ) 
        },
        { field: 'manufacturer', headerName: 'Manufacturer', width: 130 },
        { field: 'manufacture_year', headerName: 'Manufacture Year', width: 160},
        {
          field: 'price',
          headerName: 'Price',
          type: 'number',
          width: 160,
        },
        {
          field: 'fuel_consumption',
          headerName: 'Fuel Consumption',
          type: 'number',
          width: 160,
        },
      ];

      table_columns.unshift(UserColumn());

    return table_columns;
}