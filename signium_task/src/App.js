import React from 'react';
import './App.css';
import Header from './components/header/Header.jsx';
import LoginSection from './components/login/LoginSection.jsx';
import SignUpSection from './components/signup/SignUpSection';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';


function App() {
  return (
    <div className="app">

      <Header />
      <Routes>
        <Route path="/" exact element={<>
          <Home /></>} >
          <Route path="/login" exact element={<LoginSection />} />
          <Route path="/signup" exact element={<SignUpSection />} />
        </Route>
      </Routes>

      {/* <LoginSection /> */}
      {/* <SignUpSection /> */}
    </div>
  );
}

export default App;
