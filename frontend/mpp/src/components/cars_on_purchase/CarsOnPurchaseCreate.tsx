import { useEffect, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { CarsOnPurchase } from '../../models/CarsOnPurchase';
import * as Authentication from '../../helpers/Authentication';
import { CreatePage } from '../CRUD/CreatePage';
import { CarsOnPurchaseForm } from './CarsOnPurchaseForm';

export const CarsOnPuchaseCreate = () => {
  const [element, setElement] = useState<CarsOnPurchase>(new CarsOnPurchase())
//   const navigate_back = useNavigate()

//     const endpoint = ServerSettings.API_ENDPOINT + EndPoints.CARSONPURCHASE_TABLE

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
//             {/* <TextField label="Car Model" variant="standard" defaultValue={element.carModel} onChange={(event)=>{
//                 element.carModel = event.target.value
//                 setElement(element)
//             }}/>
//             <br></br>
//             <TextField label="Purchase" variant="standard" defaultValue={element.purchase} onChange={(event)=>{
//                 element.lastName = event.target.value
//                 setElement(element)
//             }}/> */}
//             <br></br>
//             <TextField type="number" label="Count" variant="standard" defaultValue={element.count} onChange={(event)=>{
//                 element.count = parseInt(event.target.value)
//                 setElement(element)
//             }}/>
//             <br></br>
//             <TextField type="number" label="Priority" variant="standard" defaultValue={element.priority} onChange={(event)=>{
//                 element.priority = parseInt(event.target.value)
//                 setElement(element)
//             }} />
//             <br></br>
//             {/* <TextField label="Priority" variant="standard" defaultValue={element.priority} onChange={(event)=>{
//                 element.priority = event.target.value
//                 setElement(element)
//             }} /> */}
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

    useEffect(() => {
        element.purchase.id = 25;
        setElement(element)
    }, [])

    return <CreatePage element={element} setElement={setElement} table_endpoint={EndPoints.CARSONPURCHASE_TABLE} 
            form_result={<CarsOnPurchaseForm element={element} setElement={setElement} initial_empty={true} />}/>
}