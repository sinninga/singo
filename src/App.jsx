import React, { useState, useEffect } from 'react';
import WebPlayback from './components/webplayback';
import Login from './components/login';
import './App.css'

function App() {

  const [token, setToken] = useState('');

  useEffect(() => {

    async function getToken() {
      const response = await fetch('/api/token?access_token=' + token);
      console.log("Response:", response);
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();

  }, [token]);
  

  return (
    <>
      { (token === '' || token === undefined) ? <Login/> : <WebPlayback token={token} /> }
    </>
  )
}

export default App
