import { useEffect, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Box, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Purchase } from '../../models/Purchase';

export const PurchaseDetails = () => {
  const [element, setElement] = useState<Purchase>(new Purchase())
  const [purchases_html, set_purchases_html] = useState((<h3>No Purchases</h3>))

    const { id } = useParams()

    const endpoint = ServerSettings.API_ENDPOINT + EndPoints.PURCHASE_TABLE + "/" + id 

    let cars_on_purchase_columns: GridColDef[] = [
        { field: 'count', headerName: 'Order Count', type: 'number', width: 130 },
        { field: 'priority', headerName: 'Priority', type: 'number', width: 130 },
    ];

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

    if (element === undefined) {
        return <div>Waiting for reply or the Customer with id {id} was not found!</div>
    }

    return (
        <div>
            <h1>Purchase Details</h1>
            <h3>Customer: {element.original_customer.firstName} {element.original_customer.lastName}</h3>
            <h3>Date: {element.date.toString()}</h3>
            <h3>Pay Method: {element.payMethod}</h3>
            <h3>Status: {element.status}</h3>
            {purchases_html}
        </div>
    )
}