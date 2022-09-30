import "./post.css";
import { MoreVert, ThumbUp, Favorite } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import no_avatar from "../../Images/noavatar.png"
import {format} from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext";

export default function Post({post}) {

  const [like,setlike] = useState(post.likes.length);
  const [isLiked,setisLiked] =useState(false);

  const [loved,setLoved] = useState(post.loved.length);
  const [isloved,setisLoved] = useState(false);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [users,setUsers] = useState({});

  const { user:currentUser } = useContext(AuthContext)//means use user as currentUser as nickname

  const likeHandler = () => {
    try {
      axios.put(`http://localhost:4000/posts/${post._id}/like`, {userId:currentUser._id})
    } catch (error) {
      console.log(error)
    }
    setlike(isLiked ? like-1 : like+1)
    setisLiked(!isLiked)
  }

  const loveHandler = () => {
    try {
      axios.put(`http://localhost:4000/posts/${post._id}/love`, {userId:currentUser._id})
    } catch (error) {
      console.log(error)
    }
    setLoved(isloved ? loved-1 : loved+1)
    setisLoved(!isloved)
  }

  const getUsers = async() => {
    try {
      const res = await axios.get(`http://localhost:4000/user?userId=${post.userId}`);
      setUsers(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  const manageLikeLove = () => {
    setisLiked(post.likes.includes(currentUser._id));
    setisLoved(post.loved.includes(currentUser._id));
  }

  useEffect(()=>{
    manageLikeLove();
  },[]);

  useEffect(() => {
    getUsers();
  },[]);

  return ( 
    <>
      <div className="post">
        <div className="row">
          <div className="col">
            <div className="post-top">
              <div className="post-topleft">
                <Link to={`/profile/${users.username}`}> 
                <img
                   src= {users.profilePicture ? PF+users.profilePicture : no_avatar}
                  alt=""
                  className="post-img"
                />
                </Link>
                <span className="post-username">{users.username}</span>
                <span className="post-date">{format(post.createdAt)}</span>
              </div>
              <div className="post-topright">
                <MoreVert className="post-icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="post-center">
              <span className="post-text">{post.desc}</span>
              <img
                src={PF+post.img}
                alt=""
                className="post-centreimg"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="post-bottom">
              <div className="post-bottomleft">
                <ThumbUp htmlColor="blue" className="post-iconbottom" onClick={likeHandler}/>
                <span className="post-span">{like}</span>
                <Favorite htmlColor="red" className="post-iconbottom" onClick={loveHandler}/>
                <span className="post-span">{loved}</span>
              </div>
              <div className="post-bottomright">
                <span className="post-span">{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
