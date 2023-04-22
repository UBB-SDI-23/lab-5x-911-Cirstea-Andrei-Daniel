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

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <BrowserRouter>
          <Routes>           
            <Route path={EndPoints.HOME_PAGE} element={<HomePage />}></Route>

            <Route path={EndPoints.CAR_TABLE} element={<CarModelShowAll />}></Route>
            <Route path={EndPoints.CAR_TABLE + "/:id"} element={<CarModelDetails/>}></Route>
            <Route path={EndPoints.CAR_TABLE + "/:id" + EndPoints.VIRTUAL_UPDATE} element={<CarModelUpdate/>}></Route>
            <Route path={EndPoints.CAR_TABLE + EndPoints.VIRTUAL_CREATE} element={<CarModelCreate/>}></Route>
            <Route path={EndPoints.VIRTUAL_CAR_TABLE_STATISTIC} element={<CarModelStatistic/>}></Route>

            <Route path={EndPoints.CUSTOMER_TABLE} element={<CustomerShowAll />}></Route>
            <Route path={EndPoints.CUSTOMER_TABLE + "/:id"} element={<CustomerDetails/>}></Route>
            <Route path={EndPoints.CUSTOMER_TABLE + "/:id" + EndPoints.VIRTUAL_UPDATE} element={<CustomerUpdate/>}></Route>
            <Route path={EndPoints.CUSTOMER_TABLE + EndPoints.VIRTUAL_CREATE} element={<CustomerCreate/>}></Route>

            <Route path={EndPoints.PURCHASE_TABLE} element={<PurchaseShowAll />}></Route>
            <Route path={EndPoints.PURCHASE_TABLE + "/:id"} element={<PurchaseDetails/>}></Route>
            <Route path={EndPoints.PURCHASE_TABLE + "/:id" + EndPoints.VIRTUAL_UPDATE} element={<PurchaseUpdate/>}></Route>
            <Route path={EndPoints.PURCHASE_TABLE + EndPoints.VIRTUAL_CREATE} element={<PurchaseCreate/>}></Route>

            <Route path={EndPoints.CARSONPURCHASE_TABLE} element={<CarsOnPurchaseShowAll />}></Route>
            <Route path={EndPoints.CARSONPURCHASE_TABLE + "/:id"} element={<CarsOnPurchaseDetails/>}></Route>
            <Route path={EndPoints.CARSONPURCHASE_TABLE + "/:id" + EndPoints.VIRTUAL_UPDATE} element={<CarsOnPurchaseUpdate/>}></Route>
            <Route path={EndPoints.CARSONPURCHASE_TABLE + EndPoints.VIRTUAL_CREATE} element={<CarsOnPuchaseCreate/>}></Route>

          </Routes>
        </BrowserRouter>
      </div>
    </React.Fragment>
  )
}

export default App
