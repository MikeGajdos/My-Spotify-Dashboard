import React from "react";
let scopesString = "";
const scopes = [
  "streaming",
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "app-remote-control",
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
];

scopes.forEach((scope) => {
  scopesString += `${scope}%20`;
});

const AUTH_URL_BASE =
  "https://accounts.spotify.com/authorize?client_id=69b7e082800c4e7492113261511746da&response_type=code&redirect_uri=http://localhost:3000&scope=";

const AUTH_URL = `${AUTH_URL_BASE}${scopesString}`;
console.log(AUTH_URL);

// const AUTH_URL =
//   "https://accounts.spotify.com/authorize?client_id=69b7e082800c4e7492113261511746da&response_type=code&redirect_uri=http://localhost:3000&scope=ugc-image-upload%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20streaming%20app-remote-control%20user-read-email%20user-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify-private%20user-library-modify%20user-library-read%20user-top-read%20user-read-playback-position%20user-read-recently-played%20user-follow-read%20user-follow-modify%20";

function Login() {
  return (
    <div>
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
    </div>
  );
}

export default Login;
