import { useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel'
import { ServerSettings } from "../ServerIP"
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { EndPoints } from '../../Endpoints';
import React from 'react';
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { ShowAllTable } from '../CRUD/ShowAllTable';

export const ShowAll = (props: any) => {
  const [elements, setElements] = useState<any>()
  const [element_count, setElementCount] = useState(0)
  const navigate_details = useNavigate()

    const update_elements = () => {
        fetch(
            ServerSettings.API_ENDPOINT + props.table_endpoint + EndPoints.PAGE_REQUEST_PATH + "?page=" + element_count
        )
        .then((res) => res.json())
        .then((data) => {setElements(data); console.log(data);})

        fetch(
            ServerSettings.API_ENDPOINT + props.table_endpoint + EndPoints
        )
    }

    useEffect(() => {
        update_elements()
    }, [])

    let return_element = <Button onClick={() => navigate_details(-1)}>
        <KeyboardReturnIcon/>
    </Button>

    if (elements === undefined) {
        return ( 
            <React.Fragment>
                {return_element}
                <div>Waiting for reply</div> 
            </React.Fragment>
        )
    }    

    if (elements.length === 0) {
        return (
            <React.Fragment>
                {return_element}
                <div>No {props.description}</div> 
            </React.Fragment>
        )
    }

    let statistic_element;
    if (props.has_statistic) {
        statistic_element = <Button onClick={() => navigate_details(props.statictic_endpoint)}>
            Statistic
        </Button>
    }
    

    return (
        <React.Fragment>
    <div>
        {return_element}

        <h1>{props.description}</h1>
        <br></br>
        <Button onClick={() => navigate_details(props.table_endpoint + EndPoints.VIRTUAL_CREATE)}>
            <AddIcon />
        </Button>

        {statistic_element}

        <ShowAllTable data={elements} update={update_elements} has_actions={true} table_columns={props.table_columns} table_endpoint={props.table_endpoint} />
    </div>
    </React.Fragment>
    )
}