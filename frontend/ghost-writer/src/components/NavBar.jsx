import { NavLink } from "react-router-dom"
import Logo from "../images/logo.png"
import MobileLogo from "../images/logo-icon.png"
import { Context } from "../utils/Provider"
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from "react"
import "../styles/NavBar.css"
import { useState } from "react"

export default function Navbar() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [showMenus, setShowMenus] = useState(false);
    const { searchPosts, loading } = useContext(Context);

    const handleChange = (e) => {
        setSearchKeyword(e.target.value);

    }
    const handleOnKeyDown = (e) => {
        console.log(e.code);

        if (e.code === "Enter") {
            console.log('hello');
            searchPosts(e.target.value)()   // As it returns a function, I am calling it once again
        }
    }

    const toggleMobileMenu = () => {
        setShowMenus(!showMenus)
    }

    return (
        <>
            <div className="navbar">
                <div className="mobile-menus-bar">
                    <div className="hamburger-icon">
                        <IconButton onClick={toggleMobileMenu}>
                            <MenuRoundedIcon />
                        </IconButton>
                    </div>
                    <div className="mobile-logo">
                        <NavLink to="/">
                            <img src={MobileLogo} alt="logo" />
                        </NavLink>
                    </div>
                    <ul className={showMenus ? "show mobile-menus" : "mobile-menus"}>
                        <li>
                            <NavLink to="/">
                                Posts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/create">
                                Create post
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="logo">
                    <NavLink to="/">
                        <img src={Logo} alt="logo" />
                    </NavLink>
                </div>
                <ul className="menus">
                    <li>
                        <NavLink to="/">
                            Posts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/create">
                            Create post
                        </NavLink>
                    </li>
                </ul>
                <div className="search-bar">
                    <input type="text" placeholder="Search posts by keyword" onChange={handleChange} value={searchKeyword} name="search" onKeyDown={handleOnKeyDown} />
                    <IconButton aria-label="search" id="search-btn" onClick={searchPosts(searchKeyword)}>
                        {
                            loading ?
                                <CircularProgress size="25px" /> :
                                <SearchIcon color="primary" />
                        }
                    </IconButton>
                </div>
            </div>
        </>
    )
}