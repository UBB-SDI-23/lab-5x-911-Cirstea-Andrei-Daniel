import { useCallback, useEffect, useMemo, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { Purchase } from '../../models/Purchase';
import { Customer } from '../../models/Customer';
import debounce from 'lodash.debounce';
import * as Authentication from '../../helpers/Authentication';
import { PurchaseSuggestions } from './PurchaseSuggestions';
import { PurchaseForm } from './PurchaseForm';
import { UpdatePage } from '../CRUD/UpdatePage';
import { CreatePage } from '../CRUD/CreatePage';

export const PurchaseCreate = () => {
  const [element, setElement] = useState<Purchase>(new Purchase())
//   const navigate_back = useNavigate()

//     const endpoint = ServerSettings.API_ENDPOINT + EndPoints.PURCHASE_TABLE

//     const commit_update = () => {
//         console.log(element);
//         Authentication.make_request('POST', endpoint, element)
//         .then((data) => { setElement(data.data) })
//         navigate_back(-1)
//     }

//     useEffect(() => {
//         element.user.id = Authentication.getAuthId();
//         element.user.username = Authentication.getAuthUsername();
//         setElement(element);
//     }, [])

//     const cancel_add = () => {
//         navigate_back(-1)
//     }

//     let form_result = <PurchaseForm element={element} setElement={setElement} ></PurchaseForm>

//     return (
//         <React.Fragment>
//             {form_result}
//             <div>
//                 <button onClick={commit_update}>
//                     <AddIcon/>
//                 </button>

//                 <button onClick={cancel_add}>
//                     <KeyboardReturnIcon />
//                 </button>
//             </div>
//         </React.Fragment>
//     )

    return <CreatePage element={element} setElement={setElement} table_endpoint={EndPoints.PURCHASE_TABLE} 
    form_result={<PurchaseForm element={element} setElement={setElement} ></PurchaseForm>}/>
}