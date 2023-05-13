import { TextField } from "@mui/material";
import React from "react";

export const CarModelForm = (props: any) => {
    const { element, setElement, initial_empty } = props;

    let form_result;
    if (initial_empty || element.id != -1) {
        console.log("Hey there")
        form_result = (
            <div>
                <TextField label="Model" variant="standard" defaultValue={element.model} onChange={(event)=>{
                    element.model = event.target.value;
                    setElement(element);
                }}/>
                <br></br>
                <TextField label="Manufacturer" variant="standard" defaultValue={element.manufacturer} onChange={(event)=>{
                    element.manufacturer = event.target.value;
                    setElement(element);
                }}/>
                <br></br>
                <TextField label="Manufacture Year" variant="standard" defaultValue={element.manufacture_year} onChange={(event)=>{
                            element.manufacture_year = parseInt(event.target.value);
                            setElement(element);
                        }}/>
                <br></br>
                <TextField type="number" label="Price" variant="standard" defaultValue={element.price} onChange={(event)=>{
                    element.price = parseInt(event.target.value)
                    setElement(element);
                }} />
                <br></br>
                <TextField type="number" label="Fuel Consumption" variant="standard" defaultValue={element.fuel_consumption} onChange={(event)=>{
                    element.fuel_consumption = parseInt(event.target.value)
                    setElement(element);
                }} />
            </div>
        );
    }
    else {
        form_result = <React.Fragment></React.Fragment>
    }

    return form_result;
}