import React, { useState, useEffect } from 'react';
import WebPlayback from './components/webplayback';
import Login from './components/login';
import './App.css'

function App() {

  const [token, setToken] = useState('');

  useEffect(() => {

    async function getToken() {
      console.log("hey there");
      const response = await fetch('/auth/token');
      console.log("Response:", response);
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();

  }, []);
  

  return (
    <>
      { (token === '') ? <Login/> : <WebPlayback token={token} /> }
    </>
  )
}

export default App
