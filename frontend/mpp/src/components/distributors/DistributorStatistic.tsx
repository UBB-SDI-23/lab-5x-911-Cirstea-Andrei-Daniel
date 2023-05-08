import { useEffect, useState } from "react"
import { CarModelDTOStatistic } from "../../models/DTO/CarModelDTOStatistic"
import { useNavigate, useParams } from "react-router-dom"
import React from "react"
import { Button, TextField } from "@mui/material"
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { EndPoints } from "../../Endpoints"
import { ServerSettings } from "../ServerIP"
import { ShowAllTable } from "../CRUD/ShowAllTable"
import { DistributorTableColumns } from "./DistributorTableColumns"
import { DistributorStatisticDTO } from "../../models/DTO/DistributorStatisticDTO"
import { GridColDef } from "@mui/x-data-grid"

export const DistributorStatistic = () => {
    const navigate_details = useNavigate()
    let table_columns = DistributorTableColumns()
    table_columns.pop()

    let averagePriceColumn : GridColDef = {
        field: 'averageShipmentPrice', headerName: 'Average Shipment Price', type: 'number', width: 160
    }
    table_columns.push(averagePriceColumn)
    table_columns.shift()

    return  (
        <React.Fragment>
            <h3>Distributors Sorted in Descending Order by Average Shipment Price</h3>             
            <Button onClick={() => navigate_details(-1)}>
                <KeyboardReturnIcon />
            </Button>
            

            <ShowAllTable table_endpoint={EndPoints.DISTRIBUTOR_TABLE} request_endpoint={EndPoints.STATISTIC} update={()=>{}} has_actions={false} table_columns={table_columns} />
        </React.Fragment>
    )
}