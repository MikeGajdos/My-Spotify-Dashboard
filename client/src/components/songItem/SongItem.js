import React from "react";
import "./SongItem.css";

const SongItem = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };
  return (
    <div className="songItem" onClick={handlePlay}>
      <img src={track.albumUrl} style={{ height: "32px", width: "32px" }} />
      <div className="ml-3 track-info">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  );
};

export default SongItem;
