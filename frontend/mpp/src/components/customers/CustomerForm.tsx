import { TextField } from "@mui/material";

export const CustomerForm = (props: any) => {
    const {element, setElement} = props;
    let form_result = (
        <div>
            <TextField label="First Name" variant="standard" defaultValue={element.firstName} onChange={(event)=>{
                element.firstName = event.target.value
                setElement(element)
            }}/>
            <br></br>
            <TextField label="Last Name" variant="standard" defaultValue={element.lastName} onChange={(event)=>{
                element.lastName = event.target.value
                setElement(element)
            }}/>
            <br></br>
            <TextField label="Phone Number" variant="standard" defaultValue={element.telephone_number} onChange={(event)=>{
                element.telephone_number = event.target.value
                setElement(element)
            }}/>
            <br></br>
            <TextField label="Email" variant="standard" defaultValue={element.email_address} onChange={(event)=>{
                element.email_address = event.target.value
                setElement(element)
            }} />
            <br></br>
            <TextField label="Priority" variant="standard" defaultValue={element.priority} onChange={(event)=>{
                element.priority = event.target.value
                setElement(element)
            }} />
        </div>
    );
    return form_result;
}