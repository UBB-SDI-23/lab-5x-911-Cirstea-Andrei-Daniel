import { GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { EndPoints } from "../../Endpoints";

export const UserColumn = () => {
    let table_columns: GridColDef =
        { field: 'user', headerName: 'User', flex: 1, headerAlign: 'center', align: 'center',
            renderCell: (params) => {
                return (
                    <Link to={EndPoints.USER_TABLE + '/find_profile/' + parseInt(params.id.valueOf().toString())}>{params.value.username}</Link>
                ) 
            }
        }

    return table_columns;
}