import { useEffect, useState } from 'react'



function SdkPlaylist({token, uri}){

  const [sdk, setSdk] = useState(undefined)

useEffect(()=>{
  if(!token){
    return
  }
window.onSpotifyWebPlaybackSDKReady = () => {
  const player = new window.Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); }
  });
  

  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

  // Playback status updates
  player.addListener('player_state_changed', state => { console.log(state); });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    setSdk(device_id)
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();
};

},[token])

useEffect(()=>{

  const body = JSON.stringify({ uris: uri })

  if (!sdk){
    return
  }
  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${sdk}`, {
    method: 'PUT',
    body,
    // body: JSON.stringify({ uris: ['spotify:track:7xGfFoTpQ2E7fRF5lN10tr'] }),
    // {"context_uri": "spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}
    headers: {'Authorization': 'Bearer ' + token },
  }).then((response) => {
    console.log(response, 'response')
  })
},[sdk])



  return (
    <div className="sdk">
      <p>Hi</p>
    </div>
  )



}

export default SdkPlaylist

