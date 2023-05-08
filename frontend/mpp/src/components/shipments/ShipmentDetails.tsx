import { useEffect, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { Shipment } from '../../models/Shipment';
import * as Authentication from '../../helpers/Authentication';

export const ShipmentDetails = () => {
  const [element, setElement] = useState<Shipment>(new Shipment())
  const navigate_details = useNavigate()

    const { id } = useParams()

    const endpoint = EndPoints.backendFind(EndPoints.SHIPMENT_TABLE, id)

    useEffect(() => {
        Authentication.make_request('GET', endpoint, "")
        .then((data) => { let response_data = data.data; console.log(response_data); setElement(response_data) });
    }, [])

    let return_element = <Button onClick={() => navigate_details(-1)}>
        <KeyboardReturnIcon/>
    </Button>

    if (element === undefined) {
        return <React.Fragment>
            {return_element}
            <div>Waiting for reply or the Shipment with id {id} was not found!</div>
        </React.Fragment>
    }

    return (
        <div>
            {return_element}

            <h1>Shipment Details</h1>
            <h3>Distributor: {element.parent_distributor.name}</h3>
            <h3>Expected Arrival: {element.expectedArrival.toString()}</h3>
            <h3>Arrival: {element.arrival.toString()}</h3>
            <h3>Total Price: {element.totalPrice}</h3>
            <h3>User: {element.user.username}</h3>
        </div>
    )
}