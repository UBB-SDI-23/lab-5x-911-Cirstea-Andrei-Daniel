import { useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel'
import { ServerSettings } from '../ServerIP';
import { useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Box, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Customer } from '../../models/Customer';
import { CarsOnPurchase } from '../../models/CarsOnPurchase';

export const CarsOnPurchaseDetails = () => {
  const [element, setElement] = useState<CarsOnPurchase>(new CarsOnPurchase())
  const [purchases_html, set_purchases_html] = useState((<h3>No Purchases</h3>))

    const { id } = useParams()

    const endpoint = ServerSettings.API_ENDPOINT + EndPoints.CARSONPURCHASE_TABLE + "/" + id 

    useEffect(() => {
        fetch(
            endpoint
        )
        .then((res) => res.json())
        .then((data) => { console.log(data); setElement(data);
         if (!(data.carsOnPurchaseList === undefined || data.carsOnPurchaseList.length == 0)) {
            set_purchases_html(<Box sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={data.carsOnPurchaseList}
                        columns={cars_on_purchase_columns}
                        initialState={{
                            pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                            },
                        }}
                        pageSizeOptions={[10]}
                    />
                </Box>)
            console.log(purchases_html)
         }
        })
    }, [])

    let cars_on_purchase_columns: GridColDef[] = [
        { field: 'count', headerName: 'Order Count', type: 'number', width: 130 },
        { field: 'priority', headerName: 'Priority', type: 'number', width: 130 },
    ];

    if (element === undefined) {
        return <div>Waiting for reply or the CarsOnPurchase with id {id} was not found!</div>
    }

    return (
        <div>
            <h1>CarsOnPurchase Details</h1>
            <h3>Count: {element.count}</h3>
            <h3>Priority: {element.priority}</h3>
            {/* <h3>First Name: {element.firstName}</h3>
            <h3>Last Name: {element.lastName}</h3>
            <h3>Phone Number: {element.telephone_number}</h3>
            <h3>Email: {element.email_address}</h3>
            <h3>Priority: {element.priority}</h3> */}
            {purchases_html}
        </div>
    )
}