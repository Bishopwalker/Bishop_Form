import React, {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from "react-redux";
import {getUser} from "../../ducks/actions";
const Login = () => {
    const [formData, setFormData] = useState({

        email: '',
        password: '',

    });
const navigate = useNavigate();
const dispatch = useDispatch();
    const {  email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleLogin=async()=>{

        try {
            const res = await axios.post('http://localhost:3003/auth/login', {email, password});
            console.log(res);
            navigate('/addUser');
            dispatch(getUser(res.data));

        } catch (err) {
            console.error(err.response);
        }
    }
    const onSubmit = async e => {
        e.preventDefault();
    await handleLogin()
    };

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Login</h1>
                        <p className="lead text-center">Login to your Hassan Form account</p>
                        <Link to='/addUser'>Skip Login</Link>
                        <form onSubmit={e => onSubmit(e)}>

                            <div className="form-group">
                                <input type="email" className="form-control form-control-lg" placeholder="Email Address"
                                       name="email" value={email} onChange={e => onChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control form-control-lg" placeholder="Password"
                                       name="password" value={password} onChange={e => onChange(e)}/>
                            </div>
                            <button type="submit" className="btn btn-info btn-block mt-4">Login</button>
                        </form>
                        <Link  to="/register" className="btn btn-outline-info btn-block mt-4">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;