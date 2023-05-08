import { useCallback, useEffect, useMemo, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { Purchase } from '../../models/Purchase';
import { Customer } from '../../models/Customer';
import debounce from 'lodash.debounce';
import * as Authentication from '../../helpers/Authentication';

export const UpdatePage = (props: any) => {
    const { element, setElement, form_result, table_endpoint } = props;
  const navigate_back = useNavigate()

    const endpoint = ServerSettings.API_ENDPOINT + table_endpoint

    const commit_update = () => {
        console.log(element);
        Authentication.make_request('POST', endpoint, element)
        .then((data) => { setElement(data.data) })
        navigate_back(-1)
    }

    useEffect(() => {
        element.user.id = Authentication.getAuthId();
        element.user.username = Authentication.getAuthUsername();
        setElement(element);
    }, [])

    const cancel_add = () => {
        navigate_back(-1)
    }

    return (
        <React.Fragment>
            {form_result}
            <div>
                <button onClick={commit_update}>
                    <AddIcon/>
                </button>

                <button onClick={cancel_add}>
                    <KeyboardReturnIcon />
                </button>
            </div>
        </React.Fragment>
    )
}