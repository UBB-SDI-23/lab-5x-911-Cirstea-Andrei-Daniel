import { ReactNode, useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel'
import { ServerSettings } from "../ServerIP"
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Pagination, PaginationItem, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { EndPoints } from '../../Endpoints';
import React from 'react';
import { DataGrid, GridActionsCellItem, GridColDef, GridPagination, GridRenderCellParams, GridRowParams, GridValueGetterParams, gridPageCountSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { ShowAllTable } from '../CRUD/ShowAllTable';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MuiPagination, { PaginationProps } from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import * as Authentication from '../../helpers/Authentication';
import { AxiosError } from 'axios';

export const ShowAll = (props: any) => {
  const navigate_details = useNavigate()


  const [elements, setElements] = useState<any>()
  const [current_page, setCurrentPage] = useState<number>(0)
  const [element_count, setElementCount] = useState<number>(0)
  const [page_count, setPageCount] = useState<number>(0)
  const [entries_per_page, setEntriesPerPage] = useState<number>(0)

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: entries_per_page,
});

  const [delete_id, set_delete_id] = useState(props.id)
  const [delete_dialog, set_delete_dialog] = useState(false)
  const [successful_dialog, set_successful_dialog] = useState(false)
  const [failed_dialog, set_failed_dialog] = useState(false)

  useEffect(() => {
    Authentication.make_request('GET', EndPoints.backendEntriesPerPage(), "")
    .then((data) => {
        console.log(data);
        let response_data = data.data;
        setEntriesPerPage(response_data);
        paginationModel.pageSize = response_data;
        console.log("GET ENTRIES")
        console.log(paginationModel)
        setPaginationModel(paginationModel);
    })
    .catch(
        (error: AxiosError) => {
            console.log(error);
        }
    );
  }, [])

  const update_elements = () => {
    console.log(paginationModel.pageSize);
    if (paginationModel.pageSize > 0) {
        Authentication.make_request('GET', ServerSettings.API_ENDPOINT + props.table_endpoint + EndPoints.PAGE_REQUEST_PATH + "?page=" +
        current_page + "&page_size=" + paginationModel.pageSize, "")
        .then((data) => { 
            let response_data = data.data; 
            setElements(response_data.content);
            setElementCount(response_data.totalElements);
            setPageCount(response_data.totalPages); 
            console.log(data) }
            )
            .catch(
                (error: AxiosError) => {
                    console.log(error);
                }
            );;
    }
  }

  const update_page =  (page: number) => {
    setCurrentPage(page)
  }

    useEffect(() => {
        update_elements()
    }, [current_page, paginationModel])

    let return_element = <Button onClick={() => navigate_details(-1)}>
        <KeyboardReturnIcon/>
    </Button>

    if (elements === undefined) {
        return ( 
            <React.Fragment>
                <Button onClick={() => navigate_details(props.table_endpoint + EndPoints.VIRTUAL_CREATE)}>
            <AddIcon />
        </Button>

                {return_element}
             <div>Waiting for reply</div>
             </React.Fragment>
        )
    }

    if (elements.length === 0) {
        return (
            <React.Fragment>
                {return_element}
                <div>No {props.description}</div>
            </React.Fragment> 
        )
    }
    

    let statistic_element;
    if (props.has_statistic) {
        statistic_element = <Button onClick={() => { navigate_details(props.table_endpoint + EndPoints.STATISTIC) }}>
            Statistic
        </Button>
    }

    let filter_element;
    if (props.has_filter) {
        filter_element = <Button onClick={() => {navigate_details(props.table_endpoint + EndPoints.FILTER)}}>
            Filter
        </Button>
    }


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
        Authentication.make_request(
            'DELETE',
            endpoint,
            ""
        )
        .then((res) => { 
            update_elements()
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
                {`Are you sure you want to delete this {props.description}?`}
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
            The {props.description} was removed successfully.
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
                    Internal error. Could not delete the {props.description}.
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

    const CustomPagination = (props: any) => {
        const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
            update_page(page - 1);
        };
      
        return (
          <Pagination
            count={page_count} 
            color="primary"
            onChange={handlePageChange}
            siblingCount={5}
            boundaryCount={5}
            {...props}
            page={current_page + 1}
          />
        );
      }
    
  const action_column : GridColDef = {
        field: 'id',
        headerName: 'Options',
        sortable: false,
        type: 'actions',
        width: 160,
        getActions: (params: GridRowParams) => {
            // If the user is a regular one and the entity does not belong to it then don't allow these columns
            const role = Authentication.getAuthRole().name;
            if (role == "ROLE_GUEST") {
                return [
                    <div>Insufficient rights</div>
                ]
            }

            if (role == "ROLE_REGULAR") {
                const logged_username = Authentication.getAuthUsername();
                if (logged_username != params.row.user.username) {
                    return [
                        <div>Insufficient rights</div>
                    ]
                }
            }

            return [
                <GridActionsCellItem icon={<EditIcon/>} onClick={ 
                    () => navigate_details(props.table_endpoint + "/" + params.id + EndPoints.VIRTUAL_UPDATE)
                } label="Edit" />,
                <GridActionsCellItem icon={<DeleteIcon/>} onClick={
                    () => main_delete_dialog_open(parseInt(params.id.valueOf().toString()))
                } label="Delete"/>,
            ]
        }
    }

    let columns = [...props.table_columns]
    if (true) {
        columns.push(action_column)
    }

    let data_grid = (
        <React.Fragment>
            <Box sx={{ height: 650, width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row.id}
                    rows={elements}
                    columns={columns}
                    rowCount={element_count}
                    paginationMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={(model, details) => {setPaginationModel(model); update_page(model.page)}}
                    pageSizeOptions={[10]}
                    autoHeight={true}
                    components={{ Pagination: CustomPagination }}
                />
            </Box>

            {delete_dialog_element}
            {failed_dialog_element}
            {successful_dialog_element}
        </React.Fragment>
    )

    let add_button;
    const role = Authentication.getAuthRole();
    if (role.name != "ROLE_GUEST") {
        add_button = <Button onClick={() => navigate_details(props.table_endpoint + EndPoints.VIRTUAL_CREATE)}>
            <AddIcon />
        </Button>
    }

    return (
        <React.Fragment>
    <div>
        {return_element}

        <h1>{props.description}</h1>
        <br></br>
        
        {add_button}
        {statistic_element}
        {filter_element}

        {data_grid}
    </div>
    </React.Fragment>
    )
}