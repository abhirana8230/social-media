import "./login.css";
import Button from '@mui/material/Button';
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls"
import { AuthContext } from "../../Context/AuthContext"
import CircularProgress from "@mui/material/CircularProgress"
import { NavLink } from "react-router-dom";

export default function Login() {

  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext)

  const handleLogin = async(e) => {
    e.preventDefault();
    loginCall({email:email.current.value, password:password.current.value},dispatch);
  };
  
  return (
    <>
      <div className="login">
        <div className="login-wrapper">
          <div className="container main">
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
                  <form className="login-box">
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-control login-input" name="email" required ref={email} 
                    />
                    <input
                      type="password"
                      className="form-control login-input"
                      placeholder="Password" name="password" minLength={6} required ref={password} 
                    />
                    <Button variant="contained" className="login-button" onClick={handleLogin} disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Log In"}</Button>
                    <span className="login-forgot" >Forgot Password?</span>
                    <Button variant="contained" color="success" className="register-button">
                    <NavLink to="/register" className="reg-nav"> Create New Account</NavLink>
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
