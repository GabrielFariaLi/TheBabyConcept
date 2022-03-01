import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
        <Link to="/adminHome" className="link">
          <span className="logo">TheBabyConceptAdmin</span>
        </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://firebasestorage.googleapis.com/v0/b/baby-concept20.appspot.com/o/Logo%20sozinha%20png.png?alt=media&token=d6b2c1e2-6be0-4762-9c56-2e1e83611383" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
