import { useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel'
import { ServerSettings } from '../ServerIP';
import { useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { TextField } from '@mui/material';

export const CarModelDetails = () => {
  const [carModel, setCarModel] = useState<CarModel>()

    const { id } = useParams()

    const endpoint = ServerSettings.API_ENDPOINT + EndPoints.CAR_TABLE + "/" + id 

    useEffect(() => {
        fetch(
            endpoint
        )
        .then((res) => res.json())
        .then((data) => { setCarModel(data) })
    }, [])

    if (carModel === undefined) {
        return <div>Oops! The car with id {id} was not found!</div>
    }

    return (
        <div>
            <h1>Car Model Details</h1>
            <h3>Model: {carModel.model}</h3>
            <h3>Manufacturer: {carModel.manufacturer}</h3>
            <h3>Price: {carModel.price}</h3>
            <h3>Fuel Consumption: {carModel.fuel_consumption}</h3>
            <table>
                <tr>
                    <th>#</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Price</th>
                    <th>Fuel Consumption</th>
                </tr>
                {
                    
                }
            </table>
        </div>
    )
}