/*jshint esversion:9*/
import React,{useState} from 'react';
import {Dialog,DialogTitle,DialogContent,Slide,DialogContentText,DialogActions,Button,TextField} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RatingModal(props){
  const [rating,setRating] = useState(0);

  const handleChange = event => {
    const {value} = event.target;
    setRating(value);
  }

  return(
    <Dialog
       open={props.open}
       TransitionComponent={Transition}
       keepMounted
       onClose={props.handleClose}
       aria-labelledby="alert-dialog-slide-title"
       aria-describedby="alert-dialog-slide-description"
     >
       <DialogTitle id="alert-dialog-slide-title">{`Rate ${props.appName}`}</DialogTitle>
       <DialogContent>
        <Rating name="read-only" precision={0.1} value={rating} readOnly />
        <br/>
         <TextField label='Rate out of 5' value={rating} onChange={handleChange}/>
       </DialogContent>
       <DialogActions>
         <Button onClick={()=>{props.saveRating(props.appName,rating);}} style={{backgroundColor:'#fdd835',color:'white'}} >
           Rate
         </Button>
         <Button onClick={props.handleClose} >
           Close
         </Button>
       </DialogActions>
     </Dialog>
  )
}

export default RatingModal;
