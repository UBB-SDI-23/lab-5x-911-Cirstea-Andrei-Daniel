import { useEffect, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { Purchase } from '../../models/Purchase';
import { Shipment } from '../../models/Shipment';

export const ShipmentCreate = () => {
  const [element, setElement] = useState<Shipment>(new Shipment())
  const navigate_back = useNavigate()

    const endpoint = ServerSettings.API_ENDPOINT + EndPoints.SHIPMENT_TABLE

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
            <TextField type="date" label="Expected Arrival" variant="standard" defaultValue={element.expectedArrival} onChange={(event)=>{
                element.expectedArrival = new Date(Date.parse(event.target.value))
                setElement(element)
            }}/>
            <br></br>
            <TextField type="date" label="Arrival" variant="standard" defaultValue={element.arrival} onChange={(event)=>{
                element.arrival = new Date(Date.parse(event.target.value))
                setElement(element)
            }}/>
            <br></br>
            <TextField type="number" label="Total Price" variant="standard" defaultValue={element.totalPrice} onChange={(event)=>{
                element.totalPrice = parseInt(event.target.value)
                setElement(element)
            }}/>
            <br></br>
            {/* <TextField label="Email" variant="standard" defaultValue={element.email_address} onChange={(event)=>{
                element.email_address = event.target.value
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