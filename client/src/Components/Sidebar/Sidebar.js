import React from "react";
import "./sidebar.css";
import {
  RssFeed,
  Chat,
  VideoLibrary,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Today,
  School,
} from "@mui/icons-material";
import { Users } from "../../dummyData";

const Sidebar = () => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  return (
    <>
      <ul className="list-sidebar ">
        <li>
          <RssFeed className="icon-sidebar" />
          <span className="span-sidebar">Feed</span>
        </li>
        <li>
          <Chat className="icon-sidebar" />
          <span className="span-sidebar">Chats</span>
        </li>
        <li>
          <VideoLibrary className="icon-sidebar" />
          <span className="span-sidebar">Videos</span>
        </li>
        <li>
          <Group className="icon-sidebar" />
          <span className="span-sidebar">Groups</span>
        </li>
        <li>
          <Bookmark className="icon-sidebar" />
          <span className="span-sidebar">Bookmarks</span>
        </li>
        <li>
          <HelpOutline className="icon-sidebar" />
          <span className="span-sidebar">Questions</span>
        </li>
        <li>
          <WorkOutline className="icon-sidebar" />
          <span className="span-sidebar">Jobs</span>
        </li>
        <li>
          <Today className="icon-sidebar" />
          <span className="span-sidebar">Events</span>
        </li>
        <li>
          <School className="icon-sidebar" />
          <span className="span-sidebar">Courses</span>
        </li>
      </ul>
      <button type="button" className="btn btn-light">
        Show More
      </button>
      <hr className="hr-sidebar" />
      <ul className="list-sidebar">
        {Users.map((u,key) =>
        <li className="list-item-sidebar" key={u.id}>
        <img
          src={PF+u.profilePicture} 
          alt="profile pic"
          className="img-sidebar"
        />
        <span className="span-sidebar">{u.username}</span>
      </li>
      )}
      </ul>
    </>
  );
};

export default Sidebar;
