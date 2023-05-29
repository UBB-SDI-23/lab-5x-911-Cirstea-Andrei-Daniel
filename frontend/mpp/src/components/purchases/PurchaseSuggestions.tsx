import { Autocomplete, TextField } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { EndPoints } from "../../Endpoints";
import { Customer } from "../../models/Customer";
import { ServerSettings } from "../ServerIP";
import debounce from 'lodash.debounce';
import * as Authentication from '../../helpers/Authentication';
import { AxiosError } from "axios";
import { Suggestions } from "../CRUD/Suggestions";
import { Purchase } from "../../models/Purchase";

export const PurchaseSuggestions = (props: any) => {
    const { element, setElement } = props;

    // const [suggestions, setSuggestions] = useState<Customer[]>([])
    // const fetch_suggestions = (query: string) => {
    //     const suggestion_endpoint = ServerSettings.API_ENDPOINT + EndPoints.CUSTOMER_TABLE + EndPoints.AUTOCOMPLETE_PATH + query
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
    //             id="customer_id"
    //             options={suggestions}
    //             getOptionLabel={(option) => option.firstName + " " + option.lastName }
    //             renderInput={(params) => <TextField  {...params} label="Customer" variant="outlined" />}
    //             onInputChange={handleInputChange}
    //             onChange={(event, value) => {
    //                 if (value) {
    //                     console.log(value);
    //                     element.original_customer.id = value.id
    //                     setElement(element)
    //                 }
    //             }}
    //         />

    //const { element, setElement, table_endpoint, render_function, description, set_id } = props;

    return <Suggestions element={element} setElement={setElement} table_endpoint={EndPoints.CUSTOMER_TABLE} 
    render_function={(option: Customer) => { return option.firstName + " " + option.lastName }} description={"Customer"} 
    set_value={(element: Purchase, customer: Customer) => {
        element.original_customer = customer;
    }} set_rerender={()=>{}} />
}