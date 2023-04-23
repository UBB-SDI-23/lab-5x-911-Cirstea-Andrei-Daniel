import { useEffect, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { Distributor } from '../../models/Distributor';

export const DistributorCreate = () => {
  const [element, setElement] = useState<Distributor>(new Distributor())
  const navigate_back = useNavigate()

    const endpoint = ServerSettings.API_ENDPOINT + EndPoints.DISTRIBUTOR_TABLE

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
            <TextField label="Name" variant="standard" defaultValue={element.name} onChange={(event)=>{
                element.name = event.target.value
                setElement(element)
            }}/>
            <br></br>
            <TextField type="date" label="Cooperation Start Date" variant="standard" defaultValue={element.cooperation_start_date} onChange={(event)=>{
                element.cooperation_start_date = new Date(Date.parse(event.target.value))
                setElement(element)
            }}/>
            <br></br>
            <TextField label="Country" variant="standard" defaultValue={element.country} onChange={(event)=>{
                element.country = event.target.value
                setElement(element)
            }}/>
            <br></br>
            <TextField label="Contact Email" variant="standard" defaultValue={element.contactEmail} onChange={(event)=>{
                element.contactEmail = event.target.value
                setElement(element)
            }}/>
            <br></br>
            <TextField label="Category" variant="standard" defaultValue={element.category} onChange={(event)=>{
                element.category = event.target.value
                setElement(element)
            }}/>
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