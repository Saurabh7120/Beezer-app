/*jshint esversion:9*/
import React from 'react';
import {Paper,Grid,Avatar,Typography,Button} from '@material-ui/core';
import './UserCard-style.scss';
import AddIcon from '@material-ui/icons/Add';
import Rating from '@material-ui/lab/Rating';

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
      <Grid container>
        <Grid item xs='9'>
          <Typography variant='h5'>{app}</Typography>
        </Grid>
        <Grid item xs='3'>
        {!props.rating?
          <Button startIcon={<AddIcon/>} className='rateBtn' onClick={()=>{props.clickRating(props.appName)}}>
          Rate
        </Button>:
      ''}

        </Grid>
      </Grid>
      {props.rating?
        <div>
        <Rating name="read-only" precision={0.1} value={props.rating} readOnly />
        </div>:
        ''
      }

    </Paper>
  )
}

export default UserCard;
