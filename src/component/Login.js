import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import global from '../Global'

const Login = (prop) => {
    const globalData = useContext(global);

    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (globalData.user) {
            navigate("/add")
        }
    }, [navigate])
    async function login() {
        let entry = { name, password }
        const res = await fetch(globalData.urls + "/login", {
            method: "POST",
            body: JSON.stringify(entry),
            headers: {
                "content-type": "application/json"
            }
        });
        const result = await res.json();
        console.log(result);
        const dataProf = result.token;
        const userDataArray = dataProf.split(".");
        const userData = (JSON.parse(atob(userDataArray[1])));
        if (result.status === 201) {
            globalData.setUser(userData)
            globalData.setJWT(result.token)
            navigate("/add")
        }
        if (result.status === 403) {
            alert("wrong password")
        }


    }

    return (
        <div className='login'>
            <div className='login'>
                <div className='login__form'>
                    <h1>Login Here: 😍  </h1>
                    <input type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="EnterName"></input>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
                    <button type='submit' className='submit__btn' onClick={() => login()}>SUBMIT</button>
                    {/* <div className="col" id='signup_status'>status:  </div> */}
                </div>
            </div>
        </div>
    )
}

export default Login