import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CarModelShowAll } from './components/cars/CarModelShowAll'
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import React from 'react'
import { HomePage } from './components/HomePage'
import { EndPoints } from './Endpoints'
import { CarModelDetails } from './components/cars/CarModelDetails'
import { CarModelUpdate } from './components/cars/CarModelUpdate'
import { CarModelCreate } from './components/cars/CarModelCreate'
import { CarModelStatistic } from './components/cars/CarModelStatistic'
import { CarsOnPurchaseDetails } from './components/cars_on_purchase/CarsOnPurchaseDetails'
import { CarsOnPurchaseShowAll } from './components/cars_on_purchase/CarsOnPurchaseShowAll'
import { CarsOnPurchaseUpdate } from './components/cars_on_purchase/CarsOnPurchaseUpdate'
import { CustomerCreate } from './components/customers/CustomerCreate'
import { CustomerDetails } from './components/customers/CustomerDetails'
import { CustomerShowAll } from './components/customers/CustomerShowAll'
import { CustomerUpdate } from './components/customers/CustomerUpdate'
import { PurchaseCreate } from './components/purchases/PurchaseCreate'
import { PurchaseDetails } from './components/purchases/PurchaseDetails'
import { PurchaseShowAll } from './components/purchases/PurchaseShowAll'
import { PurchaseUpdate } from './components/purchases/PurchaseUpdate'
import { CarsOnPuchaseCreate } from './components/cars_on_purchase/CarsOnPurchaseCreate'
import { DistributorCreate } from './components/distributors/DistributorCreate'
import { DistributorDetails } from './components/distributors/DistributorDetails'
import { DistributorShowAll } from './components/distributors/DistributorShowAll'
import { ShipmentCreate } from './components/shipments/ShipmentCreate'
import { ShipmentDetails } from './components/shipments/ShipmentDetails'
import { ShipmentShowAll } from './components/shipments/ShipmentShowAll'
import { ShipmentUpdate } from './components/shipments/ShipmentUpdate'
import { DistributorUpdate } from './components/distributors/DistributorUpdate'
import { DistributorStatistic } from './components/distributors/DistributorStatistic'
import { UserLogin } from './components/users/UserLogin'
import { UserRegister } from './components/users/UserRegister'
import { UserConfirmCode } from './components/users/UserConfirmCode'

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path={EndPoints.REGISTER_PAGE} element={<UserRegister/>}></Route>
            <Route path={EndPoints.backendConfirmCodeAPIOnly("") + ":code"} element={<UserConfirmCode />}></Route>
            <Route path={EndPoints.LOGIN_PAGE} element={<UserLogin />}></Route>
            <Route path={EndPoints.HOME_PAGE} element={<HomePage />}></Route>

            <Route path={EndPoints.CAR_TABLE} element={<CarModelShowAll />}></Route>
            <Route path={EndPoints.CAR_TABLE + EndPoints.FIND_PATH + "/:id"} element={<CarModelDetails/>}></Route>
            <Route path={EndPoints.CAR_TABLE + "/:id" + EndPoints.VIRTUAL_UPDATE} element={<CarModelUpdate/>}></Route>
            <Route path={EndPoints.CAR_TABLE + EndPoints.VIRTUAL_CREATE} element={<CarModelCreate/>}></Route>
            {/* <Route path={EndPoints.CAR_TABLE + EndPoints.STATISTIC} element={<CarModelStatistic/>}></Route> */}

            <Route path={EndPoints.CUSTOMER_TABLE} element={<CustomerShowAll />}></Route>
            <Route path={EndPoints.CUSTOMER_TABLE + EndPoints.FIND_PATH + "/:id"} element={<CustomerDetails/>}></Route>
            <Route path={EndPoints.CUSTOMER_TABLE + "/:id" + EndPoints.VIRTUAL_UPDATE} element={<CustomerUpdate/>}></Route>
            <Route path={EndPoints.CUSTOMER_TABLE + EndPoints.VIRTUAL_CREATE} element={<CustomerCreate/>}></Route>

            <Route path={EndPoints.PURCHASE_TABLE} element={<PurchaseShowAll />}></Route>
            <Route path={EndPoints.PURCHASE_TABLE + EndPoints.FIND_PATH + "/:id"} element={<PurchaseDetails/>}></Route>
            <Route path={EndPoints.PURCHASE_TABLE + "/:id" + EndPoints.VIRTUAL_UPDATE} element={<PurchaseUpdate/>}></Route>
            <Route path={EndPoints.PURCHASE_TABLE + EndPoints.VIRTUAL_CREATE} element={<PurchaseCreate/>}></Route>

            <Route path={EndPoints.CARSONPURCHASE_TABLE} element={<CarsOnPurchaseShowAll />}></Route>
            <Route path={EndPoints.CARSONPURCHASE_TABLE + EndPoints.FIND_PATH + "/:id"} element={<CarsOnPurchaseDetails/>}></Route>
            <Route path={EndPoints.CARSONPURCHASE_TABLE + "/:id" + EndPoints.VIRTUAL_UPDATE} element={<CarsOnPurchaseUpdate/>}></Route>
            <Route path={EndPoints.CARSONPURCHASE_TABLE + EndPoints.VIRTUAL_CREATE} element={<CarsOnPuchaseCreate/>}></Route>

            <Route path={EndPoints.DISTRIBUTOR_TABLE} element={<DistributorShowAll />}></Route>
            <Route path={EndPoints.DISTRIBUTOR_TABLE + EndPoints.FIND_PATH + "/:id"} element={<DistributorDetails/>}></Route>
            <Route path={EndPoints.DISTRIBUTOR_TABLE + "/:id" + EndPoints.VIRTUAL_UPDATE} element={<DistributorUpdate/>}></Route>
            <Route path={EndPoints.DISTRIBUTOR_TABLE + EndPoints.VIRTUAL_CREATE} element={<DistributorCreate/>}></Route>
            <Route path={EndPoints.DISTRIBUTOR_TABLE + EndPoints.STATISTIC} element={<DistributorStatistic/>}></Route>

            <Route path={EndPoints.SHIPMENT_TABLE} element={<ShipmentShowAll />}></Route>
            <Route path={EndPoints.SHIPMENT_TABLE + EndPoints.FIND_PATH + "/:id"} element={<ShipmentDetails/>}></Route>
            <Route path={EndPoints.SHIPMENT_TABLE + "/:id" + EndPoints.VIRTUAL_UPDATE} element={<ShipmentUpdate/>}></Route>
            <Route path={EndPoints.SHIPMENT_TABLE + EndPoints.VIRTUAL_CREATE} element={<ShipmentCreate/>}></Route>

          </Routes>
        </BrowserRouter>
      </div>
    </React.Fragment>
  )
}

export default App
