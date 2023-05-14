import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
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
    const [display_message, setDisplayMessage] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const [delete_buttons_enable, set_delete_buttons_enable] = useState<boolean[]>([true, true, true, true, true, true])
    const [insert_buttons_enable, set_insert_buttons_enable] = useState<boolean[]>([true, true, true, true, true, true])
    const navigate_details = useNavigate()

    let role = Authentication.getAuthRole();
    if (role.name != "ROLE_ADMIN") {
        return (
            <div>Only admins can modify bulk delete and regenerate data</div>
        )
    }

    useEffect(() => {

    }, [delete_buttons_enable, insert_buttons_enable])

    const handle_dialog_open = () => {
        setDisplayMessage(true)
    }
    
    const handle_dialog_close = () => {
        setDisplayMessage(false)
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

    const execute_sql = (status_array: boolean[], script_names: string[], index: number, set_function: any) => {
        status_array[index] = false
        set_function(status_array)
        Authentication.make_request('POST', EndPoints.backendExecuteSql(script_names[index]), "")
        .then(
            (response) => {
                console.log(response);
                setMessage(response.data);
                setDisplayMessage(true)

                status_array[index] = true
                set_function(status_array)
            }
        )
        .catch(
            (error: AxiosError) => {
                console.log(error);
                setMessage(error.response?.data as string)
                setDisplayMessage(true)

                status_array[index] = true
                set_function(status_array)
            }
        )
    }

    let failed_dialog_element;
    if (display_message) {
        failed_dialog_element = <div>
            <Dialog
            open={display_message}
            onClose={handle_dialog_open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {"Message"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handle_dialog_close} autoFocus>
                    OK
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    }

    const DeleteButton = (props: any)  => (
        <Button disabled={!delete_buttons_enable[props.index]} onClick={() =>
             execute_sql(delete_buttons_enable, delete_scripts, props.index, set_delete_buttons_enable)}>
          {entity_descriptions[props.index]}
        </Button>
      );

    const RegenerateButton = (props: any) => (
        <Button disabled={!insert_buttons_enable[props.index]} onClick={() => 
            execute_sql(insert_buttons_enable, insert_scripts, props.index, set_insert_buttons_enable)}>
            {entity_descriptions[props.index]}
        </Button>
    )

    return (
        <React.Fragment>
            <Button onClick={() => {navigate_details(-1)}}>
                <KeyboardReturnIcon />
            </Button>
            <br></br>

            <Snackbar
                open={display_message}
                autoHideDuration={6000}
                onClose={handle_dialog_close}
                message="This is a toast message!"
            />

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
            
            
            {/* {failed_dialog_element} */}
        </React.Fragment>
    )
}