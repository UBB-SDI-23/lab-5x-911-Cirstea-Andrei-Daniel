import { useEffect, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { Shipment } from '../../models/Shipment';
import { Distributor } from '../../models/Distributor';
import * as Authentication from '../../helpers/Authentication';

export const DistributorDetails = () => {
  const [element, setElement] = useState<Distributor>(new Distributor())
  const [shipment_html, set_shipment_html] = useState((<h3>No Shipments</h3>))
  const navigate_details = useNavigate()

    const { id } = useParams()

    const endpoint = EndPoints.backendFind(EndPoints.DISTRIBUTOR_TABLE, id)

    let shipment_columns: GridColDef[] = [
        { field: 'expected_arrival', headerName: 'Date', type: 'date', width: 130 },
        { field: 'arrival', headerName: 'Pay Method', type: 'date', width: 130 },
        { field: 'totalPrice', headerName: 'Status', type: 'number', width: 130 },
    ];

    useEffect(() => {
        Authentication.make_request('GET', endpoint, "")
        .then((data) => { let response_data = data.data; console.log(response_data); setElement(response_data);
            if (!(response_data.shipments === undefined || response_data.shipments.length == 0)) {
                set_shipment_html(<Box sx={{ height: 650, width: '100%' }}>
                        <DataGrid
                            rows={response_data.purchases}
                            columns={shipment_columns}
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
                console.log(shipment_html)
             }
        })
    }, [])

    let return_element = <Button onClick={() => navigate_details(-1)}>
        <KeyboardReturnIcon/>
    </Button>

    if (element === undefined) {
        return <React.Fragment>
            {return_element}
            <div>Waiting for reply or the Distributor with id {id} was not found!</div>
        </React.Fragment>
    }

    return (
        <div>
            {return_element}

            <h1>Distributor Details</h1>
            <h3>Name: {element.name}</h3>
            <h3>Cooperation Start Date: {element.cooperationStartDate.toString()}</h3>
            <h3>Country: {element.country}</h3>
            <h3>Contact Email: {element.contactEmail}</h3>
            <h3>Category: {element.category}</h3>
            <h3>User: {element.user.username}</h3>
            {shipment_html}
        </div>
    )
}