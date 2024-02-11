import React, { useEffect, useState } from "react";
import "./sidebar.css";
import SidebarButton from "./SidebarButton";
import { MdFavorite } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import apiClient from "../../../spotify";
const Sidebar = () => {
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLAY3C19kL0nV2bI_plU3_YFCtra0dpsYkg&usqp=CAU"
  );
  useEffect(() => {
    apiClient.get("me").then((res) => {
      setImage((prev) => {
        if (res.data.images[0]?.url) {
          return res.data.images[0].url;
        } else {
          return prev;
        }
      });
    });
  }, []);
  return (
    <div className="sidebar-container">
      <img src={image} alt="profile" className="profile-img" />

      <div>
        {/* <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} /> */}
        {/* <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} /> */}
        <SidebarButton title="Player" to="/selectSong" icon={<FaPlay />} />
        {/* <SidebarButton
          title="Favorites"
          to="/favorites"
          icon={<MdFavorite />}
        /> */}
        <SidebarButton title="Library" to="/" icon={<IoLibrary />} />
      </div>
      <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt />} />
    </div>
  );
};

export default Sidebar;
