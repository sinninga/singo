import React, { useState, useEffect } from 'react';
import '../styles/webplayback.css';
import Navbar from './navbar';
import Search from './search';
import TrackInfo from './trackInfo';
import Lyrics from './lyrics';


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
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [deviceID, setDeviceID] = useState(null);


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
            setDeviceID(device_id);
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
                setCurrentTime(state.position / 1000); 
                setTotalDuration(state.duration / 1000); 
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
        }, 500);

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

    const playSelectedTrack = async (trackUri) => {
        console.log('Play selected track:', trackUri); 
        if (!deviceID) {
            console.error('Device ID not available.');
            return;
        }

        try {
            await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${props.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uris: [trackUri] })
            });
            setSelectedTrack(trackUri); // Update the selectedTrack state
            setIsPlaying(true);
        } catch (error) {
            console.error('Error playing track:', error);
        }
    };

    
   return (
      <>
        <Navbar />
        <div className="container">
            {!current_track.name && (
            <h1 className="name">SLiNGO</h1>)}
            <div className="everything">
                <Search 
                    onSearch={setSearchResults} 
                    onSelectTrack={playSelectedTrack} 
                    searchResults={searchResults} 
                    accessToken={props.token} 
                />
                <TrackInfo
                    current_track={current_track}
                    currentTime={currentTime}
                    totalDuration={totalDuration}
                    formatTime={formatTime}
                    player={player}
                    is_paused={is_paused}
                />
                <Lyrics 
                    trackUri={selectedTrack}
                />
            </div>
        </div>
      </>
    );
}

export default WebPlayback

