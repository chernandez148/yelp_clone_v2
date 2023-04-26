import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import { IoMdBookmarks } from 'react-icons/io';
import { FiUser } from 'react-icons/fi';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { HiOutlineSearch } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import './NavBar.css'

function NavBar({ user, updateUser }) {
    const [searchValue, setSearchValue] = useState('');
    const [toggleAccount, setToggleAccount] = useState(false)
    const navigate = useNavigate();
    console.log(toggleAccount)

    const logout = () => {
        setToggleAccount(false)

        fetch("/logout", {
            method: "DELETE",
        }).then(resp => {
            if (resp.ok) {
                updateUser(null)
                navigate("/")
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Searching for "${searchValue}"...`);
        // Add your search logic here
    }

    const toggleAccountNav = () => {
        setToggleAccount(true)
    }

    const handleClose = () => {
        setToggleAccount(false)
    }

    const toggleAccountMenu = toggleAccount ? 'start-0 d-flex flex-column h-100' : 'd-none'

    return (
        <div className='NavBar d-flex flex-column h-100'>
            <nav className='p-4 position-relative'>
                <ul className='d-flex justify-content-around align-items-center list-unstyled m-0'>
                    <li>
                        <Link className='logo' to="/">Logo</Link>
                    </li>
                    <li>
                        <form className='search-form p-2 border' onSubmit={handleSubmit}>
                            <input
                                className='border-0 border-end me-2'
                                type="text"
                                placeholder="Search..."
                                value={searchValue}
                            />
                            <input
                                className='border-0'
                                type="text"
                                placeholder="Search..."
                                value={searchValue}
                            />
                            <button className='border-0 bg-transparent' type="submit"><HiOutlineSearch /></button>
                        </form>
                    </li>
                    {user ? (
                        <li>
                            <Link className='px-3 py-2 me-3 bg-transparent'>Welcome, {user.fname}</Link>
                            <Link className='px-3 py-2 bg-transparent' onClick={toggleAccountNav}><FaUserCircle size={24} /></Link>
                        </li>
                    ) : (
                        <li>
                            <Link className='auth px-3 py-2 border me-3' to="/authentication">Log In</Link>
                            <Link className='auth px-3 py-2 border' to="/authentication">Sign Up</Link>
                        </li>
                    )}

                </ul>
            </nav>
            {user ? (
                <div className='account-nav position-absolute end-0 justify-content-end h-100'>
                    <div className={`user-menu-wrapper ${toggleAccountMenu}`}>
                        <Link onClick={handleClose}><AiOutlineClose className='m-3' /></Link>
                        <Row className='p-0 m-0 flex-row'>
                            <Col className='p-0 d-flex justify-content-center align-items-center' sm={3}>img</Col>
                            <Col className='p-3'>
                                <Row className='flex-column'>
                                    <Col><span>{user.fname} {user.lname}</span></Col>
                                    <Col><span>@ChristianHernandez354</span></Col>
                                    <Link>Manage your Account</Link>
                                </Row>
                            </Col>
                        </Row>
                        <hr />
                        <ul className="ps-4  m-0 list-unstyled">
                            <li className='mt-5'>
                                <Link><FiUser size={24} className='me-1' /> About Me</Link>
                            </li>
                            <li>
                                <Link><IoMdBookmarks size={24} className='me-1' /> Favorites</Link>
                            </li>
                            <li>
                                <Link><HiOutlinePencilSquare size={24} className='me-1' /> Leave a Review</Link>
                            </li>
                            <li>
                                <Link onClick={logout}><IoLogOutOutline size={24} className='me-1' /> Sign Out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                ""
            )}
            <Outlet />
        </div>
    )
}

export default NavBar