import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import './NavBar.css'

function NavBar() {
    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Searching for "${searchValue}"...`);
        // Add your search logic here
    }
    return (
        <div className='NavBar d-flex flex-column h-100'>
            <nav className='p-4'>
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
                            <button className='border-0 bg-transparent' type="submit">Search</button>
                        </form>
                    </li>
                    <li>
                        <Link className='px-3 py-2 border me-3' to="/authentication">Log In</Link>
                        <Link className='px-3 py-2 border' to="/authentication">Sign Up</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}

export default NavBar