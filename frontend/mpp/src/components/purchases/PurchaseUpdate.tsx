import { Component, useEffect, useMemo, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { Customer } from '../../models/Customer';
import { Purchase } from '../../models/Purchase';
import debounce from 'lodash.debounce';
import * as Authentication from '../../helpers/Authentication';
import { UpdatePage } from '../CRUD/UpdatePage';
import { PurchaseForm } from './PurchaseForm';

export const PurchaseUpdate = () => {
    const [element, setElement] = useState<Purchase>(new Purchase())
    // const navigate_back = useNavigate()
    //     const { id } = useParams()

    //     const endpoint = ServerSettings.API_ENDPOINT + EndPoints.PURCHASE_TABLE + "/" + id

    //     const commit_update = () => {
    //         Authentication.make_request('PUT', endpoint, element)
    //         .then((data) => { let response_data = data.data; setElement(response_data); })
    //         navigate_back(-1)
    //     }

    //     const cancel_update = () => {
    //         navigate_back(-1)
    //     }

    //     const [suggestions, setSuggestions] = useState<Customer[]>([])
    //     const fetch_suggestions = (query: string) => {
    //         const suggestion_endpoint = ServerSettings.API_ENDPOINT + EndPoints.CUSTOMER_TABLE + EndPoints.AUTOCOMPLETE_PATH + query
    //         Authentication.make_request('GET', suggestion_endpoint, "")
    //         .then((data) => { let response_data = data.data; setSuggestions(response_data); console.log(response_data)  })
    //     }

    //     const debouncedCallback = useMemo(
    //         () => debounce(fetch_suggestions, 300)
    //     , [])

    //     useEffect(() => {
    //         return () => {
    //             debouncedCallback.cancel();
    //         }
    //     }, [debouncedCallback])

    //     const handleInputChange = (event: any, value: any, reason: any) => {
    //         console.log("input", value, reason)

    //         if (reason === "input") {
    //             debouncedCallback(value)
    //         }
    //     }

    //     let form_result : any;

    //     useEffect(() => {
    //         Authentication.make_request('GET', endpoint, "")
    //         .then((data) => { let response_data = data.data; setElement(response_data) })
    //     }, [])

    //     form_result = (
    //         <div>
    //             {
    //                 element.id != -1 &&
    //                 <>
    //                 <TextField type="date" label="Date" variant="standard" defaultValue={element.date} onChange={(event)=>{
    //                     element.date = new Date(Date.parse(event.target.value))
    //                     setElement(element)
    //                 }}/>
    //                 <br></br>
    //                 <FormControl fullWidth>
    //                     <InputLabel id="demo-simple-select-label">Pay Method</InputLabel>
    //                     <Select
    //                         labelId="demo-simple-select-label"
    //                         id="demo-simple-select"
    //                         defaultValue={element.payMethod}
    //                         label="Status"
    //                         onChange={(event) => {element.payMethod = event.target.value; setElement(element);}}
    //                     >
    //                         <MenuItem value={"CreditCard"}>CreditCard</MenuItem>
    //                         <MenuItem value={"PayPal"}>PayPal</MenuItem>
    //                         <MenuItem value={"Cash"}>Cash</MenuItem>
    //                         <MenuItem value={"DebitCard"}>DebitCard</MenuItem>
    //                         <MenuItem value={"BankTransfer"}>BankTransfer</MenuItem>
    //                     </Select>
    //                 </FormControl>
    //                 <br></br>
    //                 <FormControl fullWidth>
    //                     <InputLabel id="demo-simple-select-label">Status</InputLabel>
    //                     <Select
    //                         labelId="demo-simple-select-label"
    //                         id="demo-simple-select"
    //                         defaultValue={element.status}
    //                         label="Status"
    //                         onChange={(event) => {element.status = event.target.value; setElement(element);}}
    //                     >
    //                         <MenuItem value={"Completed"}>Completed</MenuItem>
    //                         <MenuItem value={"Pending"}>Pending</MenuItem>
    //                         <MenuItem value={"Failed"}>Failed</MenuItem>
    //                     </Select>
    //                 </FormControl>
    //                 <br></br>
    //                 <Autocomplete
    //                     id="customer_id"
    //                     options={suggestions}
    //                     getOptionLabel={(option) => option.firstName + " " + option.lastName }
    //                     renderInput={(params) => <TextField  {...params} label="Customer" variant="outlined" />}
    //                     onInputChange={handleInputChange}
    //                     onChange={(event, value) => {
    //                         if (value) {
    //                             console.log(value);
    //                             element.original_customer.id = value.id
    //                             setElement(element)
    //                         }
    //                     }}
    //                 />
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
    //             <div>Oops! The Purchase with id {id} was not found!</div>
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

    return <UpdatePage element={element} setElement={setElement} description={"Purchase"} table_endpoint={EndPoints.PURCHASE_TABLE}
        form_result={<PurchaseForm element={element} setElement={setElement} />}/>
}