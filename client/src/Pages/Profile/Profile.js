import  './profile.css'
import Feed from '../../Components/Feed/Feed'
import Rightbar from '../../Components/Rightbar/Rightbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Topbar from '../../Components/Topbar/Topbar'
import { useState, useEffect } from 'react'
import axios from "axios"
import coverPic from "../../Images/coverpic.webp"
import no_avatar from "../../Images/noavatar.png"
import { useParams } from 'react-router-dom'

export default function Profile() {

  const [users,setUsers] = useState({});
  const params = useParams();
  const usernameParams = params.username;

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const getUsers = async() => {
    try {
      const res = await axios.get(`http://localhost:4000/user?username=${usernameParams}`);
      setUsers(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  },[usernameParams]);

  return (
   <>
   <Topbar/>
    <div className="container-fluid ">
      <div className="row">
        <div className="col-lg-3 d-none d-lg-block">
          <div className="profile-sidebar"><Sidebar/></div>
        </div> 
        <div className="col-lg-9">
          <div className="profile-right">
          <div className="row">
            <div className="col">
            <div className="profile-cover">
                <img src={users.coverPicture ? PF+users.coverPicture  : coverPic} alt="" className="profile-cover-img" />
              <img src={users.profilePicture ? PF+users.profilePicture : no_avatar} alt="" className="profile-user-img" />
                </div>
                <div className="profile-info">
                    <h4 className='profile-info-name'>{users.username}</h4>
                    <span className="profile-info-desc">{users.desc}</span>
                </div>
            </div>
            </div>
            <div className="row">
                <div className="col-lg-8 col-md-8 order-md-0 col-sm-12 order-1">
                  <div className="profile-feed"><Feed username={usernameParams}/></div>
                </div> 
                <div className="col-lg-4 col-md-4 order-md-1 col-sm-12 order-0 mt-3">
                  <div className="pf-rbar"><Rightbar user={users}/></div> 
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}
