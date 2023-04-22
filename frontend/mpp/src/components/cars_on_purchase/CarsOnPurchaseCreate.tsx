import { useEffect, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { CarsOnPurchase } from '../../models/CarsOnPurchase';

export const CarsOnPuchaseCreate = () => {
  const [element, setElement] = useState<CarsOnPurchase>(new CarsOnPurchase())
  const navigate_back = useNavigate()

    const endpoint = ServerSettings.API_ENDPOINT + EndPoints.CARSONPURCHASE_TABLE

    const commit_update = () => {
        const request_options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(element, null, 2)
        };

        fetch(
            endpoint,
            request_options
        )
        .then((res) => res.json())
        .then((data) => {setElement(data); })
        navigate_back(-1)
    }

    const cancel_add = () => {
        navigate_back(-1)
    }

    let form_result = (
        <div>
            {/* <TextField label="Car Model" variant="standard" defaultValue={element.carModel} onChange={(event)=>{
                element.carModel = event.target.value
                setElement(element)
            }}/>
            <br></br>
            <TextField label="Purchase" variant="standard" defaultValue={element.purchase} onChange={(event)=>{
                element.lastName = event.target.value
                setElement(element)
            }}/> */}
            <br></br>
            <TextField type="number" label="Count" variant="standard" defaultValue={element.count} onChange={(event)=>{
                element.count = parseInt(event.target.value)
                setElement(element)
            }}/>
            <br></br>
            <TextField type="number" label="Priority" variant="standard" defaultValue={element.priority} onChange={(event)=>{
                element.priority = parseInt(event.target.value)
                setElement(element)
            }} />
            <br></br>
            {/* <TextField label="Priority" variant="standard" defaultValue={element.priority} onChange={(event)=>{
                element.priority = event.target.value
                setElement(element)
            }} /> */}
        </div>
    );

    return (
        <React.Fragment>
            {form_result}
            <div>
                <button onClick={commit_update}>
                    <AddIcon/>
                </button>

                <button onClick={cancel_add}>
                    <KeyboardReturnIcon />
                </button>
            </div>
        </React.Fragment>
    )
}