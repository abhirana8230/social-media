import React, { useContext, useRef, useState } from "react";
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material";
import { AuthContext } from "../../Context/AuthContext"
import no_avatar from "../../Images/noavatar.png"
import axios from "axios"
import { Link } from "react-router-dom"

const Share = () => {

  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file,setFile] = useState(null);

  const handleShare = async(e) => {
    e.preventDefault()
    const newPost = {
      userId:user._id,
      desc:desc.current.value
    }
    if(file){
      const data = new FormData();
      const fileName = Date.now()+file.name
      data.append("name",fileName);
      data.append("file",file);
      newPost.img = fileName;
      try {
        const resData = await axios.post("http://localhost:4000/upload",data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res= await axios.post("http://localhost:4000/posts",newPost);
      window.location.reload();//it will refresh the page after adding post automatically
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="row">
      <div className="col">
      <div className="share">
      <div className="share-wrapper">
        <div className="share-top">
          <Link to={"/profile/"+user.username}>
            <img
              src={user.profilePicture ? PF+user.profilePicture : no_avatar}
              alt=""
              className="share-img"
              />
          </Link>
          <input
            placeholder={`what's in your mind ${user.username + "?" }`}
            className="share-input" ref= {desc}
            />
        </div>
        <hr className="share-hr" />
          

       {/* for checking which photo is being uploaded this div has been created */}
        {file && (
          <div className="shareImgContainer">
             <img src={URL.createObjectURL(file)} alt="" className="shareImg" /> {/* this will create pseudo url where image will be seen before uploading */}
            <Cancel className="shareCancelImg" onClick={() => setFile(null)}/>
          </div>
        )
        }

        <form className="share-bottom">
          <div className="share-options">
            <label htmlFor="file" className="share-option">
              <PermMedia htmlColor="tomato" className="share-icon" />
              <span className="share-span">Photo or Video</span>
              <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
            </label>
          </div>
          <button type="submit" className="share-button" onClick={handleShare}>
            Share
          </button>
        </form>
      </div>
    </div>
      </div>
    </div>
    
  );
};

export default Share;
