import logo from './logo.svg';
import queryString from 'querystring'
import { useEffect } from 'react'
import './App.css';


function App() {

  useEffect(()=>{
    let parsed = queryString.parse(window.location.search)
    // console.log(parsed, 'parseee')
    let accessToken = parsed['?access_token']
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
        }).then((response) => {
          console.log(response.json(), 'YAYYYY')
        })
      })
    }
    fetchData()
  })


  return (
    <div className="App">
      <header className="">
        <h1>spotify</h1>
      </header>
    </div>
  );
}

export default App;
