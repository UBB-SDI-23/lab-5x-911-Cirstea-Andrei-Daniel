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

export const CustomerTableColumns = () => {
    let table_columns: GridColDef[] = [
        { field: 'firstName', headerName: 'First Name', width: 130, 
            renderCell: (params) => (
            <Link to={EndPoints.CUSTOMER_TABLE + '/' + parseInt(params.id.valueOf().toString())}>{params.value}</Link>
          ) 
        },
        { field: 'lastName', headerName: 'Last Name', width: 130 },
        { field: 'telephone_number', headerName: 'Phone Number', width: 160},
        {
          field: 'email_address',
          headerName: 'Email',
          width: 160,
        },
        {
          field: 'priority',
          headerName: 'Priority',
          width: 160,
        },
        {
            field: 'purchaseCount',
            headerName: 'Purchase Count',
            type: 'number',
            width: 160  
        }
      ];

    return table_columns;
}