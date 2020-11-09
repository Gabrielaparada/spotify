import logo from "./logo.svg";
import queryString from "querystring";
import { useEffect, useState } from "react";
import "./App.css";
import Sdk from "./Sdk";

function App() {
  // const [playlistData, setPlaylistData] = useState([])

  // const [userData, setUserData] = useState([])

  const [sharePlaylist, setSharePlaylist] = useState([]);

  const [token, setToken] = useState([]);

  const [tracks, setTracks] = useState([]);

  const [uri, setUri] = useState([]);

  useEffect(() => {
    //Get access token
    let parsed = queryString.parse(window.location.search);
    // console.log(parsed, 'parseee')
    let accessToken = parsed["?access_token"];
    setToken(accessToken);
    console.log(accessToken);

    //User data, get user ID
    const fetchData = function () {
      fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken },
      })
        .then((response) => response.json())
        .then((data) => {
          const userId = data.id;

          //Get user Playlists
          fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: "GET",
            headers: { Authorization: "Bearer " + accessToken },
          })
            .then((response) => response.json())
            .then((data) => {
              //filter shared playlists
              const filteredItems = data.items.filter((item) => {
                return item.collaborative === true;
              });
              //get shared playlists track end point.
              const newTracks = filteredItems.map((item) => {
                return item.tracks.href;
                // console.log(endpoint)
              });
              setTracks(newTracks);
              setSharePlaylist(filteredItems);
            });

          //use playlist endpoint to get URI

          // fetch(tracks, {
          //   method: 'GET',
          //   headers: {'Authorization': 'Bearer ' + accessToken}
          // }).then(response => response.json())
          // .then((data)=>{
          //   const response = data.items.map((item)=>{
          //     console.log('hola')
          //     return item.track.uri
          //   })
          //   setUri(response)
          // })
        });
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="">
        <h1>spotify</h1>
      </header>
      <Sdk token={token} uri={uri} />
    </div>
  );
}

export default App;
