import React, { useState, useEffect, useContext } from 'react'
import "./rightbar.css"
import { CardGiftcard, Add, Remove } from "@mui/icons-material"
import { Users } from '../../dummyData'
import axios from "axios"
import no_avatar from "../../Images/noavatar.png"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { Button } from '@mui/material'

const Rightbar = ({user}) => {

  const { user:currentUser,dispatch } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends,setFriends] = useState([]);
  const [followed,setFollowed] = useState(false);

useEffect(()=>{
  setFollowed(currentUser.following.includes(user?._id));
},[user?._id]);


  const followHandler = async() => {
    try {
      if(followed){
        await axios.put(("http://localhost:4000/user/unfollow/"+user._id),{id:currentUser._id});
          dispatch({type:"UNFOLLOW",payload:user._id})
        
      }else{
       await axios.put(("http://localhost:4000/user/follow/"+user._id),{id:currentUser._id});
         dispatch({type:"FOLLOW",payload:user._id})
      }
    setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  }

  const getFriends = async() => {
    try {
      const friendList = await axios.get("http://localhost:4000/user/friends/"+currentUser._id);
      setFriends(friendList.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFriends()
  },[user]);

  const HomeRightbar = () => {
    return(
      <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="birthdaycontainer">
            <CardGiftcard htmlColor='red' className='rightbar-icon'/>
            <span className="birthdaytext"><b>Albert Dera</b> and <b>3 friends</b> have birthday today</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="adcontainer">
              <img src="\Assets\Logo\Ad_logo.jpg" alt="" className="rightbar-adimg" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h4 className="rightbar-title">Online Friends</h4>
            <ul className="rightbar-friendlist">
              {Users.map((u,key) =>
               <li className="rightbar-friend" key={u.id}>
               <div className="rightbar-profileimagecontainer">
                 <img src={PF+u.profilePicture} alt="" className="rightbar-profileimg" />
                 <span className="rightbar-online"></span>
               </div>
               <span className="rightbar-username">{u.username}</span>
             </li>
              )} 
            </ul>
          </div>
        </div>
      </div>
      </>
    )
  }

  const ProfileRightbar = () => {
    return(
     <>
     <div className="container-fluid">
      <div className="row">
        <div className="col">
     {(user.username!==currentUser.username) && (
      <Button  variant="contained" color="secondary" className="button-follow" onClick={followHandler}>
    {followed ? "Unfollow" : "Follow"}
    {followed ? <Remove/> : <Add/>}
      </Button>)
     } 
     <h4 className="rightbar-profile-title">User Information</h4>
     <div className="rightbar-info">
      <div className="rightbar-info-item">
        <span className="rightbar-info-key">City:</span>
        <span className="rightbar-info-value">{user.city}</span>
      </div>
      <div className="rightbar-info-item">
        <span className="rightbar-info-key">From:</span>
        <span className="rightbar-info-value">{user.from}</span>
      </div>
      <div className="rightbar-info-item">
        <span className="rightbar-info-key">Relationship:</span>
        <span className="rightbar-info-value">{user.relationship}</span>
      </div>
     </div>
     <h4 className="rightbar-profile-title">User Friends</h4>
     <div className="rightbar-followings">
      {friends.map((frnd,key) => (
          <Link to={"/profile/"+frnd.username} key={frnd._id}>
       <div className="rightbar-following">
         <img src={frnd.profilePicture ? PF+frnd.profilePicture : no_avatar} alt="friendPic" className="rightbar-following-img" />
         <span className="rightbar-following-name">{frnd.username}
         </span>
         </div>
         </Link> 
      ))}
     </div>
        </div>
      </div>
     </div>
     </>
    )
  }
  
  return (
    <>
    <div className="rightbar-main">
      {user ? <ProfileRightbar/> : <HomeRightbar/>}
    </div>
    </>
  )
}

export default Rightbar