import React, { useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import apiClient from "../../../spotify";
import SongCard from "../../components/songCard/SongCard";
import Queue from "../../components/queue/Queue";
import AudioPlayer from "../../components/audioPlayer/AudioPlayer";
import Widgets from "../../components/widgets/Widgets";
const Player = () => {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  var w = window.innerWidth;
  useEffect(() => {
    if (location.state) {
      apiClient.get(`playlists/${location.state?.id}/tracks`).then((res) => {
        setTracks(res.data.items);
        setCurrentTrack(res.data.items[0].track);
      });
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentTrackIndex]?.track);
  }, [currentTrackIndex, tracks]);
  return (
    <div className="screen-container flex main-flex">
      <div className="left-player-body">
        <AudioPlayer
          currentTrack={currentTrack?.album}
          total={tracks}
          currentIndex={currentTrackIndex}
          setCurrentIndex={setCurrentTrackIndex}
        />
        {w > 1000 && <Widgets artistID={currentTrack?.album} />}
      </div>
      <div className="right-player-body">
        <SongCard album={currentTrack?.album} />
        {w > 1000 && (
          <Queue
            tracks={tracks}
            setCurrentIndex={setCurrentTrackIndex}
            className="queuehide"
          />
        )}
      </div>
    </div>
  );
};

export default Player;
