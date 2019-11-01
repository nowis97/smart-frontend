import React from 'react';
import './App.css';
import MainContainer from "./components/MainContainer/MainContainer";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import Login from "./components/Login";

function App() {

  return (
      <BrowserRouter>

    <div className="App">

        <Login/>
    </div>
      </BrowserRouter>
  );
}

export default App;
