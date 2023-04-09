import { useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel';
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const CarModelForm = (initial_car_model : CarModel, set_car_model: any) => {
    let car_model: CarModel = initial_car_model;
    const navigate_back = useNavigate()
  
      const endpoint = ServerSettings.API_ENDPOINT + EndPoints.CAR_TABLE
  
      const commit_update = () => {       
          navigate_back(-1)
      }
  
      const cancel_add = () => {
          navigate_back(-1)
      }
  
      return (
          <div>
              <TextField label="Model" variant="standard" defaultValue={car_model.model} onChange={(event)=>{
                  let new_car_model: CarModel = car_model
                  new_car_model.model = event.target.value
                  set_car_model(new_car_model)
              }}/>
              <br></br>
              <TextField label="Manufacturer" variant="standard" defaultValue={car_model.manufacturer} onChange={(event)=>{
                  let new_car_model: CarModel = car_model
                  new_car_model.manufacturer = event.target.value
                  set_car_model(new_car_model)
              }}/>
              <br></br>
              <TextField type="number" label="Price" variant="standard" defaultValue={car_model.price} onChange={(event)=>{
                  let new_car_model: CarModel = car_model
                  new_car_model.price = parseInt(event.target.value)
                  set_car_model(new_car_model)
              }} />
              <br></br>
              <TextField type="number" label="Fuel Consumption" variant="standard" defaultValue={car_model.fuel_consumption} onChange={(event)=>{
                  let new_car_model: CarModel = car_model
                  new_car_model.fuel_consumption = parseInt(event.target.value)
                  set_car_model(new_car_model)
              }} />
              <br></br>
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