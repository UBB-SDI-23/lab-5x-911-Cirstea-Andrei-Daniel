import { Component, useEffect, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { Customer } from '../../models/Customer';
import * as Authentication from '../../helpers/Authentication';
import { UpdatePage } from '../CRUD/UpdatePage';
import { CustomerForm } from './CustomerForm';

export const CustomerUpdate = () => {
    const [element, setElement] = useState<Customer>(new Customer())
    // const navigate_back = useNavigate()
    //     const { id } = useParams()

    //     const endpoint = ServerSettings.API_ENDPOINT + EndPoints.CUSTOMER_TABLE + "/" + id

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

    //     form_result = (
    //         <div>
    //             {
    //                 element.id != -1 &&
    //                 <>
    //                 <TextField label="First Name" variant="standard" defaultValue={element.firstName} onChange={(event)=>{
    //                     element.firstName = event.target.value
    //                     setElement(element)
    //                 }}/>
    //                 <br></br>
    //                 <TextField label="Last Name" variant="standard" defaultValue={element.lastName} onChange={(event)=>{
    //                     element.lastName = event.target.value
    //                     setElement(element)
    //                 }}/>
    //                 <br></br>
    //                 <TextField label="Phone Number" variant="standard" defaultValue={element.telephone_number} onChange={(event)=>{
    //                     element.telephone_number = event.target.value
    //                     setElement(element)
    //                 }}/>
    //                 <br></br>
    //                 <TextField label="Email" variant="standard" defaultValue={element.email_address} onChange={(event)=>{
    //                     element.email_address = event.target.value
    //                     setElement(element)
    //                 }} />
    //                 <br></br>
    //                 <TextField label="Priority" variant="standard" defaultValue={element.priority} onChange={(event)=>{
    //                     element.priority = event.target.value
    //                     setElement(element)
    //                 }} />
    //                 </>
    //             }
    //         </div>
    //     );

    //     let return_element = <Button onClick={() => navigate_back(-1)}>
    //         <KeyboardReturnIcon/>
    //     </Button>

    //     if (element === undefined) {
    //         return <React.Fragment>
    //             {return_element}
    //             <div>Oops! The Customer with id {id} was not found!</div>
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

    return <UpdatePage element={element} setElement={setElement} description={"Customer"} table_endpoint={EndPoints.CUSTOMER_TABLE}
        form_result={<CustomerForm element={element} setElement={setElement} initial_empty={false}/>}/>
}