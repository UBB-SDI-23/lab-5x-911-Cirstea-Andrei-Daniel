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
import { ServerSettings } from './components/ServerIP'

function App() {
  return (
    <React.Fragment>
      <div className="App">
          <Routes>           
            <Route path={ServerSettings.API_ENDPOINT + EndPoints.HOME_PAGE} element={<HomePage />}></Route>
            <Route path={ServerSettings.API_ENDPOINT + EndPoints.CAR_TABLE} element={<CarModelShowAll />}></Route>
            <Route path={ServerSettings.API_ENDPOINT + EndPoints.CAR_TABLE + "/:id"} element={<CarModelDetails/>}></Route>
            <Route path={ServerSettings.API_ENDPOINT + EndPoints.CAR_TABLE + "/:id" + EndPoints.VIRTUAL_UPDATE} element={<CarModelUpdate/>}></Route>
            <Route path={ServerSettings.API_ENDPOINT + EndPoints.CAR_TABLE + EndPoints.VIRTUAL_CREATE} element={<CarModelCreate/>}></Route>
            <Route path={ServerSettings.API_ENDPOINT + EndPoints.VIRTUAL_CAR_TABLE_STATISTIC} element={<CarModelStatistic/>}></Route>
          </Routes>
      </div>
    </React.Fragment>
  )
}

export default App
