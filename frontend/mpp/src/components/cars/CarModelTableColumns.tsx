import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid'
import { EndPoints } from '../../Endpoints'
import { Link } from 'react-router-dom'
import { UserColumn } from '../CRUD/ShowAllUserColumn';
import React from 'react';

export const CarModelTableColumns = () => {
    let table_columns: GridColDef[] = [
        { field: 'model', headerName: 'Model', flex: 1, headerAlign: 'center', align: 'center',
            renderCell: (params) => (
              <React.Fragment>
                  <Link to={EndPoints.frontendFind(EndPoints.CAR_TABLE, params.id.valueOf().toString())}>{params.value}</Link>
              </React.Fragment>
            ) 
        },
        { field: 'manufacturer', headerName: 'Manufacturer', flex: 1, headerAlign: 'center', align: 'center', },
        { field: 'manufacture_year', headerName: 'Manufacture Year', flex: 1, headerAlign: 'center', align: 'center', },
        {
          field: 'price',
          headerName: 'Price',
          type: 'number',
          flex: 1,
          headerAlign: 'center', align: 'center',
        },
        {
          field: 'fuel_consumption',
          headerName: 'Fuel Consumption',
          type: 'number',
          flex: 1,
          headerAlign: 'center', align: 'center',
        },
      ];

      table_columns.unshift(UserColumn());

    return table_columns;
}