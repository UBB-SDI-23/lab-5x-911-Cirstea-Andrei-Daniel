import { useEffect, useState } from 'react'
import { ServerSettings } from '../ServerIP';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React from 'react';
import { Distributor } from '../../models/Distributor';
import * as Authentication from '../../helpers/Authentication';
import { DistributorForm } from './DistributorForm';
import { CreatePage } from '../CRUD/CreatePage';

export const DistributorCreate = () => {
  const [element, setElement] = useState<Distributor>(new Distributor())
//   const navigate_back = useNavigate()

//     const endpoint = ServerSettings.API_ENDPOINT + EndPoints.DISTRIBUTOR_TABLE

//     const commit_update = () => {
//         Authentication.make_request('POST', endpoint, element)
//         .then((data) => { setElement(data.data) })
//         navigate_back(-1)
//     }

//     const cancel_add = () => {
//         navigate_back(-1)
//     }

//     useEffect(() => {
//         element.user.id = Authentication.getAuthId();
//         element.user.username = Authentication.getAuthUsername();
//         setElement(element);
//     }, [])

//     let form_result = <DistributorForm element={element} setElement={setElement} />

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

    return <CreatePage element={element} setElement={setElement} table_endpoint={EndPoints.DISTRIBUTOR_TABLE} 
        form_result={<DistributorForm element={element} setElement={setElement} />}/>
}