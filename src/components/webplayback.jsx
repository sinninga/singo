import React, { useState, useEffect } from 'react';
import './webplayback.css';
import Navbar from './navbar';

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function WebPlayback(props) {

  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);


  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {

        const player = new window.Spotify.Player({
            name: 'Web Playback SDK',
            getOAuthToken: cb => { cb(props.token); },
            volume: 0.5
        });

        setPlayer(player);

        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });

        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });
        player.addListener('player_state_changed', ( state => {

            if (!state) {
                return;
            }
        
            setTrack(state.track_window.current_track);
            setPaused(state.paused);
        
        
            player.getCurrentState().then( state => { 
                (!state)? setActive(false) : setActive(true) 
            });
        
        }));


        player.connect();

    };
}, []);


   return (
      <>
        <Navbar />
        <div className="container">
            <h1 className="name">SLiNGO</h1>
            <div className="main-wrapper">
                <img src={current_track.album.images[0].url} 
                     className="now-playing-cover" alt="" />
                <div className="now-playing-side">
                    <div className="now-playing__name">
                        {current_track.name}
                    </div>
                    <div className="now-playing__artist">
                        {current_track.artists[0].name}
                    </div>
                </div>
            </div>
            <div className="btn-container">
                <button className="btn-controls" onClick={() => { player.previousTrack() }} >
                    &lt;&lt;
                </button>
                <button className="btn-controls" onClick={() => { player.togglePlay() }} >
                    { is_paused ? "PLAY" : "PAUSE" }
                </button>
                <button className="btn-controls" onClick={() => { player.nextTrack() }} >
                    &gt;&gt;
                </button>
            </div>
        </div>
      </>
    );
}

export default WebPlayback

