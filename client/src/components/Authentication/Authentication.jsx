import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './Authentication.css'

function Authentication({ updateUser }) {
    const [signUp, setSignUp] = useState(false)
    const navigate = useNavigate();

    const handleClick = () => setSignUp((signUp) => !signUp)

    const formSchema = yup.object().shape({
        fname: yup.string("Please enter a first name"),
        lname: yup.string("Please enter a last name"),
        account_type: yup.string("Please select an account type"),
        email: yup.string().email().required("Please enter your email"),
        password: yup.string().required("Please enter a password"),
    });


    const formik = useFormik({
        initialValues: {
            fname: "",
            lname: "",
            account_type: "",
            email: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log('Form submitted', values);
            fetch(signUp ? '/signup' : '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...values, password: values.password }),
            }).then((resp) => {
                if (resp.ok) {
                    resp.json().then((user) => {
                        console.log('User retrieved', user);
                        updateUser(user);
                        if (user.account_type === "user") {
                            navigate("/")
                        } else if (user.account_type === "business") {
                            navigate("/")
                        }
                    });
                } else {
                    resp.json().then(console.log)
                }
            })
        }
    })

    console.log('Formik values:', formik.values);
    console.log('Formik errors:', formik.errors);


    return (
        <div className='Authentication'>
            <form className='p-5 w-xs-100'>
                <h3 className='text-center pb-4 mb-0'>{signUp ? 'Sign up now!' : 'Sign In'}</h3>
                {signUp && formik.errors && (
                    <>
                        <input
                            placeholder='First Name'
                            type="text"
                            name="fname"
                            className='border rounded-0 px-3 py-2'
                            onChange={formik.handleChange}
                            value={formik.values.fname}
                        />
                        <span>{formik.errors.fname}</span>
                        <input
                            placeholder='Last Name'
                            type="text"
                            name="lname"
                            className='border rounded-0 px-3 py-2'
                            onChange={formik.handleChange}
                            value={formik.values.lname}
                        />
                        <span>{formik.errors.lname}</span>
                    </>
                )}
                <input
                    placeholder='Email'
                    type="text"
                    name="email"
                    className='border rounded-0 px-3 py-2'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <span>{formik.errors.email}</span>
                <input
                    placeholder='Password'
                    type="password"
                    name="password"
                    className='border rounded-0 px-3 py-2'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <span>{formik.errors.password}</span>
                {signUp && formik.errors && (
                    <>
                        <label htmlFor="account_type" className='fw-600 mb-1 mt-3'>Account Type:</label>
                        <div className='account_type d-flex flex-row mb-2'>
                            <label className='me-3'>
                                <input
                                    type="radio"
                                    name="account_type"
                                    className='me-2'
                                    value="user"
                                    checked={formik.values.account_type === 'user'}
                                    onChange={formik.handleChange}
                                />
                                User
                            </label>
                            <label className=''>
                                <input
                                    type="radio"
                                    name="account_type"
                                    className='me-2'
                                    value="business"
                                    checked={formik.values.account_type === 'business'}
                                    onChange={formik.handleChange}
                                />
                                Business
                            </label>
                        </div>
                        <span>{formik.errors.account_type}</span>
                    </>

                )}
                <button type='submit' onClick={formik.handleSubmit} className='submit_btn border rounded-0 px-3 py-2 mb-0'>{signUp ? "Sign Up" : "Sign In"}</button>

                <h6 className='mt-3 mb-1'>{signUp ? "Already a member?" : "Not a member?"}</h6>
                <a href="#" onClick={handleClick}>{signUp ? "Log In!" : "Sign Up!"}</a>
            </form>
        </div>
    )
}

export default Authentication