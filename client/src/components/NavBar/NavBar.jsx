import React from 'react'
import {Link } from "react-router-dom";
import './NavBar.css';
const NavBar = () =>{
    return (
        <header>
            <Link className="logo" to={"/"} >
                HenryDogs
            </Link>
            
            <nav className="nav-area">
                <ul>
                    <li >
                        <Link to={"/doglist"} >
                            Dog List
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add"} >
                            Add
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar