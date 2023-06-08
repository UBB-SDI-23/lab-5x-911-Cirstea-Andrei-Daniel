import { useEffect, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { Shipment } from '../../models/Shipment';
import { Distributor } from '../../models/Distributor';
import * as Authentication from '../../helpers/Authentication';
import { ShipmentTableColumns } from '../shipments/ShipmentTableColumns';
import { DateToTextFieldInput } from '../../helpers/Helpers';

export const DistributorDetails = () => {
  const [element, setElement] = useState<Distributor>(new Distributor())
  const [shipment_html, set_shipment_html] = useState((<h3>No Shipments</h3>))
  const navigate_details = useNavigate()

    const { id } = useParams()

    const endpoint = EndPoints.backendFind(EndPoints.DISTRIBUTOR_TABLE, id)

    let shipment_columns = ShipmentTableColumns();

    let user_column: GridColDef =
        { field: 'user', headerName: 'User', flex: 1, headerAlign: 'center', align: 'center',
            renderCell: (params) => {
                return (
                    <Link to={EndPoints.USER_TABLE + '/find_profile/' + parseInt(params.value.id.valueOf().toString())}>{params.value.username}</Link>
                ) 
            }
        }
        shipment_columns.shift();
        shipment_columns.unshift(user_column);

    useEffect(() => {
        Authentication.make_request('GET', endpoint, "")
        .then((data) => { let response_data = data.data; console.log("HEY"); console.log(response_data); setElement(response_data); })
    }, [])

    useEffect(() => {
        if (!(element.shipments === undefined || element.shipments.length == 0)) {
            set_shipment_html(<Box sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={element.shipments}
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
                        sx={{
                            "& .MuiDataGrid-virtualScroller": {
                              overflow: "hidden"
                            }
                        }}
                    />
                </Box>)
            console.log(shipment_html)
         }
    }, [element])

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

            <h1>Distributor Details</h1>
            <h3>Name: {element.name}</h3>
            <h3>Cooperation Start Date: {DateToTextFieldInput(new Date(element.cooperationStartDate))}</h3>
            <h3>Country: {element.country}</h3>
            <h3>Contact Email: {element.contactEmail}</h3>
            <h3>Category: {element.category}</h3>
            <h3>User: {element.user.username}</h3>
            {shipment_html}
        </div>
    )
}