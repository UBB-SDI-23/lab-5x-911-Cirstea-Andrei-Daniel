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
import { CarModelTable } from './CarModelTable';
import { CarModelStatistic } from './CarModelStatistic';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export const CarModelShowAll = () => {
  const [carModels, setCarModels] = useState<CarModel[]>()
  const [delete_id, set_delete_id] = useState(0)
  const [delete_dialog, set_delete_dialog] = useState(false)
  const [successful_dialog, set_successful_dialog] = useState(false)
  const [failed_dialog, set_failed_dialog] = useState(false)
  const navigate_details = useNavigate()

    const update_car_models = () => {
        fetch(
            ServerSettings.API_ENDPOINT + EndPoints.CAR_TABLE
        )
        .then((res) => res.json())
        .then((data) => setCarModels(data))
    }

    useEffect(() => {
        update_car_models()
    }, [])

    

    if (carModels === undefined || carModels.length === 0) {
        return <div>No Car Models</div> 
    }

    return (
        <React.Fragment>
    <div>
        <Button onClick={() => navigate_details(-1)}>
            <KeyboardReturnIcon/>
        </Button>

        <h1>Car Models</h1>
        <br></br>
        <Button onClick={() => navigate_details(EndPoints.CAR_TABLE + EndPoints.VIRTUAL_CREATE)}>
            <AddIcon />
        </Button>

        <Button onClick={() => navigate_details(EndPoints.VIRTUAL_CAR_TABLE_STATISTIC)}>
            Statistic
        </Button>

        <CarModelTable carModels={carModels} update_car_models={update_car_models} has_actions={true} />
    </div>
    </React.Fragment>
    )
}