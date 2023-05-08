import { useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Customer } from '../../models/Customer';
import { CarsOnPurchase } from '../../models/CarsOnPurchase';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import * as Authentication from '../../helpers/Authentication';

export const CarsOnPurchaseDetails = () => {
  const [element, setElement] = useState<CarsOnPurchase>(new CarsOnPurchase())
  const navigate_details = useNavigate()

    const { id } = useParams()

    const endpoint = ServerSettings.API_ENDPOINT + EndPoints.CARSONPURCHASE_TABLE + "/" + id 

    useEffect(() => {
        Authentication.make_request('GET', endpoint, "")
        .then((data) => { console.log(data.data); setElement(data.data); })
    }, [])

    let return_element = <Button onClick={() => navigate_details(-1)}>
        <KeyboardReturnIcon/>
    </Button>

    if (element === undefined) {
        return <React.Fragment>
            {return_element}
            <div>Waiting for reply or the Car Order with id {id} was not found!</div>
        </React.Fragment>
    }

    return (
        <div>
            {return_element}

            <h1>Car Order Details</h1>
            <h3>Customer: {element.purchase.original_customer.firstName} {element.purchase.original_customer.lastName}</h3>
            <h3>Purchase Date: {element.purchase.date.toString()}</h3>
            <h3>Car Model: {element.carModel.manufacturer} {element.carModel.model}</h3>
            <h3>Count: {element.count}</h3>
            <h3>Priority: {element.priority}</h3>
        </div>
    )
}