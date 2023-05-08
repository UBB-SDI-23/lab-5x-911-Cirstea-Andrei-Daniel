import { Autocomplete, TextField } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { EndPoints } from "../../Endpoints";
import { Customer } from "../../models/Customer";
import { ServerSettings } from "../ServerIP";
import debounce from 'lodash.debounce';

export const PurchaseSuggestions = (props: any) => {
    const { element, setElement } = props;

    const [suggestions, setSuggestions] = useState<Customer[]>([])
    const fetch_suggestions = (query: string) => {
        const request_options = {
            method: 'GET'
        }

        const suggestion_endpoint = ServerSettings.API_ENDPOINT + EndPoints.CUSTOMER_TABLE + EndPoints.AUTOCOMPLETE_PATH + query
        fetch(suggestion_endpoint, request_options)
        .then((res) => res.json())
        .then((data) => { setSuggestions(data) })
    }

    const debouncedCallback = useMemo(
        () => debounce(fetch_suggestions, 300)
      , [])

      useEffect(() => {
        return () => {
            debouncedCallback.cancel();
        }
      }, [debouncedCallback])

    const handleInputChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason)

		if (reason === "input") {
			debouncedCallback(value)
		}
	}

    return <Autocomplete
                id="customer_id"
                options={suggestions}
                getOptionLabel={(option) => option.firstName + " " + option.lastName }
                renderInput={(params) => <TextField  {...params} label="Customer" variant="outlined" />}
                onInputChange={handleInputChange}
                onChange={(event, value) => {
                    if (value) {
                        console.log(value);
                        element.original_customer.id = value.id
                        setElement(element)
                    }
                }}
            />
}