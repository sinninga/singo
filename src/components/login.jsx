import React from 'react';
import './login.css';

function Login() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="singo">SLiNGO</h1>
                <a className="btn-spotify" href="http://localhost:5000/auth/login" >
                    Login with Spotify 
                </a>
            </header>
        </div>
    );
}

export default Login;