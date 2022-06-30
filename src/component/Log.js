
import React, { useEffect, useState, useContext } from 'react'
import { Table } from 'react-bootstrap'
import Moment from 'moment';
import global from '../Global';



export function Log(prop) {
  const globalData = useContext(global)
  const [ne_name, setDeviceName] = useState("")
  const [date1, setDate1] = useState("")
  const [date2, setDate2] = useState("")
  const [data, setData] = useState([])
  const [cdata, setcdata] = useState([])
  const [curPage, setcurPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [limit, setLimit] = useState(10)
  useEffect(() => {
    var date1 = new Date()
    var date2 = new Date()

    getData("Home Automation-1", date1, date2)
  }, []);


  async function getData(ne_name, date1, date2) {
    date1 = Moment(date1).format('YYYY-MM-DD')
    date2 = Moment(date2).format('YYYY-MM-DD')
    setDate1(date1)
    setDate2(date2)
    setDeviceName(ne_name)
    var entry = {
      ne_name, date1, date2
    }
    console.log(entry)
    const res = await fetch(globalData.urls + "/log", {
      method: "POST",
      body: JSON.stringify(entry),
      headers: {
        "content-type": "application/json"
      }
    })
    const jsondata = await res.json()
    console.log(jsondata)
    let page = (Math.ceil(jsondata.length / limit));
    setMaxPage(page)
    setData(jsondata)

  }


  useEffect(() => {
    let page = (Math.ceil(data.length / limit));
    setMaxPage(page)
    let start = (curPage - 1) * limit;
    let end = start + limit;
    let newData = data.slice(start, end)
    setcdata(newData);
  }, [data, curPage, maxPage, limit])

  return (
    <div className='MyStyle'>
      <div className="container my-1">
        <h2>Statics Report</h2>
        <div className="form-inline text-aligned-center" >
          <div className="row g-2">
            <div className="col">


              <label htmlFor="ne_name" style={{ width: "200px" }}>Device Name</label>
              <input className="form-control" type="text" value={ne_name} onChange={(e) => setDeviceName(e.target.value)} style={{ width: "200px" }} />

            </div>
            <div className="col">
              <label htmlFor="date" style={{ width: "200px" }}>From</label>
              <input className="form-control" type="date" value={date1} onChange={(e) => setDate1(e.target.value)} style={{ width: "200px" }} />
            </div>
            <div className="col">
              <label htmlFor="myDate2" style={{ width: "200px" }}>To</label>
              <input className="form-control" type="date" value={date2} onChange={(e) => setDate2(e.target.value)} style={{ width: "200px" }} />
            </div>
            <button type="submit" onClick={(e) => getData(ne_name, date1, date2)} className="btn btn-outline-dark">Refresh</button>
          </div>
        </div>

        <div id="dataReference" style={{ display: "inline-flex" }}>

          <select className="m-2" id="limitSelection" value={limit} onChange={(e) => setLimit(e.target.value)} style={{ height: "6vh" }}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>

          <button id="prevBtn" className="btn btn-outline-dark m-2" style={{ height: "6vh" }} onClick={() => { setcurPage(curPage - 1 ? curPage - 1 : curPage); }}>Prev</button>

          <div id="pageCtrl" style={{ height: "10vh", margin: "10px" }}>
            <span className="m-1">Page</span>
            <input className="w-25" type="number" id="pageNumber" value={curPage} onChange={(e) => setcurPage(e.target.value <= maxPage && e.target.value > 0 ? e.target.value : curPage)} />
            <span className="m-1">of</span>
            <div className="m-1" id="totalPages" style={{ display: "inline-flex" }} readOnly={true}>{maxPage}</div>
          </div>
          <button id="nextBtn" className="btn btn-outline-dark m-2" onClick={() => { setcurPage(curPage < maxPage ? curPage + 1 : curPage); }} max={maxPage} style={{ height: "6vh" }}>Next</button>
        </div>
        <div style={{ overflow: "auto" }}>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Time</th>
                <th>Status</th>
                <th>Set Temp(°C)</th>
                <th>Indoor Temp(°C)</th>
                <th>Outdoor Temp°C)</th>
                <th>Humidity(%)</th>
              </tr>
            </thead>
            <tbody>
              {
                cdata.map((item, i) =>
                  <tr key={i}>
                    <td>{i + ((curPage - 1) * limit) + 1}</td>
                    <td>{item[0]}</td>
                    <td>{item[1].STA}</td>
                    <td>{item[1].SETT / 100}</td>
                    <td>{item[1].INDT / 100}</td>
                    <td>{item[1].OUDT / 100}</td>
                    <td>{item[1].HUM}</td>
                  </tr>

                )
              }
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

