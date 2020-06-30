/*jshint esversion:9*/
import React from 'react';
import {Paper,Grid,Avatar,Typography} from '@material-ui/core';
import './UserCard-style.scss';

function UserCard(props){
  const {name,accountId,app} = props;
  return(
    <Paper elevation={0} className='card'>
      <Grid container>
        <Grid item xs='2'>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Grid>
        <Grid item xs='8'>
          <Typography variant='h6'>{name}</Typography>
        </Grid>
      </Grid>
      <br/>
      <Typography variant='subtitle2'>Account ID: {accountId}</Typography>
      <br/>
      <hr/>
      <Typography>App</Typography>
      <Typography variant='h5'>{app}</Typography>
    </Paper>
  )
}

export default UserCard;
