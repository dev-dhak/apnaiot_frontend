import React, { useState, useEffect, useContext } from 'react'
import './Signup.css'
import { useNavigate } from 'react-router-dom'
import global from '../Global'

const Signup = (prop) => {
    const globalData = useContext(global)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        if (globalData.user) {
            navigate("/")
        }
    }, [navigate])
    async function signup() {
        let entry = { name, email, password }
        const res = await fetch(globalData.urls + "/signup", {
            method: "POST",
            body: JSON.stringify(entry),
            headers: {
                "content-type": "application/json"
            }
        });
        const jsonData = await res.json();
        const userDataArray = jsonData.token.split(".");
        const userData = (JSON.parse(atob(userDataArray[1])));

        if (jsonData.status === 201) {
            document.querySelector("#signup_status").textContent = "Signup successfully!!";
            globalData.setUser(userData);
            globalData.setJWT(jsonData.token);
            navigate("/add")
        }
        else {
            document.querySelector("#signup_status").textContent = jsonData.message;
        }

        console.log(jsonData)

    }
    return (
        <div className='signup'>
            <div className='signup__form'>
                <h1>SignUp Here: 😍  </h1>
                <input type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="EnterName"></input>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="EnterEmail"></input>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
                <button type='submit' className='submit__btn' onClick={() => signup()}>SUBMIT</button>
                <div className="col" id='signup_status'>status:  </div>
            </div>
        </div>
    )
}

export default Signup
