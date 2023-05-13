import { useEffect, useState } from "react"
import { CarModelDTOStatistic } from "../../models/DTO/CarModelDTOStatistic"
import { useNavigate, useParams } from "react-router-dom"
import React from "react"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { EndPoints } from "../../Endpoints"
import { ShowAllTable } from "../CRUD/ShowAllTable"
import { PurchaseTableColumns } from "./PurchaseTableColumns"

export const PurchaseFilter = () => {
    const [status, setStatus] = useState<string>("Completed")
    const navigate_details = useNavigate()
    let table_columns = PurchaseTableColumns()
    table_columns.pop()
    table_columns.shift()

    useEffect(() => {

    }, [status])

    return  (
        <React.Fragment>
            <h3>Purchases With Status {status}</h3>             
            <Button onClick={() => navigate_details(-1)}>
                <KeyboardReturnIcon />
            </Button>
            <br></br>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={"Completed"}
                    label="Status"
                    onChange={(event) => {setStatus(event.target.value);}}
                >
                    <MenuItem value={"Completed"}>Completed</MenuItem>
                    <MenuItem value={"Pending"}>Pending</MenuItem>
                    <MenuItem value={"Failed"}>Failed</MenuItem>
                </Select>
            </FormControl>

            <ShowAllTable table_endpoint={EndPoints.PURCHASE_TABLE} request_endpoint={EndPoints.FILTER + "/" + status} 
            update={()=>{}} has_actions={false} table_columns={table_columns} />
        </React.Fragment>
    )
}