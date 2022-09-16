import React from 'react'
import { useState } from 'react';
import "./inputfield.css"

const InputField = ({field, value, onChangeUpdateValue}) => {

    const {label, errorMsg, ...otherFieldValue} = field;
    const [showError, setShowError] = useState(false);

    const handleBlurEvent = (e)=>{
        setShowError(true)
    }
    
  return (
    <div className='inputfield'>
        <label>{label}</label>
        <input {...otherFieldValue} value= {value} focused={showError.toString()} onChange={onChangeUpdateValue} onBlur={handleBlurEvent} />
        <span>{errorMsg}</span>
    </div>
  )
}

export default InputField