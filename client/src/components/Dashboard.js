import React from "react";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import SongItem from "./songItem/SongItem";
import Player from "./player/Player";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "69b7e082800c4e7492113261511746da",
});

const Dashboard = ({ code }) => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState();
  const [tracks, setTracks] = useState([]);
  const accessToken = useAuth(code);

  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(query);
    setQuery("");
  };

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setTracks([]);
    if (!accessToken) return;

    // let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      // if (cancel) return;
      console.log(res);
      setTracks(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    // return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div className="container">
      <form className="form form-tracks" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search tracks"
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <div className="songList">
        {tracks.map((track, index) => {
          return (
            <SongItem key={track.uri} track={track} chooseTrack={chooseTrack} />
          );
        })}
        {tracks.length === 0 && (
          <div style={{ whiteSpace: "pre", textAlign: "center " }}>
            {lyrics}
          </div>
        )}
      </div>
      <div className="player">
        {" "}
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );
};

export default Dashboard;
