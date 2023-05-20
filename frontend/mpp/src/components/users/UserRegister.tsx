import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import * as Authentication from '../../helpers/Authentication';
import { LoginRequest } from '../../models/LoginRequest';
import { AxiosError } from 'axios';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { User } from '../../models/User';


export const UserRegister = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [display_error, setDisplayError] = useState<boolean>(false)
    const [error_message, setErrorMessage] = useState<string>("")
    const [confirmation_code, setConfirmationCode] = useState<string>("")
    const [isInvalid, setIsInvalid] = useState(false);
    const navigate_details = useNavigate()

    const handle_failed_dialog_open = () => {
        setDisplayError(true)
    }
    
    const handle_failed_dialog_close = () => {
        setDisplayError(false)
    }

    const get_confirmation_code = () => {
        let user = new User();
        user.username = username;
        user.password = password;
        user.email = email;
        Authentication.make_request('POST', EndPoints.backendCodeRegister(), user)
        .then(
            (response) => {
                console.log(response);
                setConfirmationCode(response.data.description);
            }
        )
        .catch(
            (error: AxiosError) => {
                console.log(error)
                Authentication.setAuthHeader(null);
                setErrorMessage(error.response?.data as string)
                setDisplayError(true)
            }
        )
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

    const isValidPassword = (password: string) => {
        const hasCapitalLetter = /[A-Z]/.test(password);
        const hasSmallLetter = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);

        // Return true only if all the patterns are matched
        return password.length >= 6 && hasCapitalLetter && hasSmallLetter && hasDigit;
    };

    let current_element;
    if (confirmation_code === "") {
        current_element = <React.Fragment>
            <TextField inputProps={{data_testid: 'username'}} label="Username" variant="standard" defaultValue={username} onChange={(event)=>{
                setUsername(event.target.value)
            }} />
            <br></br>
            <TextField inputProps={{data_testid: 'password'}} type="password" label="Password" variant="standard" 
            error={isInvalid} defaultValue={password} helperText={isInvalid ? 
                'It must contain at least a capital letter, a small letter, a digit and at least 6 characters long' : ''} 
                onChange={(event) => {
                setIsInvalid(!isValidPassword(event.target.value));
                setPassword(event.target.value)
            }} />
            <br></br>
            <TextField inputProps={{data_testid: 'email'}} type="email" label="Email" variant="standard" defaultValue={email} onChange={(event) => {
                setEmail(event.target.value)
            }} />
            <br></br>
            <Button onClick={() => {get_confirmation_code()}}>
                Register
            </Button>
            <Button onClick={() => {navigate_details(-1)}}>
                <KeyboardReturnIcon/>
            </Button>
        </React.Fragment>
    }
    else {
        let link = EndPoints.backendConfirmCodeAPIOnly(confirmation_code);
        console.log(link)
        current_element = <React.Fragment>
            <h1>Click the button below to confirm your account</h1>
            <Button component={Link} to={link}>Confirm</Button>
            <br></br>
            <Button onClick={() => {navigate_details(-1)}}>
                <KeyboardReturnIcon />
            </Button>
        </React.Fragment>
    }

    return (
        <React.Fragment>
            {current_element}

            {failed_dialog_element}
        </React.Fragment>
    )
}