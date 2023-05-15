import { Autocomplete, TextField } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { EndPoints } from "../../Endpoints";
import { Customer } from "../../models/Customer";
import { ServerSettings } from "../ServerIP";
import debounce from 'lodash.debounce';
import * as Authentication from '../../helpers/Authentication';
import { AxiosError } from "axios";

export const Suggestions = (props: any) => {
    const { element, setElement, table_endpoint, render_function, description, set_id } = props;

    const [suggestions, setSuggestions] = useState<any[]>([])
    const fetch_suggestions = (query: string) => {
        const suggestion_endpoint = ServerSettings.API_ENDPOINT + table_endpoint + EndPoints.AUTOCOMPLETE_PATH + query
        Authentication.make_request('GET', suggestion_endpoint, "")
        .then((data) => { let response_data = data.data; setSuggestions(response_data) })
        .catch(
            (error: AxiosError) => {
                console.log(error);
            }
        );
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
                options={suggestions}
                getOptionLabel={render_function}
                renderInput={(params) => <TextField  {...params} label={description} variant="outlined" />}
                onInputChange={handleInputChange}
                onChange={(event, value) => {
                    if (value) {
                        console.log(value);
                        set_id(element, value.id);
                        setElement(element)
                    }
                }}
            />
}