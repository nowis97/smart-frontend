import React from 'react';
import './App.css';
import MainContainer from "./components/MainContainer/MainContainer";
import {BrowserRouter, Route, Switch,Redirect} from "react-router-dom";
import Login from "./components/Login";
import {SnackbarProvider} from "notistack";
import auth from "./services/auth";
import Dashboard from "./components/Dashboard";

function App() {

  return (
      <BrowserRouter>

    <div className="App">
      <SnackbarProvider maxSnack={3} anchorOrigin={{vertical:'top',horizontal:'center'}}>
        <Switch>
          <Route path = "/login" component = {Login}/>


          <Route

              path="/"
              render={props =>
                  auth.isAuthenticated()? (
                      <MainContainer
                          {...props}
                      />
                  ) : (
                      <Redirect
                          to={
                            {
                              pathname: "/login",
                              state: { from: props.location }
                            }
                          }
                      />
                  )
              }
          />



        </Switch>
              </SnackbarProvider>

    </div>
      </BrowserRouter>
  );
}

export default App;
