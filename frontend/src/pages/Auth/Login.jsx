import React from "react";
import { useState, useEffect } from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import '../../../src/index.css';



const Login = () => {
    const [email, setEmaiil] = useState ('')
    const [password, setPassword] = useState ('')
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()

    const {userInfo} = useSelector (state => state.auth)

    const {search} = useLocation()

    const sp = new URLSearchParams (search)
    const redirect = sp.get('redirect') || '/'

    useEffect (() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])


    return <div>
        <section className = "pl-[1-rem] flex flex-wrap">
            <div className = "mr-[4rem] mt-[5rem]">
                <h1 className = "text-2xl font semi-bold mb-4">Sign In</h1>


                <form className = "container w-[150rem]" >

                    {/* email */}
                    <div className = "my-[2rem]">
                    <label htmlFor = "email" className ="block text-sm font-medium text-blue-700">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmaiil(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        placeholder="Enter your email"
                    />
                    </div>

                    {/* Password */}
                    <div className="my-[2rem]">
                    <label htmlFor="password" className="block text-sm font-medium text-blue-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        placeholder="Enter your password"
                    />
                    </div>
                    
                </form>
            </div>

        </section>
    </div>
};

export default Login;
