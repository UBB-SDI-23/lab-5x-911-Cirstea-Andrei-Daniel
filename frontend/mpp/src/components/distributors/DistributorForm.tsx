import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React from "react";
import { DateToTextFieldInput } from "../../helpers/Helpers";

export const DistributorForm = (props: any) => {
    const { element, setElement, initial_empty } = props;

    let form_result;
    if (initial_empty || element.id != -1) {
        let date = new Date(element.cooperationStartDate)
        let formattedDate = DateToTextFieldInput(date)
        form_result = (
            <div>
                <TextField label="Name" variant="standard" defaultValue={element.name} onChange={(event)=>{
                    element.name = event.target.value
                    setElement(element)
                }}/>
                <br></br>
                <TextField type="date" InputLabelProps={{ shrink: true }} label="Cooperation Start Date" variant="standard" defaultValue={formattedDate} onChange={(event)=>{
                    element.cooperationStartDate = new Date(Date.parse(event.target.value))
                    setElement(element)
                }}/>
                <br></br>
                <TextField label="Country" variant="standard" defaultValue={element.country} onChange={(event)=>{
                    element.country = event.target.value
                    setElement(element)
                }}/>
                <br></br>
                <TextField label="Contact Email" variant="standard" defaultValue={element.contactEmail} onChange={(event)=>{
                    element.contactEmail = event.target.value
                    setElement(element)
                }}/>
                <br></br>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={element.category}
                        label="Category"
                        onChange={(event) => {element.category = event.target.value; setElement(element);}}
                    >
                        <MenuItem value={"NewCars"}>NewCars</MenuItem>
                        <MenuItem value={"OldCars"}>OldCars</MenuItem>
                        <MenuItem value={"RenovatedCars"}>RenovatedCars</MenuItem>
                    </Select>
                </FormControl>
    
            </div>
        );
    }
    else {
        form_result = <React.Fragment></React.Fragment>
    }

    return form_result;

}