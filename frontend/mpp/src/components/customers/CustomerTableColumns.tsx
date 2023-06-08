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

export const CustomerTableColumns = () => {
    let table_columns: GridColDef[] = [
        { field: 'firstName', headerName: 'First Name', flex: 1, headerAlign: 'center', align: 'center',
            renderCell: (params) => (
            <Link to={EndPoints.frontendFind(EndPoints.CUSTOMER_TABLE, params.id.valueOf().toString())}>{params.value}</Link>
          ) 
        },
        { field: 'lastName', headerName: 'Last Name', flex: 1, headerAlign: 'center', align: 'center', },
        { field: 'telephone_number', headerName: 'Phone Number', flex: 1, headerAlign: 'center', align: 'center', },
        {
          field: 'email_address',
          headerName: 'Email',
          flex: 1,
          headerAlign: 'center', 
          align: 'center',
        },
        {
          field: 'priority',
          headerName: 'Priority',
          flex: 1,
          headerAlign: 'center',
          align: 'center',
        },
        {
            field: 'purchaseCount',
            headerName: 'Purchase Count',
            type: 'number',
            flex: 1,
            headerAlign: 'center', 
            align: 'center',  
        }
      ];

      table_columns.unshift(UserColumn());

    return table_columns;
}