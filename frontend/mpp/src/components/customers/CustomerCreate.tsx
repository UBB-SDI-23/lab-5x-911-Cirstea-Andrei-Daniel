import { useEffect, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { Customer } from '../../models/Customer';
import * as Authentication from '../../helpers/Authentication';

export const CustomerCreate = () => {
  const [element, setElement] = useState<Customer>(new Customer())
  const navigate_back = useNavigate()

    const endpoint = ServerSettings.API_ENDPOINT + EndPoints.CUSTOMER_TABLE

    const commit_update = () => {
        Authentication.make_request('POST', endpoint, element)
        .then((data) => { setElement(data.data) })
        navigate_back(-1)
    }

    const cancel_add = () => {
        navigate_back(-1)
    }

    let form_result = (
        <div>
            <TextField label="First Name" variant="standard" defaultValue={element.firstName} onChange={(event)=>{
                element.firstName = event.target.value
                setElement(element)
            }}/>
            <br></br>
            <TextField label="Last Name" variant="standard" defaultValue={element.lastName} onChange={(event)=>{
                element.lastName = event.target.value
                setElement(element)
            }}/>
            <br></br>
            <TextField label="Phone Number" variant="standard" defaultValue={element.telephone_number} onChange={(event)=>{
                element.telephone_number = event.target.value
                setElement(element)
            }}/>
            <br></br>
            <TextField label="Email" variant="standard" defaultValue={element.email_address} onChange={(event)=>{
                element.email_address = event.target.value
                setElement(element)
            }} />
            <br></br>
            <TextField label="Priority" variant="standard" defaultValue={element.priority} onChange={(event)=>{
                element.priority = event.target.value
                setElement(element)
            }} />
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