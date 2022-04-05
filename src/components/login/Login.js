import React, {useState} from 'react'
import {Link} from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({

        email: '',
        password: '',

    });

    const {  email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password) {
            alert('Passwords do not match');
        } else {
            console.log(formData);
        }
    };

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Login</h1>
                        <p className="lead text-center">Login to your Hassan Form account</p>
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
                        <Link to="/register" className="btn btn-outline-info btn-block mt-4">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;