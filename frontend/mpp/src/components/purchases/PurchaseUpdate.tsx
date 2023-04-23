import { Component, useEffect, useMemo, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Autocomplete, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { Customer } from '../../models/Customer';
import { Purchase } from '../../models/Purchase';
import debounce from 'lodash.debounce';

export const PurchaseUpdate = () => {
    const [element, setElement] = useState<Purchase>(new Purchase())
    const navigate_back = useNavigate()
        const { id } = useParams()

        const endpoint = ServerSettings.API_ENDPOINT + EndPoints.PURCHASE_TABLE + "/" + id

        const commit_update = () => {
            const request_options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(element, null, 2)
            };

            fetch(
                endpoint,
                request_options
            )
            .then((res) => res.json())
            .then((data) => setElement(data))
            navigate_back(-1)
        }

        const cancel_update = () => {
            navigate_back(-1)
        }

        const [suggestions, setSuggestions] = useState<Customer[]>([])
        const fetch_suggestions = (query: string) => {
            const request_options = {
                method: 'GET'
            }

            const suggestion_endpoint = ServerSettings.API_ENDPOINT + EndPoints.CUSTOMER_TABLE + EndPoints.AUTOCOMPLETE_PATH + query
            fetch(suggestion_endpoint, request_options)
            .then((res) => res.json())
            .then((data) => { setSuggestions(data) })
        }

        const debouncedCallback = useMemo(
            () => debounce(fetch_suggestions, 300)
        , [])

        useEffect(() => {
            return () => {
                debouncedCallback.cancel();
            }
        }, [debouncedCallback])

        const handleInputChange = (event: any, value: any, reason: any) => {
            console.log("input", value, reason)

            if (reason === "input") {
                debouncedCallback(value)
            }
        }

        let form_result : any;

        useEffect(() => {
            fetch(
                endpoint
            )
            .then((res) => res.json())
            .then((data) => {
                setElement(data)
            })
        }, [])

        form_result = (
            <div>
                {
                    element.id != -1 &&
                    <>
                    <TextField type="date" label="Date" variant="standard" defaultValue={element.date} onChange={(event)=>{
                        element.date = new Date(Date.parse(event.target.value))
                        setElement(element)
                    }}/>
                    <br></br>
                    <TextField label="Pay Method" variant="standard" defaultValue={element.payMethod} onChange={(event)=>{
                        element.payMethod = event.target.value
                        setElement(element)
                    }}/>
                    <br></br>
                    <TextField label="Status" variant="standard" defaultValue={element.status} onChange={(event)=>{
                        element.status = event.target.value
                        setElement(element)
                    }}/>
                    <br></br>
                    <Autocomplete
                        id="customer_id"
                        options={suggestions}
                        getOptionLabel={(option) => option.firstName + " " + option.lastName }
                        renderInput={(params) => <TextField  {...params} label="Customer" variant="outlined" />}
                        onInputChange={handleInputChange}
                        onChange={(event, value) => {
                            if (value) {
                                console.log(value);
                                element.original_customer.id = value.id
                                setElement(element)
                            }
                        }}
                    />
                    </>
                }
            </div>
        );

        let return_element = <Button onClick={() => navigate_back(-1)}>
            <KeyboardReturnIcon/>
        </Button>

        if (element === undefined) {
            return <React.Fragment>
                {return_element}
                <div>Oops! The Purchase with id {id} was not found!</div>
            </React.Fragment>
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