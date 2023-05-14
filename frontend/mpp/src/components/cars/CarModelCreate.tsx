import { useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel';
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import * as Authentication from '../../helpers/Authentication';
import { CarModelForm } from './CarModelForm';
import { CreatePage } from '../CRUD/CreatePage';

export const CarModelCreate = () => {
  const [element, setElement] = useState<CarModel>(new CarModel())
//   const navigate_back = useNavigate()

//     const endpoint = ServerSettings.API_ENDPOINT + EndPoints.CAR_TABLE

//     const commit_update = () => {
//         Authentication.make_request('POST', endpoint, element)
//         .then((data) => { setElement(data.data) })
//         navigate_back(-1)
//     }

//     const cancel_add = () => {
//         navigate_back(-1)
//     }

//     let form_result = (
//         <div>
//             <TextField label="Model" variant="standard" defaultValue={element.model} onChange={(event)=>{
//                 element.model = event.target.value;
//                 setElement(element);
//             }}/>
//             <br></br>
//             <TextField label="Manufacturer" variant="standard" defaultValue={element.manufacturer} onChange={(event)=>{
//                 element.manufacturer = event.target.value;
//                 setElement(element);
//             }}/>
//             <br></br>
//             <TextField label="Manufacture Year" variant="standard" defaultValue={element.manufacture_year} onChange={(event)=>{
//                         element.manufacture_year = parseInt(event.target.value);
//                         setElement(element);
//                     }}/>
//             <br></br>
//             <TextField type="number" label="Price" variant="standard" defaultValue={element.price} onChange={(event)=>{
//                 element.price = parseInt(event.target.value)
//                 setElement(element);
//             }} />
//             <br></br>
//             <TextField type="number" label="Fuel Consumption" variant="standard" defaultValue={element.fuel_consumption} onChange={(event)=>{
//                 element.fuel_consumption = parseInt(event.target.value)
//                 setElement(element);
//             }} />
//         </div>
//     );

//     return (
//         <React.Fragment>
//             {form_result}
//             <div>
//                 <button onClick={commit_update}>
//                     <AddIcon/>
//                 </button>

//                 <button onClick={cancel_add}>
//                     <KeyboardReturnIcon />
//                 </button>
//             </div>
//         </React.Fragment>
//     )

    return <CreatePage element={element} setElement={setElement} table_endpoint={EndPoints.CAR_TABLE} 
                form_result={<CarModelForm element={element} setElement={setElement} initial_empty={true} />}/>
}