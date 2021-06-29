import React from "react";
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";

const Login = () => {
    return (
        <body className="body-login">
            <div className="body-content">
                <div className='login-container'>
                    <div className='login-content'>
                        <h1>Login</h1>
                        <form className="login-form">
                            <label id="username-label" for="username">Username or Email</label>
                            <input id="username" type="text"></input>
                            <label id="password-label" for="password">Password</label>
                            <input id="password" type="password"></input>
                            <input id="login-submit" type="submit" value="Login"></input>
                        </form>
                    </div>
                    <Link to="/signup" id="signup-link">Or create an account</Link>
                </div>
            </div>
            <footer>
                <span className="app-name">Denote!</span>
            </footer>
        </body>
    );
};

export default Login;
