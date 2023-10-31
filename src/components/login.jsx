import React from 'react';
import '../styles/login.css';

function Login() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="slingo">SLiNGO</h1>
                <a className="btn-spotify" href="/api/login" >
                    Login with Spotify 
                </a>
                <h2 className="permission">This app requires Spotify Premium and permission from Admin. Email asinning25@gmail.com for access</h2>
            </header>
        </div>
    );
}

export default Login;
