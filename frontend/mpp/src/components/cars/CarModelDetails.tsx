import { useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel'
import { ServerSettings } from '../ServerIP';
import { useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Box, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export const CarModelDetails = () => {
  const [carModel, setCarModel] = useState<CarModel>()
  const [purchases_html, set_purchases_html] = useState((<h3>No Purchases</h3>))

    const { id } = useParams()

    const endpoint = ServerSettings.API_ENDPOINT + EndPoints.CAR_TABLE + "/" + id 

    useEffect(() => {
        fetch(
            endpoint
        )
        .then((res) => res.json())
        .then((data) => { console.log(data); setCarModel(data);
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
                        autoHeight={true}
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

    if (carModel === undefined) {
        return <div>Oops! The Car Model with id {id} was not found!</div>
    }

    return (
        <div>
            <h1>Car Model Details</h1>
            <h3>Model: {carModel.model}</h3>
            <h3>Manufacturer: {carModel.manufacturer}</h3>
            <h3>Manufacture Year: {carModel.manufacture_year}</h3>
            <h3>Price: {carModel.price}</h3>
            <h3>Fuel Consumption: {carModel.fuel_consumption}</h3>
            {purchases_html}
        </div>
    )
}