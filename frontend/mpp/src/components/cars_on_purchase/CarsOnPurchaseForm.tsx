import { TextField } from "@mui/material";
import React from "react";
import { CarsOnPurchaseCarModelSuggestions } from "./CarsOnPurchaseCarModelSuggestions";
import { CarsOnPurchasePurchaseSuggestions } from "./CarsOnPurchasePurchaseSuggestions";

export const CarsOnPurchaseForm = (props: any) => {
    const { element, setElement, initial_empty } = props;

    let form_result;
    if (initial_empty || element.id != -1) {
        form_result = (
            <div>
                <CarsOnPurchaseCarModelSuggestions element={element} setElement={setElement} />
                <br></br>
                <TextField type="number" label="Count" variant="standard" defaultValue={element.count} onChange={(event)=>{
                    element.count = parseInt(event.target.value)
                    setElement(element)
                }}/>
                <br></br>
                <TextField type="number" label="Priority" variant="standard" defaultValue={element.priority} onChange={(event)=>{
                    element.priority = parseInt(event.target.value)
                    setElement(element)
                }} />
            </div>
        );
    }
    else {
        form_result = <React.Fragment></React.Fragment>
    }

    return form_result;
}