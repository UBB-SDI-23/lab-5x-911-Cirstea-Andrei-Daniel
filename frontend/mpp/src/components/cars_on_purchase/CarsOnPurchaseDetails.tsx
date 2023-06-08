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
import { DateToTextFieldInput } from '../../helpers/Helpers';

export const CarsOnPurchaseDetails = () => {
  const [element, setElement] = useState<CarsOnPurchase>(new CarsOnPurchase())
  const navigate_details = useNavigate()

    const { id } = useParams()

    const endpoint = EndPoints.backendFind(EndPoints.CARSONPURCHASE_TABLE, id)

    useEffect(() => {
        Authentication.make_request('GET', endpoint, "")
        .then((data) => { console.log(data.data); setElement(data.data); })
    }, [])

    let return_element = <Button onClick={() => navigate_details(-1)}>
        <KeyboardReturnIcon/>
    </Button>

    if (element === undefined || element.id == -1) {
        return <React.Fragment>
            {return_element}
            <div>Waiting for reply</div>
        </React.Fragment>
    }

    return (
        <div>
            {return_element}

            <h1>Car Order Details</h1>
            <h3>Customer: {element.purchase.original_customer.firstName} {element.purchase.original_customer.lastName}</h3>
            <h3>Purchase Date: {DateToTextFieldInput(new Date(element.purchase.date))}</h3>
            <h3>Car Model: {element.carModel.manufacturer} {element.carModel.model}</h3>
            <h3>Count: {element.count}</h3>
            <h3>Priority: {element.priority}</h3>
            <h3>User: {element.user.username}</h3>
        </div>
    )
}