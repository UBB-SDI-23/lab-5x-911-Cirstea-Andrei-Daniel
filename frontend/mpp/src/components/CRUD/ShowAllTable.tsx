import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { ServerSettings } from '../ServerIP';
import { EndPoints } from '../../Endpoints';

export const ShowAllTable = (props: any) => {
    const [delete_id, set_delete_id] = useState(props.id)
    const [delete_dialog, set_delete_dialog] = useState(false)
    const [successful_dialog, set_successful_dialog] = useState(false)
    const [failed_dialog, set_failed_dialog] = useState(false)
    const navigate_details = useNavigate()

    const handle_delete_dialog_open = () => {
        set_delete_dialog(true)
    }
    
    const handle_delete_dialog_close = () => {
        set_delete_dialog(false)
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

    const handle_delete_dialog_confirm = () => {
        const endpoint = ServerSettings.API_ENDPOINT + props.table_endpoint + "/" + delete_id
    
        handle_delete_dialog_close()
        fetch(
            endpoint,
            {
                method: "DELETE"
            }
        )
        .then((res) => { 
            props.update(); 
            handle_successful_dialog_open() })
        .catch((exception) => { handle_failed_dialog_open() })
    }

    const main_delete_dialog_open = (id: number) => {
        set_delete_id(id)
        handle_delete_dialog_open()
    }

    let delete_dialog_element = null;
    if (delete_dialog) {
        delete_dialog_element = <div>
            <Dialog
            open={delete_dialog}
            onClose={handle_delete_dialog_close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this Customer?"}
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

    let successful_dialog_element;
    if (successful_dialog) {
        successful_dialog_element = <div>
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

    let failed_dialog_element;
    if (failed_dialog) {
        failed_dialog_element = <div>
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
    
  const action_column : GridColDef = {
        field: 'id',
        headerName: 'Options',
        sortable: false,
        type: 'actions',
        getActions: (params: GridRowParams) => [
            <GridActionsCellItem icon={<EditIcon/>} onClick={ 
                () => navigate_details(props.table_endpoint + "/" + params.id + EndPoints.VIRTUAL_UPDATE)
            } label="Edit" />,
            <GridActionsCellItem icon={<DeleteIcon/>} onClick={
                () => main_delete_dialog_open(parseInt(params.id.valueOf().toString()))
            } label="Delete"/>,
        ]
    }

    let columns = [...props.table_columns]
    if (props.has_actions) {
        columns.push(action_column)
    }

    return (
        <React.Fragment>
            <Box sx={{ height: 650, width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row.id}
                    rows={props.data}
                    columns={columns}
                    initialState={{
                        pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                        },
                    }}
                    pageSizeOptions={[10]}
                    autoHeight={true}
                />
            </Box>

            {delete_dialog_element}
            {failed_dialog_element}
            {successful_dialog_element}
        </React.Fragment>
    )

}