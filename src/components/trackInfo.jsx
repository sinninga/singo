import React from 'react';
import '../styles/trackInfo.css';

const TrackInfo = ({
    current_track,
    currentTime,
    totalDuration,
    formatTime,
    player,
    is_paused
}) => {
    return (
        <>
        <div className="track-info-container">                  
            {current_track.name && (
            <div className="main-wrapper">
                <img src={current_track.album.images[0].url} 
                    className="now-playing-cover" alt="" />
                <div className="now-playing-side">
                    <div className="now-playing-name">
                        {current_track.name}
                    </div>
                    <div className="now-playing-artist">
                        {current_track.artists[0].name}
                    </div>
                    <div className="track-time">
                        <span>{formatTime(currentTime)}</span> / <span>{formatTime(totalDuration)}</span>
                    </div>
                </div>
            </div>
            )}
        </div> 
        <div className="playback-controls">
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

export default TrackInfo;