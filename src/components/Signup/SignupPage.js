import logo from '../../assests/foodimg.png';
import './signup.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupValidChecker } from '../../assests/styles/signupValidation';
import { useAuth } from '../Context/AuthContext';


const Signup = () => {
    const navigate = useNavigate();
    const { signupPage } = useAuth();
    const [error, setError] = useState({ isError: true })
    const [userDetail, setUserDetail] = useState({ Name: "", Email: "", Password: "", Phone: "" });

    var redirect = () => {
        navigate("/login")
    }

    useEffect(() => {
        if (!error.isError) {
            signupPage(userDetail);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);


    const inputHandler = (e) => {
        const { name, value } = e
        setUserDetail({ ...userDetail, [name]: value })
    }

    const clickHandler = async () => {
        console.log(userDetail);
        const error = signupValidChecker(userDetail);
        setError(error)
    };

    return (


        <div className="registration">
            <img src={logo} className="logo" alt="the comfort of food" />

            <div className='form'>

                <div className='row'>
                    <div className='col-md mb-4'>
                        <label htmlFor='Name'>Name
                            <input className='form-control select-input placeholder-active active' type="Name" name="Name" placeholder="Name" value={userDetail.Name} onChange={(e) => inputHandler(e.target)} />
                            {error.Name && <div style={{ color: "red" }}>{error.Name}</div>}
                        </label>

                    </div>
                    <div className='col-md-6 mb-4'>
                        <label htmlFor='Phone'>Phone
                            <input className='form-control select-input placeholder-active active' type="Phone" name="Phone" placeholder="" value={userDetail.Phone} onChange={(e) => inputHandler(e.target)} />
                            {error.Phone && <div style={{ color: "red" }}>{error.Phone}</div>}
                        </label>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 mb-4'>
                        <label htmlFor='Email'>Email
                            <input className='form-control select-input placeholder-active active' type="Email" name="Email" placeholder="nome@email.com.br" value={userDetail.Email} onChange={(e) => inputHandler(e.target)} />
                            {error.Email && <div style={{ color: "red" }}>{error.Email}</div>}
                        </label>
                    </div>
                    <div className='col-md-6 mb-4'>
                        <label htmlFor='Password'>Password
                            <input className='form-control select-input placeholder-active active' type="Password" name="Password" placeholder="Chhaya@123" value={userDetail.Password} onChange={(e) => inputHandler(e.target)} />
                            {error.Password && <div style={{ color: "red" }}>{error.Password}</div>}
                        </label>
                    </div>
                </div>
                <button className='btn btn-success btn-lg mb-1' onClick={clickHandler}>Signup</button>
                <button className='btn btn-primary btn-lg mb-1' style={{ float: "right" }} onClick={redirect} >Login</button>
            </div>

        </div>
    )
};

export default Signup;




