/*jshint esversion:9*/
import React from 'react';
import {Switch, Route} from "react-router-dom";
import {MuiThemeProvider,createMuiTheme,CssBaseline} from '@material-ui/core';
import Homepage from './Pages/Homepage';

const theme = createMuiTheme();
function App() {
  return (
    <MuiThemeProvider theme = {theme}>
    <CssBaseline/>
    <Switch>
      <Route path="/" exact component={Homepage}/>
    </Switch>
    </MuiThemeProvider>    
  );
}

export default App;
