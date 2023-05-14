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


export const UserAdminRegenerate = () => {
    const [display_error, setDisplayError] = useState<boolean>(false)
    const [error_message, setErrorMessage] = useState<string>("")
    const navigate_details = useNavigate()

    let role = Authentication.getAuthRole();
    if (role.name != "ROLE_ADMIN") {
        return (
            <div>Only admins can modify bulk delete and regenerate data</div>
        )
    }

    const handle_failed_dialog_open = () => {
        setDisplayError(true)
    }
    
    const handle_failed_dialog_close = () => {
        setDisplayError(false)
    }

    const entity_descriptions = [
        "Car Model",
        "Customer",
        "Purchase",
        "Distributor",
        "Shipment",
        "Car Order"
    ]
    const delete_scripts = [
        "delete_car_model.sql",
        "delete_customer.sql",
        "delete_purchase.sql",
        "delete_distributor.sql",
        "delete_shipment.sql",
        "delete_cars_on_purchase.sql"
    ]
    const insert_scripts = [
        "insert_car_model.sql",
        "insert_customer.sql",
        "insert_purchase.sql",
        "insert_distributor.sql",
        "insert_shipment.sql",
        "insert_cars_on_purchase.sql"
    ]

    const execute_sql = (script_name: string) => {
        Authentication.make_request('POST', EndPoints.backendExecuteSql(script_name), "")
        .then(
            (response) => {
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

    const DeleteButton = (props: any)  => (
        <Button onClick={() => execute_sql(delete_scripts[props.index])}>
          {entity_descriptions[props.index]}
        </Button>
      );

    const RegenerateButton = (props: any) => (
        <Button onClick={() => execute_sql(insert_scripts[props.index])}>
            {entity_descriptions[props.index]}
        </Button>
    )

    return (
        <React.Fragment>
            <Button onClick={() => {navigate_details(-1)}}>
                <KeyboardReturnIcon />
            </Button>
            <br></br>

            <h3>Delete Data From</h3>
            {delete_scripts.map((script, index) => (
                <React.Fragment>
                    <DeleteButton index={index} key={index} />
                    <br></br>
                </React.Fragment>
            ))}
            <br></br>
            <h3>Regenerate Data For</h3>
            {insert_scripts.map((script, index) => (
                <React.Fragment>
                    <RegenerateButton index={index} key={index} />
                    <br></br>
                </React.Fragment>
            ))}
            
            
            {failed_dialog_element}
        </React.Fragment>
    )
}