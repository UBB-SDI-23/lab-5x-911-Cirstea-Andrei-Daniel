import { Autocomplete, TextField } from "@mui/material";
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

export const ShipmentSuggestions = (props: any) => {
    const { element, setElement } = props;

    // const [suggestions, setSuggestions] = useState<Distributor[]>([])
    // const fetch_suggestions = (query: string) => {
    //     const suggestion_endpoint = ServerSettings.API_ENDPOINT + EndPoints.DISTRIBUTOR_TABLE + EndPoints.AUTOCOMPLETE_PATH + query
    //     Authentication.make_request('GET', suggestion_endpoint, "")
    //     .then((data) => { let response_data = data.data; setSuggestions(response_data) })
    //     .catch(
    //         (error: AxiosError) => {
    //             console.log(error);
    //         }
    //     );
    // }

    // const debouncedCallback = useMemo(
    //     () => debounce(fetch_suggestions, 300)
    //   , [])

    //   useEffect(() => {
    //     return () => {
    //         debouncedCallback.cancel();
    //     }
    //   }, [debouncedCallback])

    // const handleInputChange = (event: any, value: any, reason: any) => {
	// 	console.log("input", value, reason)

	// 	if (reason === "input") {
	// 		debouncedCallback(value)
	// 	}
	// }

    // return <Autocomplete
    //             options={suggestions}
    //             getOptionLabel={(option) => option.name + " from " + option.country }
    //             renderInput={(params) => <TextField  {...params} label="Distributor" variant="outlined" />}
    //             onInputChange={handleInputChange}
    //             onChange={(event, value) => {
    //                 if (value) {
    //                     console.log(value);
    //                     element.original_customer.id = value.id
    //                     setElement(element)
    //                 }
    //             }}
    //         />

    return <Suggestions element={element} setElement={setElement} table_endpoint={EndPoints.DISTRIBUTOR_TABLE} 
    render_function={(option: Distributor) => { return option.name + " from " + option.country }} description={"Distributor"} 
    set_value={(element: Shipment, distributor: Distributor) => {
        element.parent_distributor = distributor;
        Authentication.make_request(
            'GET',
            EndPoints.backendAIServiceRequest(distributor.country),
            ""
        )
        .then((data) =>{
            let response_data = data.data;
            let new_date = element.expectedArrival;
            new_date.setHours(new_date.getHours() + parseInt(response_data));
            console.log(new_date)
            console.log(parseInt(response_data))
            setElement({...element, expectedArrival: new_date})
        })
        .catch((error: AxiosError) => {
            console.log(error);
        })
    }} />
}