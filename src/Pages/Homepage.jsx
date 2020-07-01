/*jshint esversion:9*/
import React,{useState,useEffect} from 'react';
import {Container,Grid,Typography,FormControl,InputLabel,Input,InputAdornment,Snackbar,makeStyles,CircularProgress,Backdrop} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import * as firebase from 'firebase';
import UserCard from '../Components/UserCard/UserCard-component';
import {connect} from 'react-redux';
import {setUserList,setAccountList,addRatings,setRatingList} from '../redux/user/user-actions';
import {selectUserList,selectAccountList,selectRatingList}  from '../redux/user/user-selector';
import {createStructuredSelector} from 'reselect';
import './Homepage.scss';
import RatingModal from '../Components/RatingModal/RatingModal-component';
import MuiAlert from '@material-ui/lab/Alert';
import { useMediaQuery } from 'react-responsive'


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function Homepage({setUserList,userList,accountList,setAccountList,ratingList,addRatings,setRatingList}){


const isMobile = useMediaQuery({ query: '(max-width: 830px)' })

const isTablet = useMediaQuery({query: '(max-width: 1250px)'})

const[users,setUsers] = useState([]);
const[accounts,setAccounts] = useState([]);
const[ratings,setRatings] = useState([]);
const[searchText,setSearchText] = useState('');
const[modalOpen,setModalOpen] = useState(false);
const[currentApp,setCurrentApp] = useState('');
const [open, setOpen] = useState(false);
const [msg,setMsg] = useState('');
const [severity,setSeverity] = useState('');
const [loading,setLoading] = useState(false);

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

  useEffect(()=>{
    setLoading(true);
    let userResults = null;
    let accountResults = null;
    let ratingResults = null;
    const users = [];
    const accounts = [];
    const ratings = [];
    const userRef = firebase.database().ref().child('users');
    const accountRef = firebase.database().ref().child('accounts');
    const ratingRef = firebase.database().ref().child('rating');
    const Ref = firebase.database().ref().child('accounts/-Kd_teAAXcw2b5MyFPIT');
    Ref.on('value',snap=>{
      console.log(snap.val());
    });
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
          setUserList(users);
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
          name: key,
           Id: accountKey,
           apps: value
         };
       });

        accounts.push(accountDetail);
      });
      setAccountList(accounts);
          });

          ratingRef.on('value',snap =>{
            ratingResults = snap.val();
            if(ratingResults!=null){
          const ratingArray = Object.entries(ratingResults);
              ratingArray.forEach(([key, value])=>{
                var ratingDetail = null;

                  ratingDetail = {
                  app: value.app,
                   rating: value.rating,
                 };

                ratings.push(ratingDetail);
              });
            }

            setRatingList(ratings);
                });


  },[]);

  useEffect(()=>{
    if(userList && accountList && ratingList){
      console.log(userList);
      setUsers(userList);
      setAccounts(accountList);
      setRatings(ratingList);
      setLoading(false);
    }
  },[userList,accountList,ratingList]);

  const handleChange = event =>{
    const{value} = event.target;
    setSearchText(value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const openRatingModal = (appName)=>{
  setModalOpen(true);
  setCurrentApp(appName);
};

  const saveRatingDetails = (appName,rating) =>{
              setLoading(true);
    const ratingDetail={
      rating: rating,
      app: appName
    };
      firebase.database().ref('rating/'+ appName).set({
        rating: rating,
        app: appName
  },
function(error){
  if(error){
    setMsg('Unexpected Error occured ! Try Again later!');
    setSeverity('error');
    setLoading(false);
    setModalOpen(false);
    setOpen(true);
  }else{
    addRatings(ratingDetail);
    setMsg('App rated successfully !');
    setSeverity('success');
    setLoading(false);
    setModalOpen(false);
    setOpen(true);
  }
}
);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
}
const classes = useStyles();

  return(
    <Container>
    <Backdrop className={classes.backdrop} open={loading} >
       <CircularProgress color="inherit" />
     </Backdrop>
    <Snackbar open={open} autoHideDuration={6000} >
       <Alert onClose={handleClose} severity={severity}>
         {msg}
       </Alert>
     </Snackbar>
    <Typography variant='h2' className='title'>App Store</Typography>
    <div className='search'>
    <FormControl>
       <InputLabel htmlFor="standard-adornment-password" style={{color:'black'}}>Search User</InputLabel>
       <Input
        style={{color:'black'}}
         id="standard-adornment-password"
         type='text'
         value={searchText}
         onChange={handleChange}
         endAdornment={
           <InputAdornment position="end">
               <SearchIcon style={{color:'#32e0c4'}}/>
           </InputAdornment>
         }
       />
     </FormControl>
    </div>
    <Grid container>
      {filteredUsers.map((user,index)=>{
        const App = accounts.find(account => account.Id === user.accountId);
        let title = '';
        let appName = '';
        let rating = '';
        if(App){
          title = App.apps.title;
          appName = App.name
          rating = ratings.find(item => item.app === App.name);
        }
        return(<Grid key={index} item  xs={isMobile?12:isTablet?6:4} className='gridItem'>
      <UserCard name={user.name} rating={rating ? rating.rating:null} appName={appName} accountId={user.accountId} clickRating={openRatingModal} app={title}/>
      </Grid>);})}
    </Grid>
    <RatingModal open={modalOpen} appName={currentApp} handleClose={()=>{setModalOpen(false);}}  saveRating={saveRatingDetails}/>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  userList:selectUserList,
  accountList:selectAccountList,
  ratingList:selectRatingList,
});


const mapDispatchToProps = dispatch => ({
  setUserList: users => dispatch(setUserList(users)),
  setAccountList: accounts => dispatch(setAccountList(accounts)),
  addRatings: rating => dispatch(addRatings(rating)),
  setRatingList: ratings => dispatch(setRatingList(ratings))
});

export default connect(mapStateToProps,mapDispatchToProps)(Homepage);
