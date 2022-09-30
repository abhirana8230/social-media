import React, { useContext, useEffect, useState } from "react";
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext"

const Feed = ({username}) => {

  const [posts,setPosts] = useState([]);
  const { user } = useContext(AuthContext)

  const getTimelinePost = async() => {
    try {
      const res = username ? (await axios.get(`http://localhost:4000/posts/profile/${username}`)) : (await axios.get(`http://localhost:4000/posts/timeline/${user._id}`));
      setPosts(res.data.sort((p1,p2)=> {
        return new Date(p2.createdAt)- new Date(p1.createdAt);
      }))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTimelinePost();
  },[username,user._id]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="f-main">
              { (!username || username===user.username) && <Share/>  }  
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="f-main">
              {posts.map((p) => (
                 <Post key={p._id} post={p}/>
              ))}    
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
