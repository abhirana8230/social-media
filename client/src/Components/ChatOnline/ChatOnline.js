import "./chatonline.css";
import { useEffect, useState } from "react";
import axios from "axios";
import no_avatar from "../../Images/noavatar.png";

export default function ChatOnline({
  onlineUsers,
  currentUserId,
  setCurrentChat,
  setConversation
}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const getFriends = async () => {
    const followingUser = await axios.get(
      "http://localhost:4000/user/friends/" + currentUserId
    );
    setFriends(followingUser.data);
  };

  const handleClick = async(user) => {
    try {
      const res = await axios.get(`http://localhost:4000/conversation/find/${currentUserId}/${user._id}`);
       if(res.data){
        setCurrentChat(res.data);
       }else{
        const newConversation = {
          senderId:currentUserId,
          receiverId:user._id
        }
        try {
          const newConvs = await axios.post("http://localhost:4000/conversation",newConversation);
          setCurrentChat(newConvs.data);
          setConversation(newConvs.data);
        } catch (error) {
          console.log(error);
        }
       }
       }catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFriends();
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  return (
    <>
      <div className="chatonline-container">
        {onlineFriends.map((online, key) => (
          <div className="chatonline-friend" key={online._id} onClick={()=>handleClick(online)}>   
            <div className="chatonline-imgwrapper">
              <img
                src={
                  online?.profilePicture
                  ? PF+online.profilePicture
                  : no_avatar
                }
                alt="userPic"
                className="chatonline-img"
                />
              <div className="chatonline-badge"></div>
            </div>
            <span className="chatonline-user">{online?.username}</span>
          </div>   
        ))}
      </div>
    </>
  ); 
}
