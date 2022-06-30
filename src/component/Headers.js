import React, { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import global from "../Global";
export function Headers() {
    const globalData = useContext(global)
    const navigate = useNavigate()
    function logout() {
        globalData.setUser(null);
        globalData.setJWT(null);
        navigate("/signup")
    }

    return (
        <div className='App'>
            <Navbar bg="dark" variant="dark">
                {/* 
<Navbar.Brand href="#home">ApnaIot</Navbar.Brand> */}

                <Navbar.Brand >APNA-IOT</Navbar.Brand>
                <Nav className="me-auto nav_bar_wrapper">
                    {
                        globalData.user ?
                            <>
                                <Link to='/add' >AddDevice</Link>
                                <Link to='/live' className='mx-2'>Go Live</Link>
                                <Link to='/log' className='mx-2'>Log</Link>
                            </>
                            :
                            <>
                                <Link to='/login' className='mx-2'>Login</Link>
                                <Link to='/signup' className='mx-2'>Register</Link>
                            </>
                    }

                </Nav>
                {
                    // localStorage.getItem('user-info') ?
                    globalData.user ?
                        <Nav>
                            <NavDropdown title={globalData.user && globalData.user.name}>
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        : null
                }
            </Navbar>
        </div>
    )
}

