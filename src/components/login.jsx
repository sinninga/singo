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
                <h3 className="permission">This app requires <strong className='green'>Spotify Premium</strong> and permission from admin</h3>
                <h3 className="permission2">Email <strong className='green'>asinning25@gmail.com</strong> for access</h3>
            </header>
        </div>
    );
}

export default Login;
