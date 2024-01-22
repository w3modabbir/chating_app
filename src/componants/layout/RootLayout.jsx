import { Box, Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import './rootlayout.scss';
import SideBer from '../sidBer/SideBer';

const RootLayout = () => {
  return (
    <Box>
        <Grid container spacing={0}>
            <Grid item xs={2}> 
                <div className="sideber">
                    <SideBer/>
                </div>
            </Grid>
            <Grid item xs={10}>
                <div className='outlet_box'>
                  <Outlet/>
                </div>
            </Grid>
        </Grid>
    </Box>
  )
}

export default RootLayout