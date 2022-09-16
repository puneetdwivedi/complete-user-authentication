import React from 'react';
import "./header.css";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from '../../actions/actions.js';


const Header = () => {
  const userState = useSelector((state) => state.authenticateUser);
  const dispatch = useDispatch();
  // console.log(userState);
  const handleLogOut = () => {
    window.localStorage.removeItem("user");
    dispatch(logOut(null))
  }
  return (
    <div className='header'>
      <h1>Signium</h1>
      <ul>
        {
          userState.loggedIn === true && <li onClick={handleLogOut}>Logout</li>
        }
      </ul>
    </div>
  )
}

export default Header;