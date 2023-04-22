import { useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel'
import { ServerSettings } from '../ServerIP';
import { useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Box, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Customer } from '../../models/Customer';

export const CustomerDetails = () => {
  const [element, setElement] = useState<Customer>(new Customer())
  const [purchases_html, set_purchases_html] = useState((<h3>No Purchases</h3>))

    const { id } = useParams()

    const endpoint = ServerSettings.API_ENDPOINT + EndPoints.CUSTOMER_TABLE + "/" + id 

    let purchase_columns: GridColDef[] = [
        { field: 'date', headerName: 'Date', type: 'date', width: 130 },
        { field: 'payMethod', headerName: 'Pay Method', width: 130 },
        { field: 'payMethod', headerName: 'Pay Method', width: 130 },
        { field: 'payMethod', headerName: 'Pay Method', width: 130 },
        { field: 'payMethod', headerName: 'Pay Method', width: 130 },
    ];

    useEffect(() => {
        fetch(
            endpoint
        )
        .then((res) => res.json())
        .then((data) => { console.log(data); setElement(data);
         if (!(data.purchases === undefined || data.purchases.length == 0)) {
            set_purchases_html(<Box sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={data.purchases}
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
            <h1>Customer Details</h1>
            <h3>First Name: {element.firstName}</h3>
            <h3>Last Name: {element.lastName}</h3>
            <h3>Phone Number: {element.telephone_number}</h3>
            <h3>Email: {element.email_address}</h3>
            <h3>Priority: {element.priority}</h3>
            {purchases_html}
        </div>
    )
}