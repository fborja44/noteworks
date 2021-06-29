import { RiSettings5Fill, RiMenuLine } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav id="header-nav">
            <Link to="/login">
                <button className="header-button login-button header-nav-element">
                    <span>Login</span><BiLogIn className="login-icon" />
                </button>
            </Link>
            <Link to="/signup">
                <button className="header-button signup-button header-nav-element">
                    <span>Sign-Up</span>
                </button>
            </Link>
            <RiMenuLine className="header-icon menu-icon header-nav-element" />
            <RiSettings5Fill className="header-icon settings-icon header-nav-element" />
        </nav>
    );
};

export default NavBar;
