import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import * as Authentication from '../../helpers/Authentication';
import { LoginRequest } from '../../models/LoginRequest';
import { AxiosError, AxiosStatic } from 'axios';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { User } from '../../models/User';
import { DataGrid, GridColDef, GridEditCellProps, GridRenderEditCellParams  } from '@mui/x-data-grid';
import { table } from 'console';
import { ShowAllTable } from '../CRUD/ShowAllTable';
import { UserRole } from '../../models/UserRole';


export const UserChangeRole = () => {
    const [users, setUsers] = useState<User[]>([])
    const [display_error, setDisplayError] = useState<boolean>(false)
    const [error_message, setErrorMessage] = useState<string>("")
    const navigate_details = useNavigate()

    let role = Authentication.getAuthRole();
    if (role.name != "ROLE_ADMIN") {
        return (
            <div>Only admins can modify user roles</div>
        )
    }

    const handle_failed_dialog_open = () => {
        setDisplayError(true)
    }
    
    const handle_failed_dialog_close = () => {
        setDisplayError(false)
    }

    const load_users = () => {
        Authentication.make_request('GET', EndPoints.backendGetUsers(), "")
        .then(
            (response) => {
                console.log(response);
                setUsers(response.data);
            })
        .catch(
            (error: AxiosError) => {
                console.log(error);
                setErrorMessage(error.response?.data as string)
                setDisplayError(true)
            }
        );
    }

    const send_change_role_request = (user_id: string, new_role: string) => {
        Authentication.make_request('POST', EndPoints.backendUserChangeRole(user_id, new_role), "")
        .then(
            (response) => {
                console.log(response);
                load_users();
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
        load_users();
    }, [])

    let table_columns: GridColDef[] = [
        { field: 'username', headerName: 'Username', width: 130 },
        { field: 'role', headerName: 'Role', width: 150, editable:true,
            renderCell: (params) => {
                //console.log(params.value);
                return Authentication.getRoleParsed(params.value)
            },
            renderEditCell: (params: GridRenderEditCellParams) => {
                return (
                <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={params.value.name}
                        label="Role"
                        onChange={(event) => {
                            send_change_role_request(params.id.toString(), event.target.value);
                            console.log(params.id);
                            console.log(params.field),
                            console.log(event.target.value)
                            let old_id = params.value.id
                            let new_user_role = new UserRole();
                            new_user_role.id = old_id
                            new_user_role.name = event.target.value
                            params.api.setEditCellValue({
                                id: params.id,
                                field: params.field,
                                value: new_user_role
                            });}}
                    >
                        <MenuItem value="ROLE_REGULAR">Regular</MenuItem>
                    <MenuItem value="ROLE_MODERATOR">Moderator</MenuItem>
                    <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                    </Select>
                </FormControl>
              )
             }
        }
      ];

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

    let table = <ShowAllTable table_endpoint={EndPoints.USER_TABLE} request_endpoint={EndPoints.PAGE_REQUEST_PATH} update={()=>{}}
     description={"User"} has_actions={false} table_columns={table_columns}/>

    return (
        <React.Fragment>
            <Button onClick={() => {navigate_details(-1)}}>
                <KeyboardReturnIcon />
            </Button>
            {table}
            
            {failed_dialog_element}
        </React.Fragment>
    )
}