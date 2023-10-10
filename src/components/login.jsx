import React from 'react';
import '../styles/login.css';

function Login() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="slingo">SLiNGO</h1>
                <a className="btn-spotify" href="/auth/login" >
                    Login with Spotify 
                </a>
            </header>
        </div>
    );
}

export default Login;
