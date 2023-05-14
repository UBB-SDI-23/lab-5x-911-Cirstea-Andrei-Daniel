import { Component, useEffect, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { Shipment } from '../../models/Shipment';
import * as Authentication from '../../helpers/Authentication';
import { UpdatePage } from '../CRUD/UpdatePage';
import { ShipmentForm } from './ShipmentForm';

export const ShipmentUpdate = () => {
    const [element, setElement] = useState<Shipment>(new Shipment())
    // const navigate_back = useNavigate()
    //     const { id } = useParams()

    //     const endpoint = ServerSettings.API_ENDPOINT + EndPoints.SHIPMENT_TABLE + "/" + id

    //     const commit_update = () => {
    //         Authentication.make_request('PUT', endpoint, element)
    //         .then((data) => { let response_data = data.data; setElement(response_data); })
    //         navigate_back(-1)
    //     }

    //     const cancel_update = () => {
    //         navigate_back(-1)
    //     }

    //     let form_result : any;

    //     useEffect(() => {
    //         fetch(
    //             endpoint
    //         )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setElement(data)
    //         })
    //     }, [])

    //     form_result = (
    //         <div>
    //             {
    //                 element.id != -1 &&
    //                 <>
    //                 <TextField type="date" label="Expected Arrival" variant="standard" defaultValue={element.expectedArrival} onChange={(event)=>{
    //                     element.expectedArrival = new Date(Date.parse(event.target.value))
    //                     setElement(element)
    //                 }}/>
    //                 <br></br>
    //                 <TextField type="date" label="Arrival" variant="standard" defaultValue={element.arrival} onChange={(event)=>{
    //                     element.arrival = new Date(Date.parse(event.target.value))
    //                     setElement(element)
    //                 }}/>
    //                 <br></br>
    //                 <TextField type="number" label="Total Price" variant="standard" defaultValue={element.totalPrice} onChange={(event)=>{
    //                     element.totalPrice = parseInt(event.target.value)
    //                     setElement(element)
    //                 }}/>
    //                 <br></br>
    //                 {/* <TextField label="Email" variant="standard" defaultValue={element.email_address} onChange={(event)=>{
    //                     element.email_address = event.target.value
    //                     setElement(element)
    //                 }} /> */}
    //                 </>
    //             }
    //         </div>
    //     );

    //     let return_element = <Button onClick={() => navigate_back(-1)}>
    //         <KeyboardReturnIcon/>
    //     </Button>

    //     if (element === undefined) {
    //         return <React.Fragment>
    //             {return_element}
    //             <div>Oops! The Shipment with id {id} was not found!</div>
    //         </React.Fragment>
    //     } 

    //     return (
    //         <React.Fragment>
    //         {form_result}
    //         <div>
    //             <button onClick={commit_update}>
    //                 <EditIcon/>
    //             </button>

    //             <button onClick={cancel_update}>
    //                 <KeyboardReturnIcon/>
    //             </button>
    //         </div>
    //         </React.Fragment>
    //     )

    return <UpdatePage element={element} setElement={setElement} description={"Shipment"} table_endpoint={EndPoints.SHIPMENT_TABLE}
        form_result={<ShipmentForm element={element} setElement={setElement} initial_empty={false} />}/>
}