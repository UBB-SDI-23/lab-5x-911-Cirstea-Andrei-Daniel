import { useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel'
import { ServerSettings } from "../ServerIP"
import { useNavigate } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { EndPoints } from '../../Endpoints';
import React from 'react';

export const CarModelShowAll = () => {
  const [carModels, setCarModels] = useState<CarModel[]>()
  const [delete_id, set_delete_id] = useState(0)
  const [delete_dialog, set_delete_dialog] = useState(false)
  const [successful_dialog, set_successful_dialog] = useState(false)
  const [failed_dialog, set_failed_dialog] = useState(false)
  const navigate_details = useNavigate()

    const update_car_models = () => {
        fetch(
            ServerSettings.API_ENDPOINT + EndPoints.CAR_TABLE
        )
        .then((res) => res.json())
        .then((data) => setCarModels(data))
    }

    useEffect(() => {
        update_car_models()
    }, [])

    const handle_delete_dialog_open = () => {
        set_delete_dialog(true)
    }

    const handle_delete_dialog_close = () => {
        set_delete_dialog(false)
    }

    const handle_delete_dialog_confirm = () => {
        const endpoint = ServerSettings.API_ENDPOINT + EndPoints.CAR_TABLE + "/" + delete_id

        handle_delete_dialog_close()
        fetch(
            endpoint,
            {
                method: "DELETE"
            }
        )
        .then((res) => { update_car_models(); handle_successful_dialog_open() })
        .catch((exception) => { handle_failed_dialog_open() })
    }

    const handle_successful_dialog_open = () =>  {
        set_successful_dialog(true)
    }

    const handle_sucesssful_dialog_close = () => {
        set_successful_dialog(false)
    }

    const handle_failed_dialog_open = () => {
        set_failed_dialog(true)
    }

    const handle_failed_dialog_close = () => {
        set_failed_dialog(false)
    }

    const main_delete_dialog_open = (id: number) => {
        set_delete_id(id)
        handle_delete_dialog_open()
    }

    if (carModels === undefined || carModels.length === 0) {
        return <div>No Car Models</div> 
    }

    let delete_dialog_string = null;
    if (delete_dialog) {
        delete_dialog_string = <div>
            <Dialog
            open={delete_dialog}
            onClose={handle_delete_dialog_close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this Car Model?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                This action is not reversible.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handle_delete_dialog_close}>Disagree</Button>
                <Button onClick={handle_delete_dialog_confirm} autoFocus>
                Agree
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    }

    let successful_dialog_string;
    if (successful_dialog) {
        successful_dialog_string = <div>
        <Dialog
        open={successful_dialog}
        onClose={handle_successful_dialog_open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
            {"Success"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            The Car Model was removed successfully.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handle_sucesssful_dialog_close} autoFocus>
                OK
            </Button>
        </DialogActions>
        </Dialog>
    </div>
    }

    let failed_dialog_string;
    if (failed_dialog) {
        failed_dialog_string = <div>
            <Dialog
            open={failed_dialog}
            onClose={handle_failed_dialog_open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {"Failure"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Internal error. Could not delete the Car Model.
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
    <div>
        <h1>Car Models</h1>
        <br></br>
        <Button onClick={() => navigate_details(EndPoints.CAR_TABLE + EndPoints.VIRTUAL_CREATE)}>
            <AddIcon />
        </Button>
        <table>
            <tr>
                <th>#</th>
                <th>Model</th>
                <th>Manufacturer</th>
                <th>Price</th>
                <th>Fuel Consumption</th>
                <th>Actions</th>
            </tr>
            {
                carModels?.map(
                    (carModel: CarModel, index: number) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td> 
                                <Button onClick={() => navigate_details(EndPoints.CAR_TABLE + "/" + carModel.id)}>
                                    {carModel.model}
                                </Button>
                            </td>
                            <td>{carModel.manufacturer}</td>
                            <td>{carModel.price}</td>
                            <td>{carModel.fuel_consumption}</td>
                            <td>
                                
                                <Button onClick={() => navigate_details(EndPoints.CAR_TABLE + "/" + carModel.id + EndPoints.VIRTUAL_UPDATE)}>
                                    <EditIcon />
                                </Button>
                                <Button onClick={() => main_delete_dialog_open(carModel.id)}>
                                    <DeleteIcon />
                                </Button>
                            </td>
                        </tr>
                    )                  
                )
            }
        </table>
    </div>

    {delete_dialog_string}
    {failed_dialog_string}
    {successful_dialog_string}
    </React.Fragment>
    )
}