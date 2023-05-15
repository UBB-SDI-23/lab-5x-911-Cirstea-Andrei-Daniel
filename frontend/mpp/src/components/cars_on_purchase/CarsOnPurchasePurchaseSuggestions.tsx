import { Autocomplete, TextField } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { EndPoints } from "../../Endpoints";
import { Customer } from "../../models/Customer";
import { ServerSettings } from "../ServerIP";
import debounce from 'lodash.debounce';
import * as Authentication from '../../helpers/Authentication';
import { AxiosError } from "axios";
import { Suggestions } from "../CRUD/Suggestions";
import { Purchase } from "../../models/Purchase";
import { CarsOnPurchase } from "../../models/CarsOnPurchase";
import { CarModel } from "../../models/CarModel";

export const CarsOnPurchasePurchaseSuggestions = (props: any) => {
    const { element, setElement } = props;

    return <Suggestions element={element} setElement={setElement} table_endpoint={EndPoints.PURCHASE_TABLE} 
    render_function={(option: Purchase) => { return "Customer " + option.original_customer.firstName + " " + 
    option.original_customer.lastName + " at " + new Date(option.date).toLocaleString() }} description={"Purchase"}
     set_id={(element: CarsOnPurchase, id: number) => {
        element.purchase.id = id;
    }} />
}