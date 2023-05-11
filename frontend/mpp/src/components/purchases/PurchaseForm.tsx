import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { PurchaseSuggestions } from "./PurchaseSuggestions";

export const PurchaseForm = (props: any) => {
    const { element, setElement } = props;

    let form_result = (
        <div>
            <TextField fullWidth type="date" label="Date" variant="standard" InputLabelProps={{ shrink: true }} defaultValue={element.date.toString()} onChange={(event)=>{
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

    return form_result;

}