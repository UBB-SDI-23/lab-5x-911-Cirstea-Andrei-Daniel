import { Component, useEffect, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { Distributor } from '../../models/Distributor';

export const DistributorUpdate = () => {
    const [element, setElement] = useState<Distributor>(new Distributor())
    const navigate_back = useNavigate()
        const { id } = useParams()

        const endpoint = ServerSettings.API_ENDPOINT + EndPoints.DISTRIBUTOR_TABLE + "/" + id

        const commit_update = () => {
            const request_options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(element, null, 2)
            };

            fetch(
                endpoint,
                request_options
            )
            .then((res) => res.json())
            .then((data) => setElement(data))
            navigate_back(-1)
        }

        const cancel_update = () => {
            navigate_back(-1)
        }

        let form_result : any;

        useEffect(() => {
            fetch(
                endpoint
            )
            .then((res) => res.json())
            .then((data) => {
                setElement(data)
            })
        }, [])

        form_result = (
            <div>
                {
                    element.id != -1 &&
                    <>
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
                    </>
                }
            </div>
        );

        let return_element = <Button onClick={() => navigate_back(-1)}>
            <KeyboardReturnIcon/>
        </Button>

        if (element === undefined) {
            return <React.Fragment>
                {return_element}
                <div>Oops! The Distributor with id {id} was not found!</div>
            </React.Fragment>
        } 

        return (
            <React.Fragment>
            {form_result}
            <div>
                <button onClick={commit_update}>
                    <EditIcon/>
                </button>

                <button onClick={cancel_update}>
                    <KeyboardReturnIcon/>
                </button>
            </div>
            </React.Fragment>
        )
}