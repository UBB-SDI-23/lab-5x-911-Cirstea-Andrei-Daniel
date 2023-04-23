import { Component, useEffect, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { Customer } from '../../models/Customer';
import { Purchase } from '../../models/Purchase';
import { Shipment } from '../../models/Shipment';

export const ShipmentUpdate = () => {
    const [element, setElement] = useState<Shipment>(new Shipment())
    const navigate_back = useNavigate()
        const { id } = useParams()

        const endpoint = ServerSettings.API_ENDPOINT + EndPoints.SHIPMENT_TABLE + "/" + id

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
                    <TextField type="date" label="Expected Arrival" variant="standard" defaultValue={element.expected_arrival} onChange={(event)=>{
                        element.expected_arrival = new Date(Date.parse(event.target.value))
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
                <div>Oops! The Shipment with id {id} was not found!</div>
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