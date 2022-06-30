import React, { useState } from 'react';
import './App.css';
import { Homeautomation } from './component/Homeautomation'
import { Route, Routes } from 'react-router-dom'
import { Headers } from './component/Headers'
import { Log } from './component/Log'
import { AddDevice } from './component/AddDevice'
import Signup from './component/Signup'
import Logout from './component/Logout'
import Login from './component/Login';

import global from "./Global";

function App() {
  const [urls, seturls] = useState("http://192.168.1.243:5001")
  const [user, setUser] = useState({})
  const [jwt, setJWT] = useState("")
  return (
    <div className="App">

      <global.Provider value={{
        urls, user, setUser, jwt
        , setJWT
      }}>

        <Headers />
        <Routes>
          <Route exact path="/live" element={<Homeautomation />}></Route>
          <Route exact path="/log" element={<Log />}></Route>
          <Route exact path="/add" element={<AddDevice />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/logout" element={<Logout />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
        </Routes>
      </global.Provider>
    </div>
  );
}

export default App;
