import { TextField } from "@mui/material";

export const CarsOnPurchaseForm = (props: any) => {
    const { element, setElement } = props;

    let form_result = (
        <div>
            {/* <TextField label="Car Model" variant="standard" defaultValue={element.carModel} onChange={(event)=>{
                element.carModel = event.target.value
                setElement(element)
            }}/>
            <br></br>
            <TextField label="Purchase" variant="standard" defaultValue={element.purchase} onChange={(event)=>{
                element.lastName = event.target.value
                setElement(element)
            }}/> */}
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
    return form_result;
}