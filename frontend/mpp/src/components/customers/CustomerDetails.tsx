import { useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Customer } from '../../models/Customer';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import * as Authentication from '../../helpers/Authentication';
import { PurchaseTableColumns } from '../purchases/PurchaseTableColumns';

export const CustomerDetails = () => {
  const [element, setElement] = useState<Customer>(new Customer())
  const [purchases_html, set_purchases_html] = useState((<h3>No Purchases</h3>))
  const navigate_details = useNavigate()

    const { id } = useParams()

    const endpoint = EndPoints.backendFind(EndPoints.CUSTOMER_TABLE, id)

    let purchase_columns = PurchaseTableColumns();
    purchase_columns.pop();

    useEffect(() => {
        Authentication.make_request('GET', endpoint, "")
        .then((data) => { let response_data = data.data; console.log(response_data); setElement(response_data);
         if (!(response_data.purchases === undefined || response_data.purchases.length == 0)) {
            set_purchases_html(<Box sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={response_data.purchases}
                        columns={purchase_columns}
                        initialState={{
                            pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                            },
                        }}
                        pageSizeOptions={[10]}
                        autoHeight={true}
                        sx={{
                            "& .MuiDataGrid-virtualScroller": {
                              overflow: "hidden"
                            }
                        }}
                    />
                </Box>)
            console.log(purchases_html)
         }
        })
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

            <h1>Customer Details</h1>
            <h3>First Name: {element.firstName}</h3>
            <h3>Last Name: {element.lastName}</h3>
            <h3>Phone Number: {element.telephone_number}</h3>
            <h3>Email: {element.email_address}</h3>
            <h3>Priority: {element.priority}</h3>
            <h3>User: {element.user.username}</h3>
            {purchases_html}
        </div>
    )
}