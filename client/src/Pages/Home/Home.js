import React from "react";
import Feed from "../../Components/Feed/Feed";
import Rightbar from "../../Components/Rightbar/Rightbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import "./home.css";

function Home() {
  return (
    <>
      <Topbar />
      <div className="container-fluid ">
        <div className="row">
            <div className="col-lg-3 sidebar">
            <Sidebar />
            </div>          
          <div className="col-lg-6 col-md-8 col-12 feed">
            <Feed />
          </div>
          <div className="col-lg-3 col-md-4 rightbar">
            <Rightbar />
          </div> 
        </div>
      </div>
    </>
  );
}

export default Home;
