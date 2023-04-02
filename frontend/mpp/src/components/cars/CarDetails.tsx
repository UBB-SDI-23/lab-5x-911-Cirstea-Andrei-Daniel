import { useEffect, useState } from 'react'
import { CarModel } from '../../models/CarModel'

export const CarModelDetails = (id: number) => {
  const [carModel, setCarModel] = useState<CarModel>()

    useEffect(() => {
        fetch(
            "http://ec2-13-53-46-224.eu-north-1.compute.amazonaws.com/cars/" + id 
        )
        .then((res) => res.json())
        .then((data) => setCarModel(data))
    }, [])

    if (carModel === null) {
        
    }


    return (
        <div>
            <h1>Car Model Details</h1>
            <pre>
                Model: {carModel.model}
            </pre>
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