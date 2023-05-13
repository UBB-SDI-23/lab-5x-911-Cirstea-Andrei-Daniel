import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import * as Authentication from '../../helpers/Authentication';
import { LoginRequest } from '../../models/LoginRequest';
import { AxiosError, AxiosStatic } from 'axios';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { User } from '../../models/User';
import { DataGrid, GridColDef, GridEditCellProps  } from '@mui/x-data-grid';
import { table } from 'console';


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

    function formatRole(role: string): string {
        const formattedRole = role.replace(/^ROLE_/, ''); // remove prefix "ROLE_"
        return formattedRole.charAt(0).toUpperCase() + formattedRole.slice(1).toLowerCase(); // capitalize first letter and convert rest to lowercase
    }

    let table_columns: GridColDef[] = [
        { field: 'username', headerName: 'Username', width: 130 },
        { field: 'role', headerName: 'Role', width: 150, editable:true,
            renderCell: (params) => {
                return formatRole(params.value)
            },
            renderEditCell: (params: GridEditCellProps) => (
                <TextField
                  select
                  value={params.value}
                  onChange={(event) => {
                    params.setCellProps({ value: event.target.value });
                  }}
                >
                  <MenuItem value="ROLE_REGULAR">Regular</MenuItem>
                  <MenuItem value="ROLE_MODERATOR">Moderator</MenuItem>
                  <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                </TextField>
              )
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

    return (
        <React.Fragment>
            <Button onClick={() => {navigate_details(-1)}}>
                <KeyboardReturnIcon />
            </Button>
            <React.Fragment>
                <Box sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row.id}
                        rows={users}
                        columns={table_columns}
                        rowCount={users.length}
                        paginationMode="server"
                        //paginationModel={paginationModel}
                        //onPaginationModelChange={(model, details) => {setPaginationModel(model); update_page(model.page)}}
                        pageSizeOptions={[10]}
                        autoHeight={true}
                        //components={{ Pagination: CustomPagination }}
                    />
                </Box>
            </React.Fragment>
            
            {failed_dialog_element}
        </React.Fragment>
    )
}