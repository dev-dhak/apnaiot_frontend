import React from 'react'
import '../App.css';
import { useState, useEffect, useContext } from 'react';
import global from '../Global';
export function Homeautomation(prop) {
    const globalData = useContext(global)
    const [ne_name, setNe_name] = useState("Home Automation-1")
    const [status, setStatus] = useState("")
    const [settemp, setTemp] = useState("")
    const [indoortemp, setIndoortemp] = useState("")
    const [outdoortemp, setOutdoortemp] = useState("")
    const [humidity, setHumidity] = useState("")
    const [lastpolled, setLastpolled] = useState("")

    useEffect(() => {
        getData("Home Automation-1")
    }, [])
    async function setData(ne_name) {
        var entry = {
            ne_name, STA: status, SETT: settemp, mqtt_type: 1
        }
        console.log(entry)
        const res = await fetch(globalData.urls + "/live", {
            method: "POST",
            body: JSON.stringify(entry),
            headers: {
                "content-type": "application/json"
            }
        });
        const jsonData = await res.json();
        console.log(jsonData)

    }
    async function getData(ne_name) {
        var entry = {
            ne_name, mqtt_type: 0
        }
        console.log(entry);
        const res = await fetch(globalData.urls + "/live", {
            method: "POST",
            body: JSON.stringify(entry),
            headers: {
                "content-type": "application/json"
            }
        });
        const jsonData = await res.json();

        if (jsonData.err === 1) {
            alert("Device Unreachable")
            document.querySelector("#ne_name").textContent = ne_name;
            setStatus("")
            setTemp("")
            setIndoortemp("")
            setOutdoortemp("")
            setHumidity("")
            setLastpolled(new Date(jsonData.DATT).toLocaleString())
        }
        else {
            document.querySelector("#ne_name").textContent = jsonData.DN;
            setStatus(jsonData.STA)
            setTemp(jsonData.SETT)
            setIndoortemp(jsonData.INDT / 100)
            setOutdoortemp(jsonData.OUDT / 100)
            setHumidity(jsonData.HUM)
            setLastpolled(new Date(jsonData.DATT).toLocaleString())

        }

    }

    return (
        <div className='App'>

            <div className="container-fluid p-2 homeAuto" >
                <div className="row row-cols-lg-auto g-3 align-items-center ">
                    <div className="col-auto">
                        <label className='visually-hidden' htmlFor="autoSizingInput">Device Name</label>
                        <input type="text" className="form-control" id="autoSizingInput" value={ne_name} onChange={(e) => setNe_name(e.target.value)} style={{ width: "250px" }} placeholder="Device Name"></input>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-outline-dark" onClick={(e) => getData(ne_name)} style={{ width: "135px" }}>SUBMIT</button>
                    </div>
                </div>

                <div className="card homeAuto" style={{ width: "25rem" }}>
                    <div className="card-header text-center" id="ne_name" ></div>
                    <div className="card-body">
                        <label htmlFor="status" style={{ width: "150px" }}>Status</label>
                        <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: "190px", height: "35px" }}>
                            <option value="0">Off</option>
                            <option value="1">On</option>
                        </select>
                        <label htmlFor="settemp" style={{ width: "150px" }}>Set Temp(°C)</label>
                        <input type="number" placeholder="Set Temp(°C)" name="settemp" min={15} step={1} max={30} value={settemp / 100} onChange={(e) => setTemp(e.target.value * 100)}
                            style={{ width: "190px", height: "35px" }} /><br />

                        <label htmlFor="indoortemp" style={{ width: "150px" }}>Indoor Temp(°C)</label>
                        <input type="number" placeholder="Indoor Temp(°C)" name="indootemp" value={indoortemp} onChange={(e) => setIndoortemp(e.target.value)}
                            style={{ width: "190px", height: "35px" }} disabled /><br />

                        <label htmlFor="outdoortemp" style={{ width: "150px" }}>Outdoor Temp(°C)</label>
                        <input type="number" placeholder="Outdoor Temp(°C)" name="outdoortemp" value={outdoortemp} onChange={(e) => setOutdoortemp(e.target.value)}
                            style={{ width: "190px", height: "35px" }} disabled /><br />

                        <label htmlFor="humidity" style={{ width: "150px" }}>Humidity(%)</label>
                        <input type="number" placeholder="Humidity(%)" name="humidity" value={humidity} onChange={(e) => setHumidity(e.target.value)}
                            style={{ width: "190px", height: "35px" }} disabled /><br />

                        <label htmlFor="lastpolled" style={{ width: "150px" }}>Last Polled</label>
                        <input type="text" placeholder="lastpolled" name="lastpolled" value={lastpolled} onChange={(e) => setLastpolled(e.target.value)}
                            style={{ width: "190px", height: "35px" }} disabled /><br />

                        <button className="btn btn-outline-dark" type='button' onClick={(e) => getData(ne_name)} style={{ width: "150px" }}>REFRESH</button>
                        <button className="btn btn-outline-dark" type='button' onClick={(e) => setData(ne_name)} style={{ width: "150px" }}>SET</button>
                    </div>
                </div>
            </div>
        </div >
    );
}


