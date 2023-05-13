import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { PurchaseSuggestions } from "./PurchaseSuggestions";
import React from "react";
import { DateToTextFieldInput } from "../../helpers/Helpers";

export const PurchaseForm = (props: any) => {
    const { element, setElement, initial_empty } = props;

    let form_result;
    if (initial_empty || element.id != -1) {
        let date = new Date(element.date)
        let formattedDate = DateToTextFieldInput(date)
        form_result = (
            <div>
                <TextField fullWidth type="date" label="Date" variant="standard" InputLabelProps={{ shrink: true }} defaultValue={formattedDate} onChange={(event)=>{
                    element.date = new Date(Date.parse(event.target.value))
                    setElement(element)
                }}/>
                <br></br>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Pay Method</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={element.payMethod}
                        label="Status"
                        onChange={(event) => {element.payMethod = event.target.value; setElement(element);}}
                    >
                        <MenuItem value={"CreditCard"}>CreditCard</MenuItem>
                        <MenuItem value={"PayPal"}>PayPal</MenuItem>
                        <MenuItem value={"Cash"}>Cash</MenuItem>
                        <MenuItem value={"DebitCard"}>DebitCard</MenuItem>
                        <MenuItem value={"BankTransfer"}>BankTransfer</MenuItem>
                    </Select>
                </FormControl>
                <br></br>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={element.status}
                        label="Status"
                        onChange={(event) => {element.status = event.target.value; setElement(element);}}
                    >
                        <MenuItem value={"Completed"}>Completed</MenuItem>
                        <MenuItem value={"Pending"}>Pending</MenuItem>
                        <MenuItem value={"Failed"}>Failed</MenuItem>
                    </Select>
                </FormControl>
                <br></br>
                <PurchaseSuggestions element={element} setElement={setElement} ></PurchaseSuggestions>
    
            </div>
        );
    }
    else {
        form_result = <React.Fragment></React.Fragment>
    }

    return form_result;

}