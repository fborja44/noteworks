import { RiSettings5Fill, RiMenuLine } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";

const NavBar = () => {
    return (
        <nav id="header-nav">
            <button className="header-button login-button header-nav-element">
                <span>Login</span><BiLogIn className="login-icon" />
            </button>
            <button className="header-button signup-button header-nav-element">
                <span>Sign-Up</span>
            </button>
            <RiMenuLine className="header-icon menu-icon header-nav-element" />
            <RiSettings5Fill className="header-icon settings-icon header-nav-element" />
        </nav>
    );
};

export default NavBar;
