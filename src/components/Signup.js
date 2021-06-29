import React from "react";
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";

const Signup = () => {
    return (
        <section className="body-signup">
            <div className="body-content">
                <div className="signup-container">
                    <div className="signup-content">
                        <h1>Create an Account</h1>
                        <form className="signup-form">
                            <label id="signup-username-label" for="signup-username">
                                Username
                            </label>
                            <input id="signup-username" type="text"></input>
                            <label id="signup-email-label" for="signup-email">
                                Email
                            </label>
                            <input id="signup-email" type="text"></input>
                            <label id="signup-password-label" for="signup-password">
                                Password
                            </label>
                            <input id="signup-password" type="password"></input>
                            <label id="signup-confirm-password-label" for="signup-confirmpassword">
                                Confirm Password
                            </label>
                            <input id="signup-confirm-password" type="password"></input>
                            <input
                                id="signup-submit"
                                type="submit"
                                value="Create Account"
                            ></input>
                        </form>
                    </div>
                    <Link to="/login" id="login-link">
                        Or login with a prexisting account
                    </Link>
                </div>
            </div>
            <footer>
                <span className="app-name">Denote!</span>
            </footer>
        </section>
    );
};

export default Signup;
