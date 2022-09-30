import './conversation.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import no_avatar from "../../Images/noavatar.png"

const Conversation = (conversations,currentUser) => {

  const [user,setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
  const friendId = conversations.conversations.members.find((m) => m !== conversations.currentUser._id)

  const getUser = async() => {
    try {
      const res = await axios.get("http://localhost:4000/user?userId="+friendId);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
    getUser();
  },[currentUser, conversations]);

  return (
    <>
    <div className="conversation-user">
        <img src={user?.profilePicture ? PF+user.profilePicture : no_avatar} alt="userPic" className="user-conversation-img" />
        <span className="user-conversation-name">{user?.username}</span>
    </div>
    </>
  )
}

export default Conversation