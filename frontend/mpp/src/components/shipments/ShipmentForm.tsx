import { TextField } from "@mui/material";
import React from "react";
import { DateToTextFieldInput } from "../../helpers/Helpers";
import { ShipmentSuggestions } from "./ShipmentSuggestions";

export const ShipmentForm = (props: any) => {
    const { element, setElement, initial_empty } = props;

    let form_result;
    if (initial_empty || element.id != -1) {
        let expected_date = new Date(element.expectedArrival)
        let expected_formattedDate = DateToTextFieldInput(expected_date)

        let arrival_date = new Date(element.arrival)
        let arrival_formattedDate = DateToTextFieldInput(arrival_date)

        form_result = (
            <React.Fragment>
                <TextField type="date" label="Expected Arrival" variant="standard"  InputLabelProps={{ shrink: true }} defaultValue={expected_formattedDate} onChange={(event)=>{
                    element.expectedArrival = new Date(Date.parse(event.target.value))
                    setElement(element)
                }}/>
                <br></br>
                <TextField type="date" label="Arrival" variant="standard" InputLabelProps={{ shrink: true }} defaultValue={arrival_formattedDate} onChange={(event)=>{
                    element.arrival = new Date(Date.parse(event.target.value))
                    setElement(element)
                }}/>
                <br></br>
                <TextField type="number" label="Total Price" variant="standard" defaultValue={element.totalPrice} onChange={(event)=>{
                    element.totalPrice = parseInt(event.target.value)
                    setElement(element)
                }}/>
                <br></br>   
                <ShipmentSuggestions element={element} setElement={setElement} />
                <br></br>
            </React.Fragment>
        );
    }
    else {
        form_result = <React.Fragment></React.Fragment>
    }

    return form_result;
}