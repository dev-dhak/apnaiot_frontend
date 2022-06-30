import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap'
import global from '../Global';
import '../App.css';
export function AddDevice(prop) {
    const globalData = useContext(global)
    const [uuid, setUuid] = useState("")
    const [group_name, setGroupName] = useState("")
    const [building, setBuilding] = useState("")
    const [floor, setFloor] = useState("")
    const [ne_name, setNe_name] = useState("")
    const [device_type, setDevice_type] = useState("")
    const [data, setData] = useState([])

    useEffect(() => {
        getList()
    }, [])

    async function getList() {
        const res = await fetch(globalData.urls + "/add", {
            method: "GET",
            body: JSON.stringify(),
            headers: {
                "content-type": "application/json"
            }
        });
        const jsonData = await res.json();
        console.log(jsonData)
        setData(jsonData)

    }
    async function deleteDevice(id) {
        const res = await fetch(globalData.urls + "/delete/" + id, {
            method: "POST",
            body: JSON.stringify(id),
            headers: {
                "content-type": "application/json"
            }
        });
        const jsonData = await res.json();
        console.log(jsonData)
        getList()
        // setData(jsonData)
    }
    async function addDevice() {
        var entry = { ne_name, uuid, group_name, building, floor, device_type, }

        console.log(entry);
        const res = await fetch(globalData.urls + "/add", {
            method: "POST",
            body: JSON.stringify(entry),
            headers: {
                "content-type": "application/json"
            }
        });
        const jsonData = await res.json();

        document.querySelector("#add_status").textContent = jsonData.message;
        console.log(jsonData)
        getList()

    }

    return (

        <div className='MyStyle'>
            <h2>Add Site</h2>
            <div className="container-fluid  p-2" >
                <div className="row g-3" >

                    <div className="col">
                        <label htmlFor="uuid" className="form-label" style={{ width: "200px" }}>UUID</label>
                        <input type="text" className="form-control" name="uuid" value={uuid} onChange={(e) => setUuid(e.target.value)} style={{ width: "200px" }} />
                    </div>
                    <div className="col">
                        <label htmlFor="Group_Name" className="form-label" style={{ width: "200px" }}>Group Name</label>
                        <input type="text" className="form-control" name="group_name" value={group_name} onChange={(e) => setGroupName(e.target.value)} style={{ width: "200px" }} />
                    </div>
                    <div className="col">
                        <label htmlFor="Building" className="form-label" style={{ width: "200px" }}>Building</label>
                        <input type="text" className="form-control" name="building" value={building} onChange={(e) => setBuilding(e.target.value)} style={{ width: "200px" }} />
                    </div>
                    <div className="col">
                        <label htmlFor="Floor" className="form-label" style={{ width: "200px" }}>Floor</label>
                        <input type="text" className="form-control" name="floor" value={floor} onChange={(e) => setFloor(e.target.value)} style={{ width: "200px" }} />
                    </div>
                    <div className="col">
                        <label htmlFor="NE_Name" className="form-label" style={{ width: "200px" }}>Device Name</label>
                        <input type="text" className="form-control" name="ne_name" value={ne_name} onChange={(e) => setNe_name(e.target.value)} style={{ width: "200px" }} />
                    </div>

                    <div className="col">
                        <label htmlFor="Status" className="form-label" style={{ width: "200px" }}>Device Type</label>
                        <select className="form-select" name="device_type" value={device_type} onChange={(e) => setDevice_type(e.target.value)} style={{ width: "150px", height: "35px" }}  >
                            <option default>None</option>
                            <option value='HOME_AUTO'>HOME_AUTO</option>
                            <option value='IAQ'>IAQ</option>

                        </select>
                    </div>
                    <div className="col">
                        <button type="submit" onClick={addDevice} className="btn btn-outline-dark" style={{ width: "135px" }}>ADD</button>
                        <div className="col" id='add_status'>status:  </div>
                    </div>

                </div>
            </div>
            <div style={{ overflow: "auto" }}>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>S.N.</th>
                            <th>Created_On</th>
                            <th>UUID</th>
                            <th scope="col">Group</th>
                            <th>Building</th>
                            <th>Floor</th>
                            <th>NeName</th>
                            <th>Device Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, i) =>

                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item.date_time}</td>
                                    <td>{item.uuid}</td>
                                    <td>{item.group_name}</td>
                                    <td>{item.building}</td>
                                    <td>{item.floor}</td>
                                    <td>{item.ne_name}</td>
                                    <td>{item.device_type}</td>

                                    <td><button className="btn btn-outline-dark btn-sm mx-1" onClick={() => deleteDevice(item.id)}>Delete</button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </Table>
            </div>
        </div>

    )
}

