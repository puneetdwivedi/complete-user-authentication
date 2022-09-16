import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import InputField from '../inputfield/InputField.jsx';
import "./loginsection.css";
import { useDispatch } from 'react-redux';
import { logIn } from '../../actions/actions.js';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const LoginSection = () => {

    const [inputValues, setInputValues] = useState({
        username: "", password: ""
    });
    const [loader, setLoader] = useState(false);
    const [showResponnseMsg, setShowresponseMsg] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputFields = [
        {
            name: "username",
            type: "text",
            placeholder: "Enter your Username",
            label: "Username",
            errorMsg: "Username is required",
            required: true
        },
        {
            name: "password",
            type: "password",
            placeholder: "Enter your password",
            label: "Password",
            errorMsg: "Password is required",
            required: true
        }
    ];

    const onChangeUpdateValue = (e) => {
        setInputValues((prv) => {
            return {
                ...prv,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleLogInSubmit = (e) => {
        e.preventDefault();
        setLoader(true)

        const makeRequest = () => {
            axios.post("https://puneet-signiumtask.herokuapp.com/api/login", { username: inputValues.username, password: inputValues.password })
                .then((response) => {
                    if (response.status === 200) {
                        // console.log(response.data.result);
                        window.localStorage.setItem("user", JSON.stringify(response.data.result));
                        dispatch(logIn(response.data.result));
                        navigate("/");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setLoader(false)
                    if (err.response.status === 404) {
                        setShowresponseMsg(err.response.data.result);
                    }
                    else setShowresponseMsg("Unable to login at the moment");
                })
        }
        makeRequest();
    }
    return (
        <div className='loginsection'>
            <div className="loginformcontainer">
                <h1>Log In</h1>
                <form onSubmit={handleLogInSubmit}>
                    {
                        inputFields?.map((field, index) => {
                            return <InputField
                                key={index}
                                field={field}
                                value={inputValues[field.name]}
                                onChangeUpdateValue={onChangeUpdateValue}
                            />
                        })
                    }
                    <div className='submitbutton'>
                        {
                            (loader === true) ? <CircularProgress /> :<button type='submit'>Log In</button>
                        }
                        {
                            showResponnseMsg !== "" && <div style={{ color: "red", marginTop:"0.3rem"}}><span>{showResponnseMsg}</span></div>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginSection;