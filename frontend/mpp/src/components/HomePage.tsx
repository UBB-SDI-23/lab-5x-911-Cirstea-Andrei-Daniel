import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import React from 'react'
import { EndPoints } from '../Endpoints'

export const HomePage = () => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                {/* <Typography variant="h6" color="inherit" component="div">
                    <Link to={EndPoints.CAR_TABLE}>
                        Car Models
                    </Link>
                </Typography>
                <Typography variant="h6" color="inherit" component="div">
                    <Link to={EndPoints.}>
                    </Link>
                </Typography> */}
                <div>
                <Link to={EndPoints.CAR_TABLE}>
                    Car Models
                </Link>
                </div>
                <div>
                <Link to={EndPoints.CUSTOMER_TABLE}>
                    Customers
                </Link>
                </div>
            </Toolbar>
        </AppBar>
    )
}