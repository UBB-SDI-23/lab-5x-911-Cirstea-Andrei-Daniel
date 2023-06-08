import React, { useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import * as Authentication from '../../helpers/Authentication';

export const CarModelDetails = () => {
  const [element, setCarModel] = useState<CarModel>()
  const [purchases_html, set_purchases_html] = useState((<h3>No Purchases</h3>))
  const navigate_details = useNavigate()

    const { id } = useParams()

    const endpoint = EndPoints.backendFind(EndPoints.CAR_TABLE, id)

    useEffect(() => {
        Authentication.make_request('GET', endpoint, "")
        .then((data) => { let response_data = data.data; console.log(response_data); setCarModel(response_data) 
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

    let cars_on_purchase_columns: GridColDef[] = [
        { field: 'count', headerName: 'Order Count', type: 'number', flex: 1 },
        { field: 'priority', headerName: 'Priority', type: 'number', flex: 1 },
    ];

    let return_element = <Button onClick={() => navigate_details(-1)}>
        <KeyboardReturnIcon/>
    </Button>

    if (element === undefined) {
        return <React.Fragment>
            {return_element}
            <div>Oops! The Car Model with id {id} was not found!</div>
        </React.Fragment>
    }

    return (
        <div>
            {return_element}

            <h1>Car Model Details</h1>
            <h3>Model: {element.model}</h3>
            <h3>Manufacturer: {element.manufacturer}</h3>
            <h3>Manufacture Year: {element.manufacture_year}</h3>
            <h3>Price: {element.price}</h3>
            <h3>Fuel Consumption: {element.fuel_consumption}</h3>
            <h3>User: {element.user.username}</h3>
            <h3>Orders</h3>
            {purchases_html}
        </div>
    )
}