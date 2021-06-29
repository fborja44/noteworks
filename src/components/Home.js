import React from "react";
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";

const Home = () => {
    return (
        <section className="body-home">
            <div className="body-content">
                <div id="splash-text">Never forget a thing.</div>
                <div id="splash-desc">
                    <p>
                        Your thoughts are invaluable. Keep track of all of your
                        thoughts for school, work, hobbies, errands, and more.
                    </p>
                </div>
                <div className="home-buttons-container">
                    <div className="home-buttons-content">
                        <p>Login or Sign-Up to get started!</p>
                        <Link to="/login">
                            <button className="home-button login-button">
                                <span>Login</span>
                                <BiLogIn className="login-icon" />
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="home-button signup-button">
                                <span>Sign-Up</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <footer>
                <span className="app-name">Denote!</span>
            </footer>
        </section>
    );
};

export default Home;
