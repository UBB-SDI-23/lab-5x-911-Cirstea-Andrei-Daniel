import { useCallback, useEffect, useMemo, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import * as Authentication from '../../helpers/Authentication';
import EditIcon from '@mui/icons-material/Edit';
import { EndPoints } from '../../Endpoints';

export const UpdatePage = (props: any) => {
    const { element, setElement, form_result, table_endpoint, description } = props;
    const navigate_back = useNavigate()
    const { id } = useParams()

    const commit_update = () => {
        const endpoint = ServerSettings.API_ENDPOINT + table_endpoint + "/" + id
        Authentication.make_request('PUT', endpoint, element)
        .then((data) => { let response_data = data.data; setElement(response_data); })
        navigate_back(-1)
    }

    useEffect(() => {
        const endpoint = EndPoints.backendFind(table_endpoint, id)
        console.log(endpoint)
        Authentication.make_request('GET', endpoint, "")
        .then((data) => { let response_data = data.data; setElement(response_data) });
    }, [])

    const cancel_update = () => {
        navigate_back(-1)
    }

    let return_element = <Button onClick={() => navigate_back(-1)}>
        <KeyboardReturnIcon/>
    </Button>

    if (element === undefined) {
        return <React.Fragment>
            {return_element}
            <div>Oops! The {description} with id {id} was not found!</div>
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