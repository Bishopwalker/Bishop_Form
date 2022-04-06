import React, {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {registerUser} from "../../ducks/reducer";
const Register = () => {
    let dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstname: '',
        email: '',
        password: '',
        password2: ''
    });
    const navigate = useNavigate();
    const {firstname, email, password, password2} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            alert('Passwords do not match');
        } else {
            console.log('Register');
            dispatch(registerUser({firstname, email, password}));
            navigate('/addUser')
        }
    };

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your DevConnector account</p>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" placeholder="First Name" name="firstname" value={firstname} onChange={e => onChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={password} onChange={e => onChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="password2" value={password2} onChange={e => onChange(e)}/>
                                    </div> <button type="submit" className="btn btn-info btn-block mt-4">Submit</button>
                                </form>
                        <Link to="/login" className="btn btn-outline-info btn-block mt-4">Login</Link>
                    </div>
                                        </div>
                                            </div>
                                                </div>
    )
    }
        export default Register;