import { Autocomplete, CircularProgress, Snackbar, TextField } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { EndPoints } from "../../Endpoints";
import { Customer } from "../../models/Customer";
import { ServerSettings } from "../ServerIP";
import debounce from 'lodash.debounce';
import * as Authentication from '../../helpers/Authentication';
import { AxiosError } from "axios";
import { Distributor } from "../../models/Distributor";
import { Suggestions } from "../CRUD/Suggestions";
import { Shipment } from "../../models/Shipment";
import MuiAlert from '@mui/material/Alert';
import React from "react";

export const ShipmentSuggestions = (props: any) => {
    const { element, setElement } = props;
    const [snackbar_open, setSnackbarOpen] = useState<boolean>()

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
      };
    
      const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      };

    let snackbar_element = <Snackbar
        open={snackbar_open}
            onClose={handleSnackbarClose}
            message="Estimating arrival time"
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
        >
        <MuiAlert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
            Estimating arrival time
        </MuiAlert>
    </Snackbar>

    return <React.Fragment>
        <Suggestions element={element} setElement={setElement} table_endpoint={EndPoints.DISTRIBUTOR_TABLE} 
        render_function={(option: Distributor) => { return option.name + " from " + option.country }} description={"Distributor"} 
        set_value={(element: Shipment, distributor: Distributor) => {
            element.parent_distributor = distributor;
            handleSnackbarOpen()
            Authentication.make_request(
                'GET',
                EndPoints.backendAIServiceRequest(distributor.country),
                ""
            )
            .then((data) =>{
                let response_data = data.data;
                let new_date = new Date();
                new_date.setHours(new_date.getHours() + parseInt(response_data));
                console.log(new_date)
                console.log(parseInt(response_data))
                setElement({...element, expectedArrival: new_date})
                handleSnackbarClose()
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
        }} />

        {snackbar_element}
    </React.Fragment>
}