import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ServerSettings } from '../ServerIP';
import { EndPoints } from '../../Endpoints';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { CarModel } from '../../models/CarModel';
import React from 'react';
import { UserColumn } from '../CRUD/ShowAllUserColumn';

export const PurchaseTableColumns = () => {
    let table_columns: GridColDef[] = [
        { field: 'date', headerName: 'Date', type: 'Date', flex: 1, headerAlign: 'center', align: 'center',
            renderCell: (params) => (
            <Link to={EndPoints.frontendFind(EndPoints.PURCHASE_TABLE, params.id.valueOf().toString())}>{new Date(params.value).toLocaleString()}</Link>
          ) 
        },
        { field: 'payMethod', headerName: 'Pay Method', flex: 1, headerAlign: 'center', align: 'center', },
        { field: 'status', headerName: 'Status', flex: 1, headerAlign: 'center', align: 'center', },
        {
            field: 'carsPurchased',
            headerName: 'Cars Purchased',
            type: 'number',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        }
      ];

      table_columns.unshift(UserColumn());

    return table_columns;
}