import { useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel'
import { ServerSettings } from "../ServerIP"
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { EndPoints } from '../../Endpoints';
import React from 'react';
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import { ShowAll } from '../CRUD/ShowAll';
import { CarModelTableColumns } from './CarModelTableColumns';

export const CarModelShowAll = () => {
    let table_columns = CarModelTableColumns()
    let purchase_count : GridColDef = {
        field: 'purchaseCount',
        headerName: 'Total Order Count',
        type: 'number',
        width: 160 
    }
    table_columns.push(purchase_count)

  return <ShowAll table_endpoint={EndPoints.CAR_TABLE} has_actions={true} table_columns={table_columns} description={"Car Models"} has_statistic={true}
    statistic_endpoint={EndPoints.VIRTUAL_CAR_TABLE_STATISTIC} ></ShowAll>
}