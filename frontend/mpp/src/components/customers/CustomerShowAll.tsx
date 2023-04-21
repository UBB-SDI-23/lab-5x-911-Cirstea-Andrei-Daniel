import { useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel'
import { ServerSettings } from "../ServerIP"
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { EndPoints } from '../../Endpoints';
import React from 'react';
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import { blue } from '@mui/material/colors';
import { CustomerTable } from './CustomerTable';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export const CustomerShowAll = () => {
  const [customers, setCustomers] = useState<CarModel[]>()
  const navigate_details = useNavigate()

    const update_car_models = () => {
        fetch(
            ServerSettings.API_ENDPOINT + EndPoints.CUSTOMER_TABLE
        )
        .then((res) => res.json())
        .then((data) => setCustomers(data))
    }

    useEffect(() => {
        update_car_models()
    }, [])

    

    if (customers === undefined || customers.length === 0) {
        return <div>No Customers</div> 
    }

    return (
        <React.Fragment>
    <div>
        <Button onClick={() => navigate_details(-1)}>
            <KeyboardReturnIcon/>
        </Button>

        <h1>Customers</h1>
        <br></br>
        <Button onClick={() => navigate_details(EndPoints.CUSTOMER_TABLE + EndPoints.VIRTUAL_CREATE)}>
            <AddIcon />
        </Button>

        <CustomerTable carModels={customers} update_car_models={update_car_models} has_actions={true} />
    </div>
    </React.Fragment>
    )
}