import { Component, useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel';
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { CarsOnPurchase } from '../../models/CarsOnPurchase';
import * as Authentication from '../../helpers/Authentication';

export const CarsOnPurchaseUpdate = () => {
    const [element, setElement] = useState<CarsOnPurchase>(new CarsOnPurchase())
    const navigate_back = useNavigate()
        const { id } = useParams()

        const endpoint = ServerSettings.API_ENDPOINT + EndPoints.CARSONPURCHASE_TABLE + "/" + id

        const commit_update = () => {
            Authentication.make_request('PUT', endpoint, element)
            .then((data) => { let response_data = data.data; setElement(response_data); })
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
                <div>Oops! The Car Order with id {id} was not found!</div>
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