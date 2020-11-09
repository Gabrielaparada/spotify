import { useEffect, useState } from 'react'


function Playlists() {

  // // const [playlistData, setPlaylistData] = useState([])


  // const [sharePlaylist, setSharePlaylist] = useState([])




  // useEffect(()=>{
  //     if (!token){
  //   return
  // }
  //   const fetchData = function(){
  //   fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
  //     method: 'GET',
  //     headers: {'Authorization': 'Bearer ' + token},
  //   }).then(response => response.json())
  //   .then((data) => {
  //     console.log(data)
  //     setSharePlaylist(data.items)
  // });

  //   // fetch('https://api.spotify.com/v1/me/player/recently-played', {
  //   //   method: 'GET',
  //   //   headers: {'Authorization': 'Bearer ' + token},
  //   // }).then(response => response.json(), 'playlisttt')
  //   // .then((data)=> {
  //   //   console.log(data)
  //   //   setPlaylistData(data.items)
  //   // })
  //   }
  //   fetchData()
  // },[token, userId])


  return (
    <div className="playlist">
      <h1>Playlisy</h1>
    </div>
  );
}

export default Playlists;
