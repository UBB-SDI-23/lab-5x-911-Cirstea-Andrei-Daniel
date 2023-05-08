import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import * as Authentication from '../../helpers/Authentication';
import { LoginRequest } from '../../models/LoginRequest';
import { AxiosError } from 'axios';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { UserProfileDTO } from '../../models/DTO/UserProfileDTO';
import { profile } from 'console';


export const UserProfileComponent = () => {
    const navigate_details = useNavigate()
    const [user_profile, setProfile] = useState<UserProfileDTO>();
    const [display_error, setDisplayError] = useState<boolean>(false)
    const [error_message, setErrorMessage] = useState<string>("")

    const {id} = useParams()

    const handle_failed_dialog_open = () => {
        setDisplayError(true)
    }
    
    const handle_failed_dialog_close = () => {
        setDisplayError(false)
    }

    const login = () => {
        if (id != undefined) {
            let endpoint = EndPoints.backendUserProfile(id);
            Authentication.make_request('POST', endpoint, "")
            .then((data) => { setProfile(data.data) })
            .catch(
                (error: AxiosError) => {
                    console.log(error);
                    Authentication.setAuthHeader(null);
                    setErrorMessage(error.response?.data as string)
                    setDisplayError(true)
                }
            );
        }
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

    let profile_element;
    if (user_profile != undefined) {
        profile_element =
         <React.Fragment>
            <h3>Description: {user_profile.description}</h3>
            <h3>Location: {user_profile.location}</h3>
        </React.Fragment>
    }
    else {
        profile_element = <div>Waiting for response</div>
    }

    return (
        {profile_element}
    )
}