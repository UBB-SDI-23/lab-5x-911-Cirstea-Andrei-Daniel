import { useEffect, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Purchase } from '../../models/Purchase';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import * as Authentication from '../../helpers/Authentication';

export const PurchaseDetails = () => {
  const [element, setElement] = useState<Purchase>(new Purchase())
  const [purchases_html, set_purchases_html] = useState((<h3>No Purchases</h3>))
  const navigate_details = useNavigate()

    const { id } = useParams()

    const endpoint = ServerSettings.API_ENDPOINT + EndPoints.PURCHASE_TABLE + "/" + id 

    let cars_on_purchase_columns: GridColDef[] = [
        { field: 'count', headerName: 'Order Count', type: 'number', width: 130 },
        { field: 'priority', headerName: 'Priority', type: 'number', width: 130 },
    ];

    useEffect(() => {
        Authentication.make_request('GET', endpoint, "")
        .then((data) => { let response_data = data.data; console.log(response_data); setElement(response_data);
         if (!(response_data.carsOnPurchaseList === undefined || response_data.carsOnPurchaseList.length == 0)) {
            set_purchases_html(<Box sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={response_data.carsOnPurchaseList}
                        columns={cars_on_purchase_columns}
                        initialState={{
                            pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                            },
                        }}
                        pageSizeOptions={[10]}
                        autoHeight={true}
                    />
                </Box>)
            console.log(purchases_html)
         }
        })
    }, [])

    let return_element = <Button onClick={() => navigate_details(-1)}>
        <KeyboardReturnIcon/>
    </Button>

    if (element === undefined) {
        return <React.Fragment>
            {return_element}
            <div>Waiting for reply or the Purchase with id {id} was not found!</div>
        </React.Fragment>
    }

    return (
        <div>
            {return_element}

            <h1>Purchase Details</h1>
            <h3>Customer: {element.original_customer.firstName} {element.original_customer.lastName}</h3>
            <h3>Date: {element.date.toString()}</h3>
            <h3>Pay Method: {element.payMethod}</h3>
            <h3>Status: {element.status}</h3>
            {purchases_html}
        </div>
    )
}