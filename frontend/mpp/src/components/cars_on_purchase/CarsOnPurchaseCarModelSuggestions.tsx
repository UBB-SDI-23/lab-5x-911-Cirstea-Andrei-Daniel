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

export const CarsOnPurchaseCarModelSuggestions = (props: any) => {
    const { element, setElement } = props;

    return <Suggestions element={element} setElement={setElement} table_endpoint={EndPoints.CAR_TABLE} 
    render_function={(option: CarModel) => { return option.model + " by " + option.manufacturer }} description={"Car Model"}
     set_id={(element: CarsOnPurchase, id: number) => {
        element.carModel.id = id;
    }} />
}