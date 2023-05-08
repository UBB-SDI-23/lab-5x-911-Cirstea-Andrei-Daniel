import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import * as Authentication from '../../helpers/Authentication';
import { LoginRequest } from '../../models/LoginRequest';
import { AxiosError } from 'axios';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


export const UserLogin = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [display_error, setDisplayError] = useState<boolean>(false)
    const [error_message, setErrorMessage] = useState<string>("")
    const navigate_details = useNavigate()

    const handle_failed_dialog_open = () => {
        setDisplayError(true)
    }
    
    const handle_failed_dialog_close = () => {
        setDisplayError(false)
    }

    const login = () => {
        let login_request = new LoginRequest();
        login_request.password = password;
        login_request.username = username;

        Authentication.make_request('POST', EndPoints.backendLogin(), JSON.stringify(login_request))
        .then(
            (response) => {
                console.log(response);
                Authentication.setAuthHeader(response.data.token);
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
            <TextField label="Username" variant="standard" defaultValue={username} onChange={(event)=>{
                setUsername(event.target.value)
            }} />
            <br></br>
            <TextField label="Password" variant="standard" defaultValue={password} onChange={(event) => {
                setPassword(event.target.value)
            }} />
            <br></br>
            <Button onClick={() => {login()}}>
                Login
            </Button>

            <Button onClick={() => {navigate_details(EndPoints.REGISTER_PAGE)}}>
                Register
            </Button>

            {failed_dialog_element}
        </React.Fragment>
    )
}