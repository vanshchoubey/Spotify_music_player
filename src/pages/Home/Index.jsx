import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./home.css";
import Library from "../library/Library";
import Feed from "../feed/Feed";
import Player from "../player/Player";
import Favorites from "../favorites/Favorites";
import Trending from "../trending/Trending";
import Sidebar from "../../components/sidebar/Sidebar";
import Login from "../auth/Login";
import { setClientToken } from "../../../spotify";
import SongSelect from "../songSelect/SongSelect";
const Home = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);
  return !token ? (
    <Login />
  ) : (
    <div className="main-body">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/player" element={<Player />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/selectSong" element={<SongSelect />} />
      </Routes>
    </div>
  );
};

export default Home;
