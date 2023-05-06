import { useEffect, useState } from "react"
import { CarModelDTOStatistic } from "../../models/DTO/CarModelDTOStatistic"
import { useNavigate, useParams } from "react-router-dom"
import React from "react"
import { Button, TextField } from "@mui/material"
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { EndPoints } from "../../Endpoints"
import { ServerSettings } from "../ServerIP"
import { ShowAllTable } from "../CRUD/ShowAllTable"
import { CarModelTableColumns } from "./CarModelTableColumns"

export const CarModelStatistic = () => {
    const [carModels, setCarModels] = useState<CarModelDTOStatistic[]>()
    const [count, setCount] = useState<number>(-1);
    const navigate_details = useNavigate()

    const update_models = () => {
        fetch(
            ServerSettings.API_ENDPOINT + EndPoints.CAR_TABLE + EndPoints.STATISTIC
        )
        .then((res) => res.json())
        .then((data) => { setCarModels(data); console.log(data); console.log(count) })
    }

    useEffect(() => {
        update_models()
    }, [count])

    let table;
    if (count >= 0) {
        if (carModels != undefined) {
            let table_columns = CarModelTableColumns() 
            table = <ShowAllTable data={carModels} update={()=>{}} has_actions={false} table_columns={table_columns} />
        }
    }

    return  (
        <React.Fragment>
            <h3>Car Models Sorted By Price Which Were Bought More Than {count} Times</h3>             
            <Button onClick={() => navigate_details(-1)}>
                <KeyboardReturnIcon />
            </Button>
            <TextField label="Total Order Count" variant="standard" defaultValue={-1} onChange={(event)=>{
                    let new_count = parseInt(event.target.value)
                    if (new_count >= 0) {
                        setCount(new_count)
                    }
             }}>
            </TextField>

            {table}
        </React.Fragment>
    )
}