import React, { useContext } from "react";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { NavLink, Link } from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext"
import no_avatar from "../../Images/noavatar.png"

const Topbar = () => {

  const { user, dispatch } = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const handleClick = () => {
    localStorage.clear(); 
    dispatch({type:"LOGOUT"});
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light t-nav">
        <Link to="/">
        <span className="navbar-brand mx-3 logo">
        Ranasocial
        </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="input-group flex-nowrap mx-lg-5">
            <div className="input-group-prepend">
              <span
                className="input-group-text border-0 t-search"
                id="addon-wrapping"
              >
                <Search />
              </span>
            </div>
            <input
              type="search"
              className="input-group border-0 mr-sm-2 searchinput"
              placeholder="search for friend, post or video"
              aria-label="search"
              aria-describedby="addon-wrapping"
            />
          </div>

          <ul className="navbar-nav ml-auto align-items-center t-items">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/register" onClick={handleClick}>
                Logout
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink to="/messenger" className="nav-link">
                Messenger
              </NavLink>
            </li>
             <li className="nav-item">
              <div className="item-div">
              <Person className="t-icon" />
              <Chat className="t-icon" />
              <Notifications className="t-icon" />
              </div>
            </li> 
            <li className="nav-item">
            <NavLink to={`/profile/${user.username}`}>
              <img
                src={user.profilePicture ? PF+user.profilePicture : no_avatar}
                alt="profilepic"
                className="t-img"
              />
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Topbar;
