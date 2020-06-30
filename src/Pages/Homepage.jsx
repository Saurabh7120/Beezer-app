/*jshint esversion:9*/
import React,{useState,useEffect} from 'react';
import {Container,Grid,Typography,FormControl,InputLabel,Input,InputAdornment,IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import * as firebase from 'firebase';
import UserCard from '../Components/UserCard/UserCard-component';
import './Homepage.scss';

function Homepage(){

const[users,setUsers] = useState([]);
const[accounts,setAccounts] = useState([]);
const[searchText,setSearchText] = useState('');

  useEffect(()=>{
    let userResults = null;
    let accountResults = null;
    const users = [];
    const accounts = [];
    const userRef = firebase.database().ref().child('users');
    const accountRef = firebase.database().ref().child('accounts');
    userRef.on('value',snap =>{
      userResults = snap.val();
      const userArray = Object.entries(userResults);
      userArray.forEach(([key, value]) => {
        const userDetails = {
          name:value.name,
          accountId: value.account
        };
        users.push(userDetails);
      });
          setUsers(users);
          });

    accountRef.on('value',snap =>{
      accountResults = snap.val();
      const accountArray = Object.entries(accountResults);
      accountArray.forEach(([key, value])=>{
        const appArray = Object.entries(value.apps);
        const accountKey = key;
        var accountDetail = null;
        appArray.forEach(([key,value]) => {
          accountDetail = {
           Id: accountKey,
           apps: value
         };
       });

        accounts.push(accountDetail);
      });
      setAccounts(accounts);
          });


  },[]);

  const handleChange = event =>{
    const{value} = event.target;
    setSearchText(value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );


  return(
    <Container>
    <Typography variant='h3' className='title'>App Store</Typography>
    <div className='search'>
    <FormControl>
       <InputLabel htmlFor="standard-adornment-password" style={{color:'white'}}>Search User</InputLabel>
       <Input
        style={{color:'white'}}
         id="standard-adornment-password"
         type='text'
         value={searchText}
         onChange={handleChange}
         endAdornment={
           <InputAdornment position="end">
               <SearchIcon style={{color:'#c7e2b2'}}/>
           </InputAdornment>
         }
       />
     </FormControl>
    </div>
    <Grid container>
      {filteredUsers.map((user,index)=>{
        const App = accounts.find(account => account.Id === user.accountId);
        let title = ''
        if(App){
          title = App.apps.title;
        }
        return(<Grid item  xs={4} className='gridItem'>
      <UserCard name={user.name} accountId={user.accountId} app={title}/>
      </Grid>);})}
    </Grid>
    </Container>
  );
}

export default Homepage;
