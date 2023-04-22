import { useEffect, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { Purchase } from '../../models/Purchase';

export const PurchaseCreate = () => {
  const [element, setElement] = useState<Purchase>(new Purchase())
  const navigate_back = useNavigate()

    const endpoint = ServerSettings.API_ENDPOINT + EndPoints.PURCHASE_TABLE

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
            <TextField type="date" label="Date" variant="standard" defaultValue={element.date} onChange={(event)=>{
                element.date = new Date(Date.parse(event.target.value))
                setElement(element)
            }}/>
            <br></br>
            <TextField label="Pay Method" variant="standard" defaultValue={element.payMethod} onChange={(event)=>{
                element.payMethod = event.target.value
                setElement(element)
            }}/>
            <br></br>
            <TextField label="Status" variant="standard" defaultValue={element.status} onChange={(event)=>{
                element.status = event.target.value
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