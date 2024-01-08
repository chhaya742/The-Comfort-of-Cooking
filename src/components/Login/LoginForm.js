import React, { useState, useEffect } from 'react';
import './login.css';
import logo from '../../assests/foodimg.png';
import { loginValidation } from '../../assests/styles/signupValidation';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router';

const Login = () => {
    const navigate = useNavigate();
    const { loginPage, login } = useAuth();
    const [error, setError] = useState({ isError: true })
    const [loginDetail, setLoginDetail] = useState({Email: "",Password: "",});

    var handleRedirect = () => {
        navigate("/signup")
    }

    useEffect(() => {
        if (!error.isError) {
            loginPage(loginDetail);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    const inputHandler = (e) => {
        const { name, value } = e;
        setLoginDetail({ ...loginDetail, [name]: value })
    }

    const clickHandler = async () => {
        const error = loginValidation(loginDetail);
        setError(error)
    };

    return (
        <div className="iApp">
            <img src={logo} className="logo" alt="iNoteBook" />
            <div className='form'>
                <div className='input-group'>
                    <label htmlFor='Email'>Email </label>
                    <input  type="Email" name="Email" placeholder="nome@email.com.br" onChange={(e) => inputHandler(e.target)} />
                    {error.Email && <div style={{ color: "red" }}>{error.Email}</div>}
                </div>
                <div className='input-group'>
                    <label htmlFor='password'>Password </label>
                    <input type="Password" name="Password" placeholder="Chhaya@123" onChange={(e) => inputHandler(e.target)} />
                    {error.Password && <div style={{ color: "red" }}>{error.Password}</div>}
                </div>
                <button className='primary' onClick={clickHandler}>LogIn</button>
            </div>
            <button className='secondry' onClick={handleRedirect} >Signup</button>

        </div>);
};
export default Login;