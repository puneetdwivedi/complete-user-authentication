import React from 'react'
import LoginSignUpButton from '../components/twobuttons/LoginSignUpButton';
import { useSelector } from 'react-redux';

const Home = () => {
    const userState = useSelector((state)=>state.authenticateUser);
  return (
    <>
        {
            (userState.loggedIn) ? <div style={{textAlign:"center", marginTop:"2rem"}}><span>Hii, <b>{userState.user.name}</b>.You are logged in as <span style={{fontWeight:500}}>{userState.user.username}</span></span></div>: <LoginSignUpButton />
        }
    </>
  )
}

export default Home