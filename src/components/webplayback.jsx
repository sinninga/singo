import React, { useState, useEffect } from 'react';
import './webplayback.css';
import Navbar from './navbar';
import Search from './search';

const track = {
    name: "",
    id: "",
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
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);


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
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${props.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uris: [`spotify:track:${"5rzbYLGXo9OcFVbi2bGM9U?si=f4c7b6f9e6b54e2e"}`] })
            });
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

            if (state.position && state.duration) {
                setCurrentTime(state.position / 1000); // Convert ms to seconds
                setTotalDuration(state.duration / 1000); // Convert ms to seconds
            }
        
        
            player.getCurrentState().then( state => { 
                (!state)? setActive(false) : setActive(true) 
            });
        
        }));


        player.connect();

    };
}, []);

    useEffect(() => {
        const interval = setInterval(() => {
            player.getCurrentState().then((state) => {
                if (state && state.position) {
                    setCurrentTime(state.position / 1000);
                    setTotalDuration(state.duration / 1000);
                }
            });
        }, 500); // Update every second

        return () => {
            clearInterval(interval);
        };
    }, [player]);

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        return formattedTime;
    }


   return (
      <>
        <Navbar />
        <div className="container">
            {!current_track.name && (
            <h1 className="name">SLiNGO</h1>)}
            <Search />
            {current_track.name && (
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
                    <div className="track-time">
                        <span>{formatTime(currentTime)}</span> / <span>{formatTime(totalDuration)}</span>
                    </div>
                </div>
            </div>
            )}
            {current_track.name && (
            <div className="btn-container">
                <button className="btn-controls" onClick={() => { player.previousTrack() }} >
                    &lt;&lt;
                </button>
                <button className="btn-controls play-button" onClick={() => { player.togglePlay() }} >
                    { is_paused ? "PLAY" : "PAUSE" }
                </button>
                <button className="btn-controls" onClick={() => { player.nextTrack() }} >
                    &gt;&gt;
                </button>
            </div>
            )}
        </div>
      </>
    );
}

export default WebPlayback

