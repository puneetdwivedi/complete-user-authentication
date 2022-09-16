import React from 'react';
import "./loginsignupbutton.css";
import { Link, Outlet, useLocation } from "react-router-dom";


const LoginSignUpButton = () => {
    const location=useLocation();
    return (
        <>
            <div className='loginsignupbutton'>
                <div className='loginsignupbutton_container'>
                    <Link to="login" className='link'><button className={(location.pathname === "/login")?"flipbg":""}>Log In</button> </Link>
                    <Link to="signup" className='link'> <button  className={(location.pathname === "/signup")?"flipbg":""}>Sign Up </button></Link>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default LoginSignUpButton