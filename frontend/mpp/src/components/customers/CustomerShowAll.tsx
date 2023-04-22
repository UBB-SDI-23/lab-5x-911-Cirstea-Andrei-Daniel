import { useEffect, useState } from 'react'
import { ServerSettings } from "../ServerIP"
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { EndPoints } from '../../Endpoints';
import React from 'react';
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { ShowAllTable } from '../CRUD/ShowAllTable';
import { Customer } from '../../models/Customer';
import { CustomerTableColumns } from './CustomerTableColumns';
import { ShowAll } from '../CRUD/ShowAll';

export const CustomerShowAll = () => {
    let table_columns = CustomerTableColumns()
    
    return <ShowAll table_endpoint={EndPoints.CUSTOMER_TABLE} has_actions={true} table_columns={table_columns} description={"Customers"} 
    has_statistic={false}></ShowAll>
}