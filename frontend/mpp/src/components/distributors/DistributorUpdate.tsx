import { Component, useEffect, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { Distributor } from '../../models/Distributor';
import * as Authentication from '../../helpers/Authentication';
import { DistributorForm } from './DistributorForm';
import { UpdatePage } from '../CRUD/UpdatePage';
import { CarsOnPurchaseForm } from '../cars_on_purchase/CarsOnPurchaseForm';

export const DistributorUpdate = () => {
    const [element, setElement] = useState<Distributor>(new Distributor())
    // const navigate_back = useNavigate()
    //     const { id } = useParams()

    //     const endpoint = ServerSettings.API_ENDPOINT + EndPoints.DISTRIBUTOR_TABLE + "/" + id

    //     const commit_update = () => {
    //         Authentication.make_request('PUT', endpoint, element)
    //         .then((data) => { let response_data = data.data; setElement(response_data); })
    //         navigate_back(-1)
    //     }

    //     const cancel_update = () => {
    //         navigate_back(-1)
    //     }

    //     let form_result : any;

    //     useEffect(() => {
    //         fetch(
    //             endpoint
    //         )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setElement(data)
    //         })
    //     }, [])

    //     form_result = <DistributorForm element={element} setElement={setElement} />;

    //     let return_element = <Button onClick={() => navigate_back(-1)}>
    //         <KeyboardReturnIcon/>
    //     </Button>

    //     if (element === undefined) {
    //         return <React.Fragment>
    //             {return_element}
    //             <div>Oops! The Distributor with id {id} was not found!</div>
    //         </React.Fragment>
    //     } 

    //     return (
    //         <React.Fragment>
    //         {form_result}
    //         <div>
    //             <button onClick={commit_update}>
    //                 <EditIcon/>
    //             </button>

    //             <button onClick={cancel_update}>
    //                 <KeyboardReturnIcon/>
    //             </button>
    //         </div>
    //         </React.Fragment>
    //     )

    return <UpdatePage element={element} setElement={setElement} description={"Distributor"} table_endpoint={EndPoints.DISTRIBUTOR_TABLE}
        form_result={<DistributorForm element={element} setElement={setElement} initial_empty={false} />}/>
}