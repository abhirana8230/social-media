import "./register.css";
import Button from '@mui/material/Button';
import { useRef } from "react";
import axios from "axios"
import { NavLink, useNavigate } from 'react-router-dom';



export default function Register() {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const cnfmPassword = useRef();
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   if(cnfmPassword.current.value !== password.current.value) {
    cnfmPassword.current.setCustomValidity("Password do not match!")
   }else{
    const user = {
      username: username.current.value,
      email:email.current.value,
      password:password.current.value
    };
    try {
      const registerUser = await axios.post("http://localhost:4000/auth/register", user);
      Navigate ("/login")
    } catch (error) {
      console.log(error)
    }
   }
  }

  return (
    <>
    <div className="login">
      <div className="login-wrapper">
        <div className="container text-center main">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-sm-12">
              <div className="login-left">
                <h3 className="login-logo"> Ranasocial</h3>
                <span className="logo-desc">
                  Connect with friends and the world around you on Ranasocial.
                </span>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-sm-12">
              <div className="login-right">
                <form className="register-box">
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control login-input"
                    required 
                    ref={username}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control login-input"
                    required 
                    ref={email}
                  />
                  <input
                    type="password"
                    className="form-control login-input"
                    placeholder="Password"
                    required 
                    ref={password}
                    minLength={6}
                  />
                    <input
                    type="password"
                    className="form-control login-input"
                    placeholder="Confirm Password"
                    required 
                    ref={cnfmPassword}
                    minLength={6}
                  />
                  <Button variant="contained" className="signup-button" type="submit" onClick={handleSubmit} >Sign Up</Button>
                    <Button variant="contained" color="success" className="log-button">  
                       <NavLink to="/Login" className="log-nav">Login Into Account</NavLink>
                    </Button> 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
