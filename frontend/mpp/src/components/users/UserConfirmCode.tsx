import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import * as Authentication from '../../helpers/Authentication';
import { LoginRequest } from '../../models/LoginRequest';
import { AxiosError } from 'axios';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


export const UserConfirmCode = () => {
    const [display_error, setDisplayError] = useState<boolean>(false)
    const [error_message, setErrorMessage] = useState<string>("")
    const navigate_details = useNavigate()

    const { code } = useParams()

    console.log("Confirm code " + code);

    const handle_failed_dialog_open = () => {
        setDisplayError(true)
    }
    
    const handle_failed_dialog_close = () => {
        setDisplayError(false)
    }

    let display_element;

    const login = () => {
        if (code != undefined) {
            let endpoint = EndPoints.backendConfirmCode(code)
            console.log(endpoint)
            Authentication.make_request('GET', endpoint, "")
            .then(
                (response) => {
                    console.log(response);
                    Authentication.setAuth(response.data);
                    navigate_details(EndPoints.HOME_PAGE)
                })
            .catch(
                (error: AxiosError) => {
                    console.log(error);
                    Authentication.setAuthHeader(null);
                    setErrorMessage(error.response?.data as string)
                    setDisplayError(true)
                }
            );
        }
        else {
            display_element = <React.Fragment>
                <p>The confirmation code is empty</p>
            </React.Fragment>
        }
    }

    useEffect(() => {login()},
     [])

    let failed_dialog_element;
    if (display_error) {
        failed_dialog_element = <div>
            <Dialog
            open={display_error}
            onClose={handle_failed_dialog_open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {"Failure"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {error_message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handle_failed_dialog_close} autoFocus>
                    OK
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    }

    return (
        <React.Fragment>
            {display_element}
            {failed_dialog_element}
        </React.Fragment>
    )
}