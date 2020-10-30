import logo from './logo.svg';
import queryString from 'querystring'
import { useEffect, useState } from 'react'
import './App.css';
import Sdk from './Sdk'


function App() {

  const [playlistData, setPlaylistData] = useState([])

  // const [userData, setUserData] = useState([])

  const [sharePlaylist, setSharePlaylist] = useState([])

  const [token, setToken] = useState([])



  useEffect(()=>{
    let parsed = queryString.parse(window.location.search)
    // console.log(parsed, 'parseee')
    let accessToken = parsed['?access_token']
    setToken(accessToken)
    console.log(accessToken)

    const fetchData = function(){
    fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + accessToken},
      }).then( response => response.json())
      .then((data) => {
        console.log(data, 'tokeenn')
        const userId = data.id

        fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'GET',
          headers: {'Authorization': 'Bearer ' + accessToken},
        }).then(response => response.json())
        .then((data) => {
          console.log(data)
          setSharePlaylist(data.items)
        });

      //   fetch('https://api.spotify.com/v1/me/player/recently-played', {
      //     method: 'GET',
      //     headers: {'Authorization': 'Bearer ' + accessToken},
      //   }).then(response => response.json(), 'playlisttt')
      //   .then((data)=> {
      //     console.log(data)
      //     setPlaylistData(data.items)
      //   })
      })
    }
    fetchData()
  },[])


  return (
    <div className="App">
      <header className="">
        <h1>spotify</h1>
      </header>
      <Sdk token={token}/>
    </div>
  );
}

export default App;
