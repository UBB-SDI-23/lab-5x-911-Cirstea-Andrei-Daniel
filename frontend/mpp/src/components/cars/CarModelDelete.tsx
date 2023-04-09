import { useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel'
import { ServerSettings } from '../ServerIP';
import { useParams } from 'react-router-dom';
import { EndPoints } from '../../Endpoints';

export const CarModelDelete = () => {
    const { id } = useParams()

    

    // useEffect(() => {
    //     fetch(
    //         endpoint,
    //         {
    //             method: "DELETE"
    //         }
    //     )
    //     .then((res) => res.json())
    //     .then((new_res) => res = new_res)
    // }, [])

    return (
        <div>Are you sure you want to delete this Car Model?</div>
    )
}