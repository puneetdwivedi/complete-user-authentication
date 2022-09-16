import React from 'react'
import { useState } from 'react'
import InputField from '../inputfield/InputField'
import "./signupsection.css";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom"

const SignUpSection = () => {
    const [inputValues, setInputValues] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
    });
    const [loader, setLoader] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");
    const navigate = useNavigate();

    const inputFields = [
        {
            name: "name",
            placeholder: "Name",
            required: true,
            placeholder: "Enter Name",
            label: "Name",
            errorMsg: "Name is required"
        },
        {
            name: "username",
            type: "text",
            required: true,
            placeholder: "Enter Username",
            label: "Username",
            pattern: "^.{3,}$",
            errorMsg: "Username is required and only alphabets, numbers and should be greater than 3"
        },
        {
            name: "email",
            type: "email",
            required: true,
            placeholder: "Enter Email",
            label: "Email",
            errorMsg: "Email is required and should be correct"
        },
        {
            name: "password",
            type: "password",
            required: true,
            placeholder: "Enter Password",
            label: "Password",
            pattern: "(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d^a-zA-Z0-9].{6,}$",
            errorMsg: "Password is required and should be of length greater than 6 and should contain 1 alphabet 1 numeric and 1 special character"
        },
        {
            name: "confirmpassword",
            type: "password",
            required: true,
            placeholder: "Confirm Password",
            label: "Enter Confirm Password",
            pattern: inputValues.password,
            errorMsg: "Password and Confirm Password do not match"
        }
    ]

    const onChangeUpdateValue = (e) => {
        setInputValues((prv) => {
            return {
                ...prv,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true);

        const makeRequest = () => {
            axios.post("https://puneet-signiumtask.herokuapp.com/api/register", { username: inputValues.username, name: inputValues.name, password: inputValues.password, email: inputValues.email })
                .then((response) => {
                    // console.log(response)
                    if (response.status === 200) {
                        alert("Sign Up Successful, Now you can Log In")
                        navigate("/login");
                    }
                    setLoader(false)
                    setInputValues({ username: "", email: "", name: "", password: "" })
                })
                .catch((err) => {
                    if (err.response.status === 501) {
                        if (err.response.data.result.keyPattern.username === 1) {
                            setLoader(false);
                            setResponseMsg(`Username '${err.response.data.result.keyValue.username}' is already taken.`)
                            // alert(`Username '${err.response.data.result.keyValue.username}' is already taken.`);

                        }
                        else if (err.response.data.result.keyPattern.email === 1) {
                            setLoader(false);
                            setResponseMsg(`Email '${err.response.data.result.keyValue.email}' is already taken.`)
                            // alert(`Email '${err.response.data.result.keyValue.email}' is already taken.`);
                        }
                        // setInputValues({username:"", email:"", name:"", password:""})
                    }
                    else setResponseMsg("Unable to login at moment due to some technical error");
                })
        }

        makeRequest();
    }

    return (
        <div className='signupsection'>
            <div className="signupsectioncontainer">
                <h1> Sign Up</h1>
                <form onSubmit={handleSubmit}>
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
                    {
                        (loader === true) ? <div className='responsebutton'><CircularProgress /></div> : <div className='responsebutton'>
                            <button type='submit'>Sign Up</button>
                        </div>
                    }
                    {
                        responseMsg.length !== "" && <div className='responsebutton'><span>{responseMsg}</span></div>
                    }
                </form>
            </div>
        </div>
    )
}

export default SignUpSection