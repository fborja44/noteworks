import {RiSettings5Fill, RiMenuLine} from "react-icons/ri";

const NavBar = () => {
    return (
        <nav id="header-nav">
            <button className="header-button login-button">Login</button>
            <button className="header-button signup-button">Sign-Up</button>
            <RiMenuLine className="header-icon menu-icon" />
            <RiSettings5Fill className="header-icon settings-icon" />
        </nav>
    );
};

export default NavBar;
