import { TextField } from "@mui/material";

export const ShipmentForm = (props: any) => {
    const { element, setElement } = props;

    let form_result = (
        <div>
            <TextField type="date" label="Expected Arrival" variant="standard" defaultValue={element.expectedArrival} onChange={(event)=>{
                element.expectedArrival = new Date(Date.parse(event.target.value))
                setElement(element)
            }}/>
            <br></br>
            <TextField type="date" label="Arrival" variant="standard" defaultValue={element.arrival} onChange={(event)=>{
                element.arrival = new Date(Date.parse(event.target.value))
                setElement(element)
            }}/>
            <br></br>
            <TextField type="number" label="Total Price" variant="standard" defaultValue={element.totalPrice} onChange={(event)=>{
                element.totalPrice = parseInt(event.target.value)
                setElement(element)
            }}/>
            <br></br>
            
        </div>
    );

    return form_result;
}