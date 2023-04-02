import { useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel'

export const CarModelShowAll = () => {
  const [carModels, setCarModels] = useState<CarModel[]>()

    useEffect(() => {
        fetch(
            "http://ec2-13-53-46-224.eu-north-1.compute.amazonaws.com/cars"
        )
        .then((res) => res.json())
        .then((data) => setCarModels(data))
    }, [])


    if (carModels?.length === 0) {
        return <div>No Car Models</div>
    }

    return (
    <div>
        <h1>Car Models</h1>
        <table>
            <tr>
                <th>#</th>
                <th>Model</th>
                <th>Manufacturer</th>
                <th>Price</th>
                <th>Fuel Consumption</th>
            </tr>
            {
                carModels?.map(
                    (carModel: CarModel, index: number) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{carModel.model}</td>
                            <td>{carModel.manufacturer}</td>
                            <td>{carModel.price}</td>
                            <td>{carModel.fuel_consumption}</td>
                        </tr>
                    )                  
                )
            }
        </table>
    </div>
    )
}