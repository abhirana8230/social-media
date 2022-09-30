import './message.css'
import {format} from "timeago.js"
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import no_avatar from "../../Images/noavatar.png"
import axios from 'axios';

const Message = ({message, own, currentChat}) => {

  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; 
  const [receiver,setReceiver] = useState([]);

  const receiverID = currentChat.members.find((member)=>member!==user._id);

useEffect(() => {
  const recivr = async() => {
    try {
        const receiverUser = await axios.get("http://localhost:4000/user?userId="+receiverID);
        setReceiver(receiverUser.data);  
    } catch (error) {
      console.log(error);
    }}
  recivr();
  },[currentChat]);

  return (
    <div className={own ? "message-own" : "message"}>
        <div className="msg-top">
            <img src={own ? (user.profilePicture? PF+user.profilePicture:no_avatar) : (receiver.profilePicture?PF+receiver.profilePicture:no_avatar)} alt="userPic" className="chat-userimg" />
            <div className="chat-msg">{message.text}</div>
        </div>
        <div className="msg-bottom">
            <span className="msg-time">{format(message.createdAt)}</span>
        </div>
    </div>
  )
} 

export default Message