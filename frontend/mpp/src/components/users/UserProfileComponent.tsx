import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import * as Authentication from '../../helpers/Authentication';
import { LoginRequest } from '../../models/LoginRequest';
import { AxiosError } from 'axios';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { UserProfileDTO } from '../../models/DTO/UserProfileDTO';
import { profile } from 'console';
import { UserDTO } from '../../models/DTO/UserDTO';
import { User } from '../../models/User';


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

    const retrieve_details = () => {
        if (id != undefined) {
            let profile_endpoint = EndPoints.backendUserProfile(id);
            Authentication.make_request('GET', profile_endpoint, "")
            .then((data) => { setProfile(data.data) })
            .catch(
                (error: AxiosError) => {
                    console.log(error);
                    setErrorMessage(error.response?.data as string)
                    setDisplayError(true)
                }
            );
        }
    }

    useEffect(retrieve_details, [])

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
            <h3>Birthday: {new Date(user_profile.birthday).toLocaleString()}</h3>
            <h3>Gender: {user_profile.gender}</h3>
            <h3>Phone Number: {user_profile.phone_number}</h3>
            <h3>Entities created</h3>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Car Models</TableCell>
                        <TableCell>Customers</TableCell>
                        <TableCell>Distributors</TableCell>
                        <TableCell>Purchases</TableCell>
                        <TableCell>Shipments</TableCell>
                        <TableCell>Car Orders</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{user_profile.entity_count[0]}</TableCell>
                        <TableCell>{user_profile.entity_count[1]}</TableCell>
                        <TableCell>{user_profile.entity_count[2]}</TableCell>
                        <TableCell>{user_profile.entity_count[3]}</TableCell>
                        <TableCell>{user_profile.entity_count[4]}</TableCell>
                        <TableCell>{user_profile.entity_count[5]}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button onClick={() => {
                navigate_details(-1)
            }}>
                <KeyboardReturnIcon></KeyboardReturnIcon>
            </Button>
        </React.Fragment>
    }
    else {
        profile_element = <React.Fragment>
            <div>Waiting for response</div>
            <Button onClick={() => {
                navigate_details(-1)
            }}>
                <KeyboardReturnIcon></KeyboardReturnIcon>
            </Button>
        </React.Fragment>
    }

    return (
        <React.Fragment>
            {profile_element}
        </React.Fragment>
    )
}