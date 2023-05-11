import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Typography, Box, Button } from '@mui/material'
import React from 'react'
import { EndPoints } from '../Endpoints';
import * as Authentication from '../helpers/Authentication';

export const HomePage = () => {
    let username = Authentication.getAuthUsername();
    return (
        <React.Fragment>
            <h1>Logged in as {username}</h1>
            <br></br>

            <Box>
            <AppBar position="sticky" style={{ background: '#2E3B55' }}>
                <Toolbar>
                    <Button component={Link} to={EndPoints.CAR_TABLE}>Car Models</Button>
                    <Button component={Link} to={EndPoints.CUSTOMER_TABLE}>Customers</Button>
                    <Button component={Link} to={EndPoints.PURCHASE_TABLE}>Purchases</Button>
                    <Button component={Link} to={EndPoints.CARSONPURCHASE_TABLE}>Car Orders</Button>
                    <Button component={Link} to={EndPoints.DISTRIBUTOR_TABLE}>Distributors</Button>
                    <Button component={Link} to={EndPoints.SHIPMENT_TABLE}>Shipments</Button>
                    <Button component={Link} to={EndPoints.LOGIN_PAGE}>Login</Button>
                </Toolbar>
            </AppBar>
            </Box>
        </React.Fragment>
    )
}