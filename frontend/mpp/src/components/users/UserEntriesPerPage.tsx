import { FormControl, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@mui/material';
import { GridColDef, GridRenderEditCellParams } from "@mui/x-data-grid"
import { AxiosError } from "axios"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { EndPoints } from "../../Endpoints"
import { User } from "../../models/User"
import { UserRole } from "../../models/UserRole"
import { ShowAllTable } from "../CRUD/ShowAllTable"
import * as Authentication from '../../helpers/Authentication';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export const UserEntriesPerPage = () => {
    const [entries, setEntries] = useState<number>(10)
    const [display_error, setDisplayError] = useState<boolean>(false)
    const [error_message, setErrorMessage] = useState<string>("")
    const navigate_details = useNavigate()

    let role = Authentication.getAuthRole();
    if (role.name != "ROLE_ADMIN") {
        return (
            <div>Only admins can modify entries per page</div>
        )
    }

    const handle_failed_dialog_open = () => {
        setDisplayError(true)
    }
    
    const handle_failed_dialog_close = () => {
        setDisplayError(false)
    }

    const load_value = () => {
        Authentication.make_request('GET', EndPoints.backendEntriesPerPage(), "")
        .then(
            (response) => {
                console.log(response);
                setEntries(response.data);
            })
        .catch(
            (error: AxiosError) => {
                console.log(error);
                setErrorMessage(error.response?.data as string)
                setDisplayError(true)
            }
        );
    }

    const change_entries_request = (new_value: number) => {       
        Authentication.make_request('POST', EndPoints.backendEntriesPerPage() + "/" + new_value, "")
        .then(
            (response) => {
                setEntries(new_value)
                console.log(response);
            }
        )
        .catch(
            (error: AxiosError) => {
                console.log(error);
                setErrorMessage(error.response?.data as string)
                setDisplayError(true)
            }
        )
    }

    useEffect(() => {
        load_value();
    }, [])

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
            <Button onClick={() => {navigate_details(-1)}}>
                <KeyboardReturnIcon />
            </Button>
            <h3>Choose Entries Per Page value</h3>
            <TextField type="number" label="Value" variant="standard" defaultValue={entries} onChange={(event)=>{
                    change_entries_request(parseInt(event.target.value))
            }}/>
            <br></br>
            
            {failed_dialog_element}
        </React.Fragment>
    )
}