
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './NavBar/NavBar';
import Authentication from "./Authentication/Authentication";
import './App.css';

function App() {
  const [user, setUser] = useState(null)
  console.log(user)


  const updateUser = (user) => setUser(user)
  return (
    <div className="App vh-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="authentication" element={<Authentication updateUser={updateUser} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
