import React, { useState, useEffect } from 'react';
import WebPlayback from './components/webplayback';
import Login from './components/login';
import './App.css';

function App() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const token = params.access_token || '';

  return (
    <>
      {token ? <WebPlayback token={token} /> : <Login />}
    </>
  );
}

export default App;