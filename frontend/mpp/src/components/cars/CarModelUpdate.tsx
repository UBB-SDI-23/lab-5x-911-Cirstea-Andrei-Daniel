import { Component, useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel';
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { CarModelForm } from './CarModelForm';
import React from 'react';

export const CarModelUpdate = () => {
    const [carModel, setCarModel] = useState<CarModel>(new CarModel())
    const navigate_back = useNavigate()
        const { id } = useParams()

        const endpoint = ServerSettings.API_ENDPOINT + EndPoints.CAR_TABLE + "/" + id

        const commit_update = () => {
            const request_options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carModel, null, 2)
            };

            fetch(
                endpoint,
                request_options
            )
            .then((res) => res.json())
            .then((data) => setCarModel(data))
            navigate_back(-1)
        }

        const cancel_update = () => {
            navigate_back(-1)
        }

        let form_result : any;

        useEffect(() => {
            fetch(
                endpoint
            )
            .then((res) => res.json())
            .then((data) => {
                setCarModel(data)
            })
        }, [])

        form_result = (
            <div>
                {
                    carModel.id != -1 &&
                    <>
                    <TextField label="Model" variant="standard" defaultValue={carModel.model} onChange={(event)=>{
                        carModel.model = event.target.value;
                        setCarModel(carModel);
                    }}/>
                    <br></br>
                    <TextField label="Manufacturer" variant="standard" defaultValue={carModel.manufacturer} onChange={(event)=>{
                        carModel.manufacturer = event.target.value;
                        setCarModel(carModel);
                    }}/>
                    <br></br>
                    <TextField label="Manufacturer" variant="standard" defaultValue={carModel.manufacture_year} onChange={(event)=>{
                        carModel.manufacture_year = parseInt(event.target.value);
                        setCarModel(carModel);
                    }}/>
                    <br></br>
                    <TextField type="number" label="Price" variant="standard" defaultValue={carModel.price} onChange={(event)=>{
                        carModel.price = parseInt(event.target.value)
                        setCarModel(carModel);
                    }} />
                    <br></br>
                    <TextField type="number" label="Fuel Consumption" variant="standard" defaultValue={carModel.fuel_consumption} onChange={(event)=>{
                        carModel.fuel_consumption = parseInt(event.target.value)
                        setCarModel(carModel);
                    }} />
                    </>
                }
            </div>
        );

        if (carModel === undefined) {
            return <div>Oops! The car with id {id} was not found!</div>
        } 

        return (
            <React.Fragment>
            {form_result}
            <div>
                <button onClick={commit_update}>
                    <EditIcon/>
                </button>

                <button onClick={cancel_update}>
                    <KeyboardReturnIcon/>
                </button>
            </div>
            </React.Fragment>
        )
}